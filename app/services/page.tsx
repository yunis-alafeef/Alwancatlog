import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getServices } from '@/lib/content';
import SectionTitle from '@/components/SectionTitle';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
      <SectionTitle title="خدماتنا" subtitle="مجموعة متكاملة من الحلول الإعلائية والتصميمية" />

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-glow">
            <Image src={service.image} alt={service.title} width={900} height={600} className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-3 text-gold">
                <span className="text-xl">✦</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-slate-300">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" /> <span>{feature}</span></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center">
        <h3 className="text-3xl font-black text-white">هل تحتاج خدمة مخصصة؟</h3>
        <p className="mt-3 text-slate-300">نصمم لك حلولاً تتناسب مع طبيعة مشروعك وفق أسلوبك التجاري وأهدافك.</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-slate-900">
          اطلب استشارة <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
