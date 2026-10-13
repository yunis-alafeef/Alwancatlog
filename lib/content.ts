import fs from 'fs/promises';
import path from 'path';

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
};

export type Work = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'لوحات إعلانية',
    description: 'تصميم وتنفيذ اللوحات الإعلانية بأنواعها المختلفة من حروف بارزة، كلادينج، إسمنت بورد ولوحات المشاريع.',
    image: '/uploads/service-board.svg',
    features: ['تصميم مميز', 'تنفيذ احترافي', 'مواد عصرية'],
  },
  {
    id: '2',
    title: 'الطباعة',
    description: 'خدمات طباعة جميع الأنواع والأحجام، من بطاقات، منشورات، ملصقات، لافتات، وثائق المؤسسة.',
    image: '/uploads/service-print.svg',
    features: ['أحجام متعددة', 'طباعة عالية الدقة', 'خدمة سريعة'],
  },
  {
    id: '3',
    title: 'الدروع التكريمية',
    description: 'إنتاج دروع تكريمية وتذكارية بأسلوب احترافي يناسب المناسبات الرسمية والمؤسسات.',
    image: '/uploads/service-award.svg',
    features: ['تصميم حسب الطلب', 'مواد فاخرة', 'تنفيذ دقيق'],
  },
  {
    id: '4',
    title: 'الهدايا الدعائية',
    description: 'هدايا دعائية مخصصة تجمع بين الفائدة والهوية البصرية للعلامة التجارية.',
    image: '/uploads/service-gifts.svg',
    features: ['تصميم فريد', 'باقات متعددة', 'مناسبة للحملات'],
  },
];

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'كيف تختار اللوحة الإعلانية المثالية لمشروعك؟',
    slug: 'how-select-ad-board',
    excerpt: 'تعرّف على العوامل الأساسية التي تؤثر على تصميم اللوحة الإعلانية ومواد التنفيذ.',
    image: '/uploads/article-1.svg',
    date: '2026-10-03',
    content: '<p>عند التفكير في إنشاء لوحة إعلانية، من المهم مراعاة موقعها، نوع المواد، والهوية البصرية الخاصة بعلامتك التجارية. كل هذه العناصر تؤثر في فعالية الإعلان.</p><p>في حلول بصرية، نساعدك على اختيار الشكل الأمثل، من الألوان، الخطوط، وحتى مقاسات الحروف والمواد المستخدمة.</p>',
  },
  {
    id: '2',
    title: 'أساسيات الطباعة عالية الجودة في الحملات الدعائية',
    slug: 'printing-basics',
    excerpt: 'محتوى الطباعة يلعب دوراً كبيراً في نجاح الحملة، لذلك من الضروري اختيار الجودة المناسبة.',
    image: '/uploads/article-2.svg',
    date: '2026-10-01',
    content: '<p>الطباعة لا تقتصر على اللون أو الخامة فقط، بل تشمل دقة التفاصيل، نوع الورق، ومناسبة المنتج لاستخدامه داخل أو خارج المبنى.</p><p>لذلك يجب اختيار الشركة المناسبة التي تسير وفق معايير الجودة والتقنيات الحديثة.</p>',
  },
  {
    id: '3',
    title: 'لماذا تعتبر الهدايا الدعائية أداة قوية للتسويق؟',
    slug: 'promo-gifts',
    excerpt: 'الهدايا الدعائية تخلق تفاعلاً مستمراً مع العملاء وترفع الوعي بالعلامة التجارية.',
    image: '/uploads/article-3.svg',
    date: '2026-09-28',
    content: '<p>الهدايا الدعائية تعتبر وسيلة فعالة لترسيخ العلامة التجارية، خاصة عند تقديمها في المناسبات أو خلال فعاليات الشركات.</p><p>الأمر الأهم هو اختيار هدية ذات قيمة عملية وتناسب جمهورك المستهدف.</p>',
  },
];

const defaultWorks: Work[] = [
  {
    id: '1',
    title: 'لوحة مشروع سكني',
    description: 'تصميم وتنفيذ لوحة مشروع سكني باستخدام حروف بارزة وألوان متناسقة.',
    image: '/uploads/work-1.svg',
    category: 'لوحات مشاريع',
  },
  {
    id: '2',
    title: 'بطاقات منشورات متجر',
    description: 'حل طباعة ضخم لمتجر ملابس احترافي بأسلوب جذاب وسهل القراءة.',
    image: '/uploads/work-2.svg',
    category: 'طباعة',
  },
  {
    id: '3',
    title: 'درع تكريمي للمؤسسة',
    description: 'درع تكريمي فخمة تم تصميمها لتناسب احتفالية رسمية رفيعة.',
    image: '/uploads/work-3.svg',
    category: 'دروع تكريمية',
  },
];

const defaultUsers: User[] = [
  { id: '1', name: 'مدير الموقع', username: 'admin', password: 'admin123', role: 'admin' },
];

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const files = ['services.json', 'articles.json', 'works.json', 'users.json'];
  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    try {
      await fs.access(filePath);
    } catch {
      const data = file === 'services.json'
        ? defaultServices
        : file === 'articles.json'
          ? defaultArticles
          : file === 'works.json'
            ? defaultWorks
            : defaultUsers;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
  }
}

async function readJson<T>(fileName: string, fallback: T): Promise<T> {
  await ensureDataFiles();
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
    return fallback;
  }
}

async function writeJson<T>(fileName: string, data: T): Promise<T> {
  await ensureDataFiles();
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  return data;
}

export async function getServices() {
  return readJson<Service[]>('services.json', defaultServices);
}

export async function saveServices(data: Service[]) {
  return writeJson('services.json', data);
}

export async function getArticles() {
  return readJson<Article[]>('articles.json', defaultArticles);
}

export async function saveArticles(data: Article[]) {
  return writeJson('articles.json', data);
}

export async function getWorks() {
  return readJson<Work[]>('works.json', defaultWorks);
}

export async function saveWorks(data: Work[]) {
  return writeJson('works.json', data);
}

export async function getUsers() {
  return readJson<User[]>('users.json', defaultUsers);
}

export async function saveUsers(data: User[]) {
  return writeJson('users.json', data);
}
