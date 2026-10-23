import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sanitizeName, sanitizeEmail, sanitizeText, isValidEmail } from '@/lib/sanitize';
import { checkRateLimit, createRateLimitExceededResponse } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * GET /api/students
 * Fetches all registered student profiles from Supabase cloud database
 */
export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 60, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase admin client is not configured', students: [] },
      { status: 503 }
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const emailParam = searchParams.get('email');

    let query = supabaseAdmin.from('students').select('*');
    if (emailParam) {
      const cleanEmail = sanitizeEmail(emailParam);
      query = query.ilike('email', cleanEmail);
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase fetch students error:', error);
      return NextResponse.json({ error: error.message, students: [] }, { status: 500 });
    }

    if (emailParam) {
      const matched = data && data.length > 0 ? data[0] : null;
      return NextResponse.json({
        success: Boolean(matched),
        found: Boolean(matched),
        student: matched,
        count: data?.length || 0,
        students: data || [],
      });
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      students: data || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, students: [] }, { status: 500 });
  }
}

/**
 * POST /api/students
 * Creates or updates a student profile in the Supabase cloud database
 */
export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 40, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase database client is not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const rawName = body.name || body.full_name || '';
    const rawEmail = body.email || '';
    const degree = body.degree || body.course || body.stream || 'BA';
    const semester = typeof body.semester === 'number' ? body.semester : 1;
    const medium = body.medium || body.preferred_medium || body.preferredMedium || 'English';
    const subjects = Array.isArray(body.subjects)
      ? body.subjects
      : Array.isArray(body.selected_subjects)
      ? body.selected_subjects
      : Array.isArray(body.selectedSubjects)
      ? body.selectedSubjects
      : [];
    const companion = body.companion || body.characterBuddy || 'doraemon';
    const xp = typeof body.xp === 'number' ? body.xp : 10;

    const cleanName = sanitizeName(rawName, 80);
    const cleanEmail = sanitizeEmail(rawEmail);

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: 'Valid student name is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: 'Valid student email address is required' },
        { status: 400 }
      );
    }

    // Map stream to database degree standard
    let normalizedDegree = 'BA';
    if (typeof degree === 'string') {
      const d = degree.toLowerCase();
      if (d.includes('math') || d === 'bsc-maths') normalizedDegree = 'BSc Maths';
      else if (d.includes('bio') || d === 'bsc-bio') normalizedDegree = 'BSc Bio';
      else if (d.includes('ba') || d === 'ba-arts') normalizedDegree = 'BA';
      else normalizedDegree = degree;
    }

    const normalizedMedium =
      medium.toLowerCase() === 'hi' || medium.toLowerCase() === 'hindi' ? 'Hindi' : 'English';

    // Check if a student with this email already exists
    const { data: existingRows } = await supabaseAdmin
      .from('students')
      .select('id')
      .eq('email', cleanEmail)
      .limit(1);

    const existingStudent = existingRows && existingRows[0];

    const studentPayload = {
      full_name: cleanName,
      email: cleanEmail,
      degree: normalizedDegree,
      semester,
      medium: normalizedMedium,
      subjects,
      companion: sanitizeText(companion, 30) || 'doraemon',
      xp,
      last_active: new Date().toISOString(),
    };

    let resultData;
    let resultError;

    if (existingStudent?.id) {
      // Update existing record
      const { data, error } = await supabaseAdmin
        .from('students')
        .update(studentPayload)
        .eq('id', existingStudent.id)
        .select();
      resultData = data;
      resultError = error;
    } else {
      // Insert new record
      const { data, error } = await supabaseAdmin
        .from('students')
        .insert([studentPayload])
        .select();
      resultData = data;
      resultError = error;
    }

    if (resultError) {
      console.error('Supabase student save error:', resultError);
      return NextResponse.json({ error: resultError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Student synced successfully with Supabase cloud database!',
      student: resultData?.[0] || studentPayload,
    });
  } catch (err: any) {
    console.error('Supabase student sync route failure:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
