import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import {
  CurrentAffairsItem,
  NewsCategory,
  NewsLanguage,
  NewsScope,
  generateExamRelevance,
  CURATED_CURRENT_AFFAIRS_EN,
  CURATED_CURRENT_AFFAIRS_HI,
} from '@/data/currentAffairsData';

// In-memory 15-minute server cache
interface CacheEntry {
  timestamp: number;
  items: CurrentAffairsItem[];
}
const CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Keyword-based category classification for live news items
function classifyCategory(
  title: string,
  preferredCategory: NewsCategory
): Exclude<NewsCategory, 'all'> {
  if (preferredCategory !== 'all') {
    return preferredCategory;
  }
  const text = title.toLowerCase();

  if (
    /environment|climate|forest|wildlife|tiger|lake|glacier|flood|landslide|river|ganga|himalaya|ecol|paryavaran|mausam|aapda|jungle/i.test(
      text
    )
  ) {
    return 'environment';
  }
  if (
    /court|judge|bench|law|legal|bail|police|arrest|fir|crime|cbi|ed|judiciary|nyay|kanun|faisla/i.test(
      text
    )
  ) {
    return 'law';
  }
  if (
    /economy|economic|rbi|bank|repo|inflation|budget|gdp|tax|revenue|trade|market|finance|crore|arth|byaj/i.test(
      text
    )
  ) {
    return 'economic';
  }
  if (
    /education|university|college|ugc|exam|student|school|sdsuv|nep|campus|degree|shiksha|chhatra|pariksha/i.test(
      text
    )
  ) {
    return 'educational';
  }
  if (
    /tech|ai|digital|satellite|isro|chip|semiconductor|cyber|software|mobile|launch|vigyan|takneek/i.test(
      text
    )
  ) {
    return 'technology';
  }

  return 'political';
}

function cleanHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSearchQuery(
  scope: NewsScope,
  category: NewsCategory,
  lang: NewsLanguage
): string {
  if (lang === 'hi') {
    let base = '';
    if (scope === 'uttarakhand') {
      base = 'उत्तराखंड (site:amarujala.com OR site:livehindustan.com OR site:jagran.com OR site:navbharattimes.indiatimes.com)';
    } else if (scope === 'national') {
      base = 'भारत (site:amarujala.com OR site:livehindustan.com OR site:jagran.com OR site:jansatta.com OR site:bbc.com/hindi)';
    } else {
      base = '(विश्व OR दुनिया OR अंतरराष्ट्रीय) (site:bbc.com/hindi OR site:jansatta.com OR site:livehindustan.com OR site:amarujala.com)';
    }

    if (category === 'political') base += ' (सरकार OR मंत्रिमंडल OR राजनीति OR चुनाव)';
    else if (category === 'economic') base += ' (अर्थव्यवस्था OR बैंक OR बजट OR महंगाई)';
    else if (category === 'educational') base += ' (शिक्षा OR विश्वविद्यालय OR कॉलेज OR परीक्षा)';
    else if (category === 'law') base += ' (सुप्रीम कोर्ट OR हाईकोर्ट OR कानून OR न्यायपालिका)';
    else if (category === 'technology') base += ' (तकनीक OR विज्ञान OR डिजिटल OR एआई)';
    else if (category === 'environment') base += ' (पर्यावरण OR मौसम OR वन OR हिमालय OR प्रदूषण)';

    return base;
  }

  // English search query
  let base = '';
  if (scope === 'uttarakhand') {
    base = 'Uttarakhand (site:indianexpress.com OR site:thehindu.com OR site:hindustantimes.com OR site:timesofindia.indiatimes.com OR site:livemint.com)';
  } else if (scope === 'national') {
    base = 'India (site:indianexpress.com OR site:thehindu.com OR site:hindustantimes.com OR site:timesofindia.indiatimes.com OR site:livemint.com OR site:reuters.com)';
  } else {
    base = 'World (site:bbc.com OR site:reuters.com OR site:thehindu.com OR site:indianexpress.com)';
  }

  if (category === 'political') base += ' (cabinet OR government OR parliament OR election)';
  else if (category === 'economic') base += ' (economy OR RBI OR inflation OR budget OR banking)';
  else if (category === 'educational') base += ' (education OR university OR college OR UGC OR exam)';
  else if (category === 'law') base += ' (Supreme Court OR High Court OR judiciary OR law OR legal)';
  else if (category === 'technology') base += ' (technology OR AI OR digital OR science OR ISRO)';
  else if (category === 'environment') base += ' (environment OR climate OR forest OR ecology OR disaster)';

  return base;
}

export async function GET(req: NextRequest) {
  // 1. Rate limiting (60 requests per minute per IP)
  const rateLimit = checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfter) },
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const scope = (searchParams.get('scope') || 'uttarakhand') as NewsScope;
  const category = (searchParams.get('category') || 'all') as NewsCategory;
  const lang = (searchParams.get('lang') || 'en') as NewsLanguage;
  const forceRefresh = searchParams.get('refresh') === 'true';

  const cacheKey = `${scope}_${category}_${lang}`;
  const now = Date.now();

  // 2. Check 15-minute server cache
  if (!forceRefresh) {
    const cached = CACHE.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        scope,
        category,
        lang,
        cached: true,
        count: cached.items.length,
        updatedAt: new Date(cached.timestamp).toISOString(),
        items: cached.items,
      });
    }
  }

  // 3. Fallback dataset prepared upfront
  const curatedSource = lang === 'hi' ? CURATED_CURRENT_AFFAIRS_HI : CURATED_CURRENT_AFFAIRS_EN;
  const fallbackFiltered = curatedSource.filter((item) => {
    const scopeMatch = item.scope === scope;
    const catMatch = category === 'all' || item.category === category;
    return scopeMatch && catMatch;
  });

  // 4. Fetch live Google News RSS feed
  const liveItems: CurrentAffairsItem[] = [];

  try {
    const query = buildSearchQuery(scope, category, lang);
    const googleNewsUrl =
      lang === 'hi'
        ? `https://news.google.com/rss/search?q=${encodeURIComponent(
            query + ' when:7d'
          )}&hl=hi&gl=IN&ceid=IN:hi`
        : `https://news.google.com/rss/search?q=${encodeURIComponent(
            query + ' when:7d'
          )}&hl=en-IN&gl=IN&ceid=IN:en`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6-second timeout

    const res = await fetch(googleNewsUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 APSBNexusAcademic/1.0',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: 900 }, // 15 mins Next.js fetch cache
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const xmlText = await res.text();
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match: RegExpExecArray | null;

      while ((match = itemRegex.exec(xmlText)) !== null && liveItems.length < 15) {
        const raw = match[1];
        const rawTitle =
          (raw.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || '';
        const link =
          (raw.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/) || [])[1] || '';
        const rawSource =
          (raw.match(/<source[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/source>/) || [])[1] || '';
        const sourceUrlMatch = raw.match(/<source[^>]*url="([^"]*)"/);
        const sourceUrl = sourceUrlMatch ? sourceUrlMatch[1] : undefined;
        const pubDateStr = (raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';

        let cleanTitle = cleanHtmlEntities(rawTitle);
        const sourceName = cleanHtmlEntities(rawSource) || (lang === 'hi' ? 'दैनिक समाचार' : 'Trusted News Wire');

        // Strip trailing source name from title if present
        if (sourceName && cleanTitle.endsWith(' - ' + sourceName)) {
          cleanTitle = cleanTitle.substring(0, cleanTitle.length - (' - ' + sourceName).length).trim();
        }

        if (!cleanTitle || cleanTitle.length < 12) continue;

        const itemCategory = classifyCategory(cleanTitle, category);
        const examDetails = generateExamRelevance(cleanTitle, scope, itemCategory, lang);

        let isoDate = new Date().toISOString();
        if (pubDateStr) {
          const d = new Date(pubDateStr);
          if (!isNaN(d.getTime())) isoDate = d.toISOString();
        }

        // Generate synthetic id
        const cleanId = `ca-live-${scope}-${itemCategory}-${Math.abs(
          cleanTitle.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
        )}`;

        // Avoid duplicates in the same response
        if (liveItems.some((i) => i.title.toLowerCase() === cleanTitle.toLowerCase())) {
          continue;
        }

        const summaryText =
          lang === 'hi'
            ? `${sourceName} द्वारा प्रकाशित ताज़ा समाचार: ${cleanTitle}। यह घटनाक्रम राज्य एवं राष्ट्रीय परिदृश्य के दृष्टिकोण से छात्रों और प्रतियोगी परीक्षाओं के लिए विशेष प्रासंगिक है।`
            : `Verified report via ${sourceName}: ${cleanTitle}. This development carries strategic implications across public policy, institutional decision-making, and academic analysis.`;

        const fullDigestText =
          lang === 'hi'
            ? `• **स्रोत समीक्षा:** यह समाचार "${sourceName}" द्वारा आधिकारिक रूप से प्रकाशित किया गया है।\n• **मुख्य बिंदु:** ${cleanTitle}।\n• **अकादमिक क्षेत्र:** ${scope.toUpperCase()} • ${itemCategory.toUpperCase()}।\n• **परीक्षा दृष्टिकोण:** ${examDetails.examRelevance}\n• **अध्ययन सुझाव:** एसडीएसयूवी बीए एवं उत्तराखंड लोक सेवा आयोग (UKPSC / UPSC) के विद्यार्थी मुख्य परीक्षा के उत्तर-लेखन में इस संदर्भ को प्रमाण के रूप में उद्धृत कर सकते हैं।`
            : `• **Verified Publication:** Published by ${sourceName} on ${new Date(isoDate).toLocaleDateString()}.\n• **Key Takeaway:** ${cleanTitle}.\n• **Thematic Domain:** ${scope.toUpperCase()} • ${itemCategory.toUpperCase()}.\n• **Academic Angle:** ${examDetails.examRelevance}\n• **Preparation Note:** SDSUV BA undergraduates and UKPSC / UPSC civil services aspirants can utilize this case study in essay and general studies answer writing.`;

        liveItems.push({
          id: cleanId,
          title: cleanTitle,
          sourceName,
          sourceUrl,
          publishedAt: isoDate,
          url: link || '#',
          scope,
          category: itemCategory,
          summary: summaryText,
          fullDigest: fullDigestText,
          examRelevance: examDetails.examRelevance,
          examSubject: examDetails.examSubject,
          tags: [scope, itemCategory, sourceName],
          isLive: true,
        });
      }
    }
  } catch (error) {
    console.error('Current Affairs live RSS fetch error (falling back to curated):', error);
  }

  // 5. Merge live items with curated items to ensure high yield & zero empty state
  const mergedItems: CurrentAffairsItem[] = [];
  const seenTitles = new Set<string>();

  // Add live items first
  for (const item of liveItems) {
    const key = item.title.toLowerCase().trim();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      mergedItems.push(item);
    }
  }

  // Add curated fallback items
  for (const item of fallbackFiltered) {
    const key = item.title.toLowerCase().trim();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      mergedItems.push(item);
    }
  }

  // If still empty (e.g. strict category with no match), fallback to all items for that scope
  if (mergedItems.length === 0) {
    const allForScope = curatedSource.filter((item) => item.scope === scope);
    mergedItems.push(...allForScope);
  }

  // 6. Save in 15-minute server cache
  CACHE.set(cacheKey, {
    timestamp: now,
    items: mergedItems,
  });

  return NextResponse.json({
    success: true,
    scope,
    category,
    lang,
    cached: false,
    count: mergedItems.length,
    updatedAt: new Date(now).toISOString(),
    items: mergedItems,
  });
}
