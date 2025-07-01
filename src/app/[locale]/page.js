import { getTranslation } from '@/lib/i18n';
import HotTweets from '@/app/components/ui/HotTweets';
import FAQ from '@/app/components/ui/FAQ';
import HotCreators from '@/app/components/ui/HotCreators';
import Hero from '@/app/components/ui/Hero';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import productIntro from '@/content/blog/product-intro.json';

// 博客预览用多语言数据，统一从 content 目录读取
const blogPosts = [
  {
    slug: 'product-intro',
    data: productIntro,
  },
  // 可继续添加更多博客
];

export default async function Home({ params: { locale } }) {
  const t = function (key) {
    return getTranslation(locale, key);
  }
  
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  
  const baseUrl = `${protocol}://${host}`
  const remainApiResp = await fetch(`${baseUrl}/api/remains`,{
    cache: 'no-store'
  });
  const remainApiCountData = await remainApiResp.json();
  const remainApiCount = remainApiCountData.data;

  return (
    <div className="page-container">
      {/* Hero区 */}
      <section className="section">
        <Hero locale={locale} remainApiCount={remainApiCount} onDownload={async (url) => {
          'use server';
          redirect(`/downloader?url=${url}`);
        }} />
      </section>

      {/* 产品功能卡片区 */}
      <section className="section my-8">
        <h2 className="text-2xl font-bold mb-6">{t('Product Features')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[var(--color-accent)] dark:bg-foreground/10 rounded-xl p-6 flex flex-col items-center text-center shadow">
            <div className="text-3xl mb-2">🚀</div>
            <div className="font-semibold mb-1">{t('One-click Download')}</div>
            <div className="text-sm text-foreground/70">{t('Download Twitter/X videos, images, GIFs easily.')}</div>
          </div>
          <div className="bg-[var(--color-accent)] dark:bg-foreground/10 rounded-xl p-6 flex flex-col items-center text-center shadow">
            <div className="text-3xl mb-2">🌐</div>
            <div className="font-semibold mb-1">{t('Multi-language Support')}</div>
            <div className="text-sm text-foreground/70">{t('Translate and republish content in multiple languages.')}</div>
          </div>
          <div className="bg-[var(--color-accent)] dark:bg-foreground/10 rounded-xl p-6 flex flex-col items-center text-center shadow">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-semibold mb-1">{t('Content Safety')}</div>
            <div className="text-sm text-foreground/70">{t('AI & local moderation for safe, compliant downloads.')}</div>
          </div>
          <div className="bg-[var(--color-accent)] dark:bg-foreground/10 rounded-xl p-6 flex flex-col items-center text-center shadow">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold mb-1">{t('Privacy First')}</div>
            <div className="text-sm text-foreground/70">{t('No registration, minimal data, secure experience.')}</div>
          </div>
        </div>
      </section>

      {/* 使用流程/教程引导区 */}
      <section className="section my-8">
        <h2 className="text-2xl font-bold mb-6">{t('How to Use')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl mb-2">1️⃣</div>
            <div className="font-medium">{t('Copy Tweet Link')}</div>
            <div className="text-xs text-foreground/60 mt-1">{t('Find the tweet you want to download and copy its link.')}</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl mb-2">2️⃣</div>
            <div className="font-medium">{t('Paste & Parse')}</div>
            <div className="text-xs text-foreground/60 mt-1">{t('Paste the link into the box above and click download.')}</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl mb-2">3️⃣</div>
            <div className="font-medium">{t('Select Format')}</div>
            <div className="text-xs text-foreground/60 mt-1">{t('Choose video, image, or GIF to save locally.')}</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl mb-2">4️⃣</div>
            <div className="font-medium">{t('Enjoy & Share')}</div>
            <div className="text-xs text-foreground/60 mt-1">{t('Use your downloaded content as you wish (respect copyright).')}</div>
          </div>
        </div>
        {/* <div className="text-right mt-4">
          <Link href="/guide" className="text-[var(--color-primary)] hover:underline font-medium text-sm">{t('View detailed tutorial')} &rarr;</Link>
        </div> */}
      </section>

      {/* 博客/资讯预览区 */}
      <section className="section my-8">
        <h2 className="text-2xl font-bold mb-6">{t('Latest Blog & News')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.slice(0,2).map(post => (
            <div key={post.slug} className="p-6 bg-[var(--color-accent)] dark:bg-foreground/10 rounded-xl shadow border border-[var(--color-accent)] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.data[locale]?.title || post.data['zh-CN']?.title}</Link>
                </h3>
                <div className="text-xs text-gray-400 mb-2">{post.data[locale]?.date || post.data['zh-CN']?.date}</div>
                <p className="text-base text-foreground/80 mb-2 line-clamp-3">{post.data[locale]?.summary || post.data['zh-CN']?.summary}</p>
              </div>
              <div className="text-right">
                <Link href={`/blog/${post.slug}`} className="text-[var(--color-primary)] hover:underline font-medium text-sm">{t('Read more')} &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <Link href="/blog" className="text-[var(--color-primary)] hover:underline font-medium text-sm">{t('View all blogs')} &rarr;</Link>
        </div>
      </section>

      {/* 热门创作者区 */}
      <section className="section my-8">
        <h2 className="text-2xl font-bold mb-6">{t('Hot Creators')}</h2>
        <HotCreators locale={locale} />
      </section>

      {/* 热门推文区 */}
      <section className="section my-8">
        <HotTweets locale={locale} />
      </section>

      {/* FAQ区 */}
      <section className="section my-8">
        <h2 className="text-2xl font-bold mb-6">{t('Frequently Asked Questions')}</h2>
        <FAQ locale={locale} />
      </section>
    </div>
  );
}