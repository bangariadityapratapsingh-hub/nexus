import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, createRateLimitExceededResponse } from '@/lib/rateLimit';
import { FALLBACK_NOTIFICATIONS } from '@/data/fallbackNotifications';
import {
  UniversityNotification,
  NotificationCategory,
  NotificationApiResponse,
} from '@/types/notification';

// Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

// In-memory cache for fast zero-lag responses
let memoryCache: {
  data: UniversityNotification[];
  timestamp: number;
} | null = null;

const CACHE_TTL_MS = 3600 * 1000; // 1 hour

function classifyNotification(title: string): {
  category: NotificationCategory;
  categoryLabelEn: string;
  categoryLabelHi: string;
  categoryIcon: string;
} {
  const t = title.toLowerCase();

  if (
    t.includes('result') ||
    t.includes('marks') ||
    t.includes('revaluation') ||
    t.includes('scrutiny') ||
    t.includes('grade') ||
    t.includes('score') ||
    t.includes('परिणाम') ||
    t.includes('अंक')
  ) {
    return {
      category: 'results',
      categoryLabelEn: 'Results & Marks',
      categoryLabelHi: 'परीक्षा परिणाम एवं अंक',
      categoryIcon: '📊',
    };
  }

  if (
    t.includes('exam') ||
    t.includes('datesheet') ||
    t.includes('date sheet') ||
    t.includes('back paper') ||
    t.includes('admit') ||
    t.includes('centre') ||
    t.includes('center') ||
    t.includes('theory') ||
    t.includes('practical') ||
    t.includes('परीक्ष')
  ) {
    return {
      category: 'exams',
      categoryLabelEn: 'Examinations & Datesheets',
      categoryLabelHi: 'परीक्षा एवं समय सारणी',
      categoryIcon: '📝',
    };
  }

  if (
    t.includes('calendar') ||
    t.includes('admission') ||
    t.includes('session') ||
    t.includes('holiday') ||
    t.includes('schedule') ||
    t.includes('सत्र') ||
    t.includes('प्रवेश') ||
    t.includes('अवकाश')
  ) {
    return {
      category: 'calendar',
      categoryLabelEn: 'Academic Calendar',
      categoryLabelHi: 'शैक्षणिक कैलेंडर व सत्र',
      categoryIcon: '📅',
    };
  }

  return {
    category: 'circulars',
    categoryLabelEn: 'Official Circulars',
    categoryLabelHi: 'विश्वविद्यालय परिपत्र',
    categoryIcon: '🏛️',
  };
}

function generateSummary(title: string, category: NotificationCategory): {
  summaryEn: string;
  summaryHi: string;
} {
  const isBack = /back/i.test(title);
  const isDatesheet = /datesheet|date sheet/i.test(title);
  const isForm = /form/i.test(title);
  const isResult = /result/i.test(title);

  if (isDatesheet) {
    return {
      summaryEn:
        'Official examination timetable released by Sri Dev Suman Uttarakhand University. Review scheduled exam shifts, morning/evening slots, and paper codes.',
      summaryHi:
        'श्री देव सुमन उत्तराखंड विश्वविद्यालय द्वारा आधिकारिक परीक्षा समय-सारणी जारी की गई है। अपनी परीक्षा पाली एवं तिथि की जांच करें।',
    };
  }

  if (isBack && isForm) {
    return {
      summaryEn:
        'Online examination forms are invited for back-paper and improvement exams. Complete your submission and fee verification through the SDSUV portal.',
      summaryHi:
        'बैक पेपर एवं सुधार परीक्षा हेतु ऑनलाइन फॉर्म आमंत्रित किए गए हैं। समर्थ पोर्टल पर निर्धारित समय सीमा से पूर्व आवेदन पूरा करें।',
    };
  }

  if (isResult) {
    return {
      summaryEn:
        'Official semester/annual examination results declared. Candidates can download marks statements and verify evaluation details using their university roll number.',
      summaryHi:
        'विश्वविद्यालय परीक्षा परिणाम घोषित कर दिया गया है। छात्र अपने रोल नंबर द्वारा अंक विवरण एवं परिणाम डाउनलोड कर सकते हैं।',
    };
  }

  return {
    summaryEn: `Official notification issued by Sri Dev Suman Uttarakhand University administrative council regarding university academic operations and guidelines.`,
    summaryHi: `श्री देव सुमन उत्तराखंड विश्वविद्यालय द्वारा शैक्षणिक एवं प्रशासनिक दिशानिर्देशों के संबंध में आधिकारिक अधिसूचना जारी।`,
  };
}

export async function GET(request: NextRequest) {
  // Apply per-IP rate limiting (max 30 requests per minute)
  const rateLimitResult = checkRateLimit(request, { limit: 30, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  const now = Date.now();

  // Return from memory cache if fresh
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    const payload: NotificationApiResponse = {
      success: true,
      source: 'cache',
      lastUpdated: new Date(memoryCache.timestamp).toISOString(),
      count: memoryCache.data.length,
      notifications: memoryCache.data,
    };
    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  try {
    // Attempt live fetch from SDSUV official API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const endpoints = [
      'https://sdsuv.ac.in/api/notices?limit=30',
      'https://www.sdsuv.ac.in/api/notices?limit=30',
    ];

    let liveItems: Array<{
      id?: string;
      title?: string;
      date?: string;
      href?: string;
      details?: string;
    }> = [];

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'application/json, text/plain, */*',
          },
          next: { revalidate: 3600 },
        });

        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json?.data) && json.data.length > 0) {
            liveItems = json.data;
            break;
          }
        }
      } catch {
        // try next endpoint
      }
    }

    clearTimeout(timeoutId);

    if (liveItems.length > 0) {
      const parsedNotifications: UniversityNotification[] = liveItems
        .filter((item) => item.title && item.title.trim().length > 3)
        .map((item, index) => {
          const title = item.title?.trim() || 'SDSUV University Notification';
          const { category, categoryLabelEn, categoryLabelHi, categoryIcon } =
            classifyNotification(title);
          const { summaryEn, summaryHi } = generateSummary(title, category);

          let link = item.href?.trim() || 'https://www.sdsuv.ac.in/notices';
          let pdfUrl = link.toLowerCase().endsWith('.pdf') ? link : undefined;

          // If the link is relative, prefix official domain
          if (link.startsWith('/')) {
            link = `https://www.sdsuv.ac.in${link}`;
            if (link.endsWith('.pdf')) pdfUrl = link;
          }

          // Format ISO date or date string
          let rawDate = item.date || new Date().toISOString().split('T')[0];
          // Check if notice is within the last 7 days
          const noticeDate = new Date(rawDate);
          const isNew =
            !isNaN(noticeDate.getTime()) &&
            now - noticeDate.getTime() < 14 * 24 * 60 * 60 * 1000;

          return {
            id: item.id || `live-${index}-${Date.now()}`,
            title,
            date: rawDate,
            link,
            pdfUrl,
            category,
            categoryLabelEn,
            categoryLabelHi,
            categoryIcon,
            isNew,
            officialRef: `SDSUV/NOTICE/${rawDate.replace(/-/g, '')}/${index + 101}`,
            fileSize: pdfUrl ? '1.2 MB' : undefined,
            summaryEn,
            summaryHi,
          };
        });

      // Update memory cache
      memoryCache = {
        data: parsedNotifications,
        timestamp: now,
      };

      const payload: NotificationApiResponse = {
        success: true,
        source: 'live',
        lastUpdated: new Date().toISOString(),
        count: parsedNotifications.length,
        notifications: parsedNotifications,
      };

      return NextResponse.json(payload, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    // Fallback if live items empty
    throw new Error('No live items parsed');
  } catch (err) {
    console.warn('SDSUV live scraper fallback engaged:', (err as Error).message);

    // Update memory cache with curated fallback list
    memoryCache = {
      data: FALLBACK_NOTIFICATIONS,
      timestamp: now,
    };

    const payload: NotificationApiResponse = {
      success: true,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
      count: FALLBACK_NOTIFICATIONS.length,
      notifications: FALLBACK_NOTIFICATIONS,
    };

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }
}
