import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ServiceCard({ service }: { service: any }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
      <Image src={service.image} alt={service.title} width={900} height={600} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="p-6">
        <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-3 text-gold"><span className="text-xl">✦</span></div>
        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
        <p className="mt-3 text-slate-300">{service.description}</p>
        <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">
          معرفة المزيد <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
