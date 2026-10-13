import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import { getArticles } from '@/lib/content';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-20 md:px-8 lg:px-12">
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
        <Image src={article.image} alt={article.title} width={1200} height={720} className="h-[420px] w-full object-cover" />
      </div>
      <div className="mt-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
          <CalendarDays className="h-4 w-4 text-gold" /> {article.date}
        </div>
        <h1 className="text-4xl font-black text-white">{article.title}</h1>
        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-300" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </article>
  );
}
