import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getWorks } from '@/lib/content';

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">أعمالنا</p>
        <h1 className="mt-4 text-4xl font-black text-white">مشاريع نفذناها بلمسة احترافية</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {works.map((work) => (
          <div key={work.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-glow">
            <Image src={work.image} alt={work.title} width={900} height={600} className="h-64 w-full object-cover" />
            <div className="p-6">
              <p className="text-sm text-gold">{work.category}</p>
              <h3 className="mt-3 text-2xl font-bold text-white">{work.title}</h3>
              <p className="mt-3 text-slate-300">{work.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-slate-900">
          اطلب نفس النوع من المشروع <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
