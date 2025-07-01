import Link from 'next/link';
import productIntro from '@/content/blog/product-intro.json';
import { getTranslation } from '@/lib/i18n';

const blogPosts = [
  {
    slug: 'product-intro',
    data: productIntro,
  },
  // 可继续添加更多博客
];

export default function BlogPage({ params }) {
  const locale = params.locale || 'zh-CN';
  const t = (key) => getTranslation(locale, key);
  return (
    <div className="page-container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">
        {t('Blog & News')}
      </h1>
      <div className="space-y-8">
        {blogPosts.map(post => {
          const data = post.data[locale] || post.data['zh-CN'];
          return (
            <div key={post.slug} className="p-6 bg-white rounded-lg shadow border border-[var(--color-accent)]">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/${locale}/blog/${post.slug}`}>{data.title}</Link>
              </h2>
              <div className="text-sm text-gray-400 mb-2">{data.date}</div>
              <p className="text-base text-gray-600 mb-2">{data.summary}</p>
              <Link href={`/${locale}/blog/${post.slug}`} className="text-[var(--color-primary)] hover:underline font-medium">
                {t('Read More')} &rarr;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
} 