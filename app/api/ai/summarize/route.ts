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
      max_tokens: 800,
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
      { role: 'system', content: 'أنت مساعد لتلخيص المحتوى وتحويل النصوص الطويلة إلى ملخصات موجزة باللغة العربية.' },
      { role: 'user', content: `لدي المحتوى التالي:

${content}

صغ له ملخصًا موجزًا من 2-3 جمل باللغة العربية وضمن نطاق احترافي.` },
    ];

    const reply = await callOpenAI(messages);
    return NextResponse.json({ ok: true, summary: reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI error' }, { status: 500 });
  }
}
