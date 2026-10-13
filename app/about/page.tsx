import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Briefcase, Newspaper, PaintBucket, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold">من نحن</p>
          <h1 className="mt-4 text-4xl font-black text-white">شركاء إبداع لا يكتفون بالتنفيذ، بل يضيفون قيمة للعلامة التجارية.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            تأسست شركة حلول بصرية لتكون ركيزة إعلانية موثوقة للشركات والمؤسسات، عبر تقديم خدمات تصميم اللوحات، الطباعة، الدروع والتذكارات، والهدايا الدعائية، مع الالتزام بالجودة والسرعة في التنفيذ.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-glow">
          <Image src="/logo.svg" alt="حلول بصرية" width={700} height={500} className="w-full rounded-2xl border border-white/10" />
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: PaintBucket, title: 'تصميم إعلاني', text: 'علامات تجارية ووحدات إعلانية جذابة.' },
          { icon: Briefcase, title: 'لوحات مشاريع', text: 'حلول مخصصة بطابع احترافي ومميز.' },
          { icon: Newspaper, title: 'طباعة وتغليف', text: 'مطبوعات بكل الأحجام والمواد المطلوبة.' },
          { icon: Users, title: 'خدمة عملاء', text: 'دعم مُستمر لفريقك في كل مرحلة.' },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-3 text-gold"><item.icon className="h-6 w-6" /></div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-3 text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm text-gold"><ShieldCheck className="h-4 w-4" /> التزام بالجودة</div>
        <h3 className="mt-6 text-3xl font-black text-white">نرفع جودة حضورك الإعلاني من خلال تنفيذ متوازن بين الإبداع والاحترافية.</h3>
        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-slate-900">تواصل معنا <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
