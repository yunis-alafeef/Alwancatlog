'use client';

import { useState } from 'react';

export default function AITools() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<any>(null);

  async function generateArticle() {
    setLoading(true);
    setMessage('جارٍ إنشاء محتوى...');
    setResult(null);

    const titleInput = (document.querySelector('input[name="title"]') as HTMLInputElement) || null;
    const title = titleInput?.value || '';
    if (!title) {
      setMessage('ضع عنوانًا أولاً في حقل العنوان');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, keywords: '' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الاتصال بالذكاء الاصطناعي');

      if (data.data) {
        setResult(data.data);
        // populate form fields if exist
        const excerptField = document.querySelector('input[name="excerpt"]') as HTMLInputElement;
        const contentField = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
        if (excerptField && data.data.excerpt) excerptField.value = data.data.excerpt;
        if (contentField && data.data.content) contentField.value = data.data.content;
      } else if (data.raw) {
        setResult({ raw: data.raw });
      }
      setMessage('تم إنشاء المحتوى. يمكنك مراجعته ثم حفظه.');
    } catch (e: any) {
      setMessage(e.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  }

  async function suggestTitles() {
    setLoading(true);
    setMessage('جارٍ اقتراح عناوين...');
    setResult(null);
    const excerpt = (document.querySelector('input[name="excerpt"]') as HTMLInputElement)?.value || '';
    if (!excerpt) {
      setMessage('ضع ملخصًا أولاً في حقل الملخص');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/ai/suggest-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ excerpt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الاقتراح');
      setResult(data.titles || data.raw || data);
      setMessage('العناوين المقترحة ظهرت أدناه. انسخها إلى حقل العنوان الذي ترغب به.');
    } catch (e: any) {
      setMessage(e.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  }

  async function extractTags() {
    setLoading(true);
    setMessage('جارٍ استخراج الوسوم...');
    setResult(null);
    const content = (document.querySelector('textarea[name="content"]') as HTMLTextAreaElement)?.value || '';
    if (!content) {
      setMessage('أضف محتوى أولاً في حقل المحتوى');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/ai/extract-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الاستخراج');
      setResult(data.tags || data.raw || data);
      setMessage('الوسوم المقترحة ظهرت أدناه. انسخها إلى حقل الوسوم إذا رغبت.');
    } catch (e: any) {
      setMessage(e.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">أدوات الذكاء الاصطناعي</h3>
        <div className="text-sm text-slate-400">تحسين المحتوى تلقائياً</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={generateArticle} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={loading}>
          إنشاء مقال تلقائياً
        </button>
        <button onClick={suggestTitles} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60" disabled={loading}>
          اقتراح عناوين
        </button>
        <button onClick={extractTags} className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={loading}>
          استخراج وسوم
        </button>
      </div>

      <div className="mt-4 text-sm text-slate-300">{message}</div>

      <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap text-xs text-slate-200">{result ? JSON.stringify(result, null, 2) : ''}</pre>
    </div>
  );
}
