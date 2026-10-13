import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 lg:px-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-glow">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">تواصل معنا</p>
          <h1 className="mt-4 text-4xl font-black text-white">لنصنع لك حضوراً أقوى في السوق</h1>
          <p className="mt-5 text-slate-300">نحن هنا لمساعدتك في تصميم حلول إعلانية تناسب علامتك التجارية وتحقق أهدافك.</p>

          <div className="mt-8 space-y-5 text-slate-200">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /> +966 500 000 000</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold" /> info@alwancatlog.com</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-gold" /> الرياض – المملكة العربية السعودية</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-glow">
          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">الاسم</label>
              <input className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 focus:border-gold" placeholder="اكتب اسمك" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">البريد الإلكتروني</label>
              <input type="email" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 focus:border-gold" placeholder="name@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">نوع الخدمة</label>
              <select className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-gold">
                <option>تصميم لوحات إعلانية</option>
                <option>طباعة</option>
                <option>دروع تكريمية</option>
                <option>هدايا دعائية</option>
                <option>أختام واستندات</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">تفاصيل المشروع</label>
              <textarea rows={5} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-gold" placeholder="اكتب تفاصيل مشروعك"></textarea>
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-slate-900">
              إرسال الرسالة <ArrowLeft className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
