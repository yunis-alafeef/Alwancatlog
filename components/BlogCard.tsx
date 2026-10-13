import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogCard({ article }: { article: any }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
      <Image src={article.image} alt={article.title} width={900} height={600} className="h-56 w-full object-cover" />
      <div className="p-6">
        <p className="text-sm text-slate-400">{article.date}</p>
        <h3 className="mt-3 text-2xl font-bold text-white">{article.title}</h3>
        <p className="mt-3 text-slate-300">{article.excerpt}</p>
        <Link href={`/blog/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-gold">
          اقرأ المقال <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
