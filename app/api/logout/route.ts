import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
  response.cookies.set('alwancat_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });
  return response;
}
