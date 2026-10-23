import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { checkRateLimit, createRateLimitExceededResponse } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * GET /api/lecture-ratings?videoId=...
 * Fetches the collective community rating and total rating count for a video from Supabase
 */
export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 120, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'videoId query parameter is required' }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json({
      success: true,
      videoId,
      averageRating: 4.9,
      count: 0,
      isDefault: true,
    });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('lecture_ratings')
      .select('rating')
      .eq('video_id', videoId);

    if (error) {
      console.warn('Supabase lecture ratings fetch warning:', error.message);
      return NextResponse.json({
        success: true,
        videoId,
        averageRating: 4.9,
        count: 0,
      });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        videoId,
        averageRating: 4.9,
        count: 0,
      });
    }

    const sum = data.reduce((acc, row) => acc + (Number(row.rating) || 0), 0);
    const count = data.length;
    const averageRating = Number((sum / count).toFixed(1));

    return NextResponse.json({
      success: true,
      videoId,
      averageRating,
      count,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      videoId,
      averageRating: 4.9,
      count: 0,
      error: err.message,
    });
  }
}

/**
 * POST /api/lecture-ratings
 * Submits a student's 1-to-5 star rating for a lecture into the Supabase cloud database
 */
export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 30, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase database is not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { videoId, topicId = 'general', rating } = body;

    if (!videoId || typeof videoId !== 'string') {
      return NextResponse.json({ error: 'Valid videoId is required' }, { status: 400 });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    // Insert new community rating into Supabase cloud table
    const { error: insertError } = await supabaseAdmin
      .from('lecture_ratings')
      .insert([
        {
          video_id: videoId.trim(),
          topic_id: String(topicId).slice(0, 80),
          rating: Math.round(numRating),
        },
      ]);

    if (insertError) {
      console.error('Supabase lecture rating insert error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Compute updated aggregate for this video
    const { data: allRatings } = await supabaseAdmin
      .from('lecture_ratings')
      .select('rating')
      .eq('video_id', videoId.trim());

    const totalRatings = allRatings || [];
    const count = totalRatings.length;
    const sum = totalRatings.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    const averageRating = count > 0 ? Number((sum / count).toFixed(1)) : numRating;

    return NextResponse.json({
      success: true,
      message: 'Rating saved to Supabase cloud!',
      videoId: videoId.trim(),
      averageRating,
      count,
    });
  } catch (err: any) {
    console.error('Submit rating route exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
