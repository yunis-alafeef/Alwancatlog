import { NextRequest, NextResponse } from 'next/server';
import { getServices, getArticles, getWorks } from '@/lib/content';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('alwancat_token')?.value;
    if (!token) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    verifyToken(token);
    const [services, articles, works] = await Promise.all([getServices(), getArticles(), getWorks()]);
    return NextResponse.json({ services, articles, works, ok: true });
  } catch {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }
}
