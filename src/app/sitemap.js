import fs from 'fs';
import path from 'path';

export default async function sitemap() {
    const baseUrl = 'https://tweetxpro.com';
    const locales = ['en', 'zh-CN', 'ja', 'ko', 'fr', 'zh-HK', 'es', 'pt', 'it', 'de', 'th', 'tr'];

    // 自动读取所有 blog slug
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    let blogSlugs = [];
    try {
        blogSlugs = fs.readdirSync(blogDir)
            .filter(f => f.endsWith('.json'))
            .map(f => f.replace(/\.json$/, ''));
    } catch {}

    // 静态页面
    const staticPages = locales.flatMap(locale => [
        {
            url: `${baseUrl}/${locale}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/${locale}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/${locale}/about-us`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/${locale}/privacy-policy`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/${locale}/terms-of-service`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/${locale}/downloader`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]);

    // 博客内容
    const blogPages = locales.flatMap(locale =>
        blogSlugs.map(slug => ({
            url: `${baseUrl}/${locale}/blog/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }))
    );

    // 动态推文
    const tweets = await fetch(`${baseUrl}/api/requestdb?action=all`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => data.data || [])
        .catch(() => []);
    const tweetPages = tweets.map(tweet => ({
        url: `${baseUrl}/tweets/${tweet.tweet_id}`,
        lastModified: new Date(tweet.post_at || Date.now()).toISOString(),
        changeFrequency: 'never',
        priority: 0.7,
    }));

    return [...staticPages, ...blogPages, ...tweetPages];
}

// 导出 sitemap 生成器配置
export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 每天重新生成一次