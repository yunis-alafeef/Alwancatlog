'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const form = new FormData(event.currentTarget);
    const payload = {
      username: String(form.get('username') || ''),
      password: String(form.get('password') || ''),
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.error || 'فشل تسجيل الدخول');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-950 px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-glow">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl font-black text-gold">HB</div>
          <h1 className="text-3xl font-black text-white">تسجيل الدخول</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">اسم المستخدم</label>
            <input name="username" defaultValue="admin" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-gold" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">كلمة المرور</label>
            <input name="password" type="password" defaultValue="admin123" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-gold" />
          </div>

          {message ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{message}</p> : null}

          <button disabled={loading} type="submit" className="w-full rounded-full bg-gold px-6 py-3 font-bold text-slate-900 transition hover:bg-yellow-400 disabled:opacity-70">
            {loading ? 'جاري تسجيل الدخول...' : 'دخول لوحة التحكم'}
          </button>
        </form>
      </div>
    </div>
  );
}
