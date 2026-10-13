import { getServices } from '@/lib/content';

export default async function NotFoundPage() {
  const services = await getServices();
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mb-6 text-7xl">404</div>
      <h1 className="text-4xl font-black text-white">الصفحة غير موجودة</h1>
      <p className="mt-4 text-slate-300">لم نتمكن من العثور على الصفحة المطلوبة. يمكنك العودة إلى الصفحة الرئيسية أو تصفح خدماتنا.</p>
      <div className="mt-8 flex justify-center gap-4">
        <a href="/" className="rounded-full bg-gold px-5 py-3 font-bold text-slate-900">الرئيسية</a>
        <a href="/services" className="rounded-full border border-slate-700 px-5 py-3 font-bold text-white">الخدمات</a>
      </div>
    </div>
  );
}
