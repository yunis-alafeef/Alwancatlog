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
      max_tokens: 1200,
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
    const title = String(body.title || '').trim();
    const keywords = String(body.keywords || '').trim();
    const tone = String(body.tone || 'رسمية ومهنية');

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: 'أنت مساعد تحرير محتوى عربي متخصص في كتابة مقالات للمدونات ومواد تسويقية لشركات الدعاية والإعلان.' },
      {
        role: 'user',
        content: `اكتب مقالاً احترافياً باللغة العربية بعنوان: "${title}". ابدأ بملخص (excerpt) قصير لا يتجاوز 30 كلمة، ثم أدرج المقال كاملاً بطول مناسب (3-6 فقرات) مع استخدام أمثلة عملية، استخدم نبرة: ${tone}، وأضف قائمة مكونة من 3 نقاط لاقتراحات نشطة. ضع أيضًا مجموعة من 5 وسوم/كلمات مفتاحية مناسبة للمقال. إذا زودت بالكلمات الدلالية: ${keywords}، فادمجها بشكل طبيعي في المحتوى.

أرجو الإخراج في JSON فقط بالشكل:
{
  "title": "...",
  "excerpt": "...",
  "content": "<p>...</p>",
  "tags": ["tag1","tag2",...]
}`,
      },
    ];

    const reply = await callOpenAI(messages);

    // Try to parse JSON from reply
    let parsed = null;
    try {
      parsed = JSON.parse(reply);
    } catch (e) {
      // fallback: return raw string
      return NextResponse.json({ raw: reply });
    }

    return NextResponse.json({ ok: true, data: parsed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI error' }, { status: 500 });
  }
}
