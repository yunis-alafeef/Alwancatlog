import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8 lg:px-12">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-lg font-black text-gold">HB</div>
            <div>
              <div className="text-xl font-black text-white">حلول بصرية</div>
              <div className="text-xs text-slate-400">Advertising & Print</div>
            </div>
          </div>
          <p className="text-slate-300">نقود مشاريعك الإعلانية من الفكرة إلى التنفيذ، مع جودة عالية وسرعة في الإنجاز.</p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold text-white">خدماتنا</h3>
          <ul className="space-y-2 text-slate-300">
            <li>لوحات إعلانية</li>
            <li>الطباعة</li>
            <li>الدروع التكريمية</li>
            <li>الهدايا الدعائية</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold text-white">تواصل معنا</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +966 500 000 000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> info@alwancatlog.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> الرياض – المملكة العربية السعودية</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">© 2026 حلول بصرية. جميع الحقوق محفوظة.</div>
    </footer>
  );
}
