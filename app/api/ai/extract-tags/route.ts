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
      max_tokens: 200,
      temperature: 0.2,
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
    const content = String(body.content || '').trim();
    if (!content) return NextResponse.json({ error: 'content is required' }, { status: 400 });

    const messages = [
      { role: 'system', content: 'أنت مساعد لاستخراج وسوم وكلمات مفتاحية باللغة العربية.' },
      { role: 'user', content: `اقترح مجموعة من 6 كلمات مفتاحية قصيرة باللغة العربية (بدون علامات ترقيم زائدة) للمحتوى التالي:

${content}

أعد النتيجة كـ JSON فقط: { "tags": ["...", "..."] }` },
    ];

    const reply = await callOpenAI(messages);
    try {
      const parsed = JSON.parse(reply);
      return NextResponse.json({ ok: true, tags: parsed.tags || [] });
    } catch (e) {
      return NextResponse.json({ ok: true, raw: reply });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI error' }, { status: 500 });
  }
}
