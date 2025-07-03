import fs from 'fs';
import path from 'path';

export async function GET() {
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

    // 构建 XML sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // 静态页面
    locales.forEach(locale => {
        // 首页
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/${locale}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>1.0</priority>\n';
        // 添加语言替代版本
        locales.forEach(altLocale => {
            xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}" />\n`;
        });
        xml += '  </url>\n';

        // 博客列表页
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/${locale}/blog</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>0.9</priority>\n';
        locales.forEach(altLocale => {
            xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/blog" />\n`;
        });
        xml += '  </url>\n';

        // 其他静态页面
        const staticPages = [
            { path: 'about-us', freq: 'monthly', priority: '0.6' },
            { path: 'privacy-policy', freq: 'monthly', priority: '0.6' },
            { path: 'terms-of-service', freq: 'monthly', priority: '0.6' },
            { path: 'downloader', freq: 'monthly', priority: '0.8' },
        ];

        staticPages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/${locale}/${page.path}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `    <changefreq>${page.freq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            locales.forEach(altLocale => {
                xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/${page.path}" />\n`;
            });
            xml += '  </url>\n';
        });

        // 博客内容
        blogSlugs.forEach(slug => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/${locale}/blog/${slug}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '    <priority>0.8</priority>\n';
            locales.forEach(altLocale => {
                xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/blog/${slug}" />\n`;
            });
            xml += '  </url>\n';
        });
    });

    // 动态推文
    try {
        const tweets = await fetch(`${baseUrl}/api/requestdb?action=all`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => data.data || [])
            .catch(() => []);

        tweets.forEach(tweet => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/tweets/${tweet.tweet_id}</loc>\n`;
            xml += `    <lastmod>${new Date(tweet.post_at || Date.now()).toISOString()}</lastmod>\n`;
            xml += '    <changefreq>never</changefreq>\n';
            xml += '    <priority>0.7</priority>\n';
            xml += '  </url>\n';
        });
    } catch (error) {
        console.error('Error fetching tweets for sitemap:', error);
    }

    xml += '</urlset>';

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
} 