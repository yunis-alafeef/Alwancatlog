import { NextRequest, NextResponse } from 'next/server';

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

async function callOpenAI(messages: any[]) {
  if (!OPENAI_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 250,
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  return content;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const excerpt = String(body.excerpt || '').trim();
    if (!excerpt) return NextResponse.json({ error: 'excerpt is required' }, { status: 400 });

    const messages = [
      { role: 'system', content: 'أنت مساعد مقترحات عناوين باللغة العربية.' },
      { role: 'user', content: `اقترح 5 عناوين جذابة قصيرة ومهنية للمقال التالي:

"${excerpt}"

أعدّ النتيجة كقائمة JSON مفردة: { "titles": ["...", "..."] }` },
    ];

    const reply = await callOpenAI(messages);

    try {
      const parsed = JSON.parse(reply);
      return NextResponse.json({ ok: true, titles: parsed.titles || [] });
    } catch (e) {
      // Fallback: return raw
      return NextResponse.json({ ok: true, raw: reply });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI error' }, { status: 500 });
  }
}
