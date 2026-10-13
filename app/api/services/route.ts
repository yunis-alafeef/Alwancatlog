import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getServices, saveServices } from '@/lib/content';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('alwancat_token')?.value;
    if (!token) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    verifyToken(token);
    const services = await getServices();
    return NextResponse.json({ services });
  } catch {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('alwancat_token')?.value;
    if (!token) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    verifyToken(token);

    const body = await request.formData();
    const title = String(body.get('title') || '').trim();
    const description = String(body.get('description') || '').trim();
    const features = String(body.get('features') || '').split(',').map((i) => i.trim()).filter(Boolean);

    if (!title || !description) {
      return NextResponse.json({ error: 'العنوان والوصف مطلوبان' }, { status: 400 });
    }

    const services = await getServices();
    const newService = {
      id: `${Date.now()}`,
      title,
      description,
      image: '/uploads/service-board.svg',
      features,
    };

    const updated = [newService, ...services];
    await saveServices(updated);
    return NextResponse.redirect(new URL('/admin', request.url));
  } catch {
    return NextResponse.json({ error: 'فشل في حفظ الخدمة' }, { status: 500 });
  }
}
