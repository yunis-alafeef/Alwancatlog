## نشر نهائي على Vercel

لتشغيل النشر التلقائي على Vercel، اتبع الخطوات التالية:

1. في إعدادات المستودع على GitHub أضف الأسرار التالية (Settings → Secrets → Actions):
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID
   - JWT_SECRET
   - OPENAI_API_KEY

2. تحقق من ملف `.github/workflows/deploy.yml` (تم إعداده ليعمل على فرع `main`).

3. في Vercel، تأكد من ربط المشروع واستخدم نفس الإعدادات للمفاتيح السرية إن لزم.

ملاحظة حول الأمان: لا تقم بمشاركة مفاتيح OpenAI أو Vercel العامة؛ احفظها في أسرار GitHub وبيئة Vercel فقط.
