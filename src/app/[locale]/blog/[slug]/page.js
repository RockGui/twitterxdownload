import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  let post;
  try {
    post = require(`@/content/blog/${slug}.json`);
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  const data = post[locale] || post['zh-CN'];
  if (!data) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: data.title,
    description: data.summary,
    keywords: `tweetxpro, twitter downloader, blog, ${data.title.toLowerCase()}`,
    alternates: {
      canonical: `https://tweetxpro.com/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.summary,
      type: 'article',
      url: `https://tweetxpro.com/${locale}/blog/${slug}`,
      siteName: 'TweetXPro',
      images: [{
        url: 'https://tweetxpro.com/images/og.png'
      }],
      publishedTime: data.date,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@tweetxpro',
      title: data.title,
      description: data.summary,
      images: ['https://tweetxpro.com/images/og.png']
    }
  };
}

export default function BlogDetail({ params }) {
  const { locale, slug } = params;
  let post;
  try {
    post = require(`@/content/blog/${slug}.json`);
  } catch {
    notFound();
  }
  const data = post[locale] || post['zh-CN'];
  if (!data) return notFound();

  return (
    <article className="article-content max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
      <div className="text-gray-500 mb-4">{data.date}</div>
      <div className="text-base text-gray-700 mb-8">{data.summary}</div>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
} 