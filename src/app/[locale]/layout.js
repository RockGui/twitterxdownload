import "../globals.css";

import GoogleAnalytics from '../components/google/GoogleAnalytics';
import GoogleAdsense from '../components/google/GoogleAdsense';
import UmamiAnalytics from '../components/common/UmamiAnalytics';

import {Providers} from "../providers";

import MyNavbar from '../components/ui/MyNavbar';
import MyFooter from '../components/ui/MyFooter';


export const metadata = {
  metadataBase: new URL('https://tweetxpro.com'),
  title: {
    default: 'TweetXPro - Download Twitter Videos',
    template: '%s | TweetXPro'
  },
  description: 'Download Twitter videos, images, and GIFs easily with TweetXPro. Fast, free, and no registration required.',
  keywords: 'twitter downloader, x video downloader, twitter video download, x.com downloader',
  authors: [{ name: 'tweetxpro' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://tweetxpro.com/',
  },
  openGraph: {
    title: 'TweetXPro - Download Twitter Videos',
    description: 'Download Twitter videos, images, and GIFs easily with TweetXPro. Fast, free, and no registration required.',
    url: 'https://tweetxpro.com',
    siteName: 'TweetXPro',
    images: [
      {
        url: 'https://tweetxpro.com/images/og.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tweetxpro',
    title: 'tweetxpro - Free Twitter Video Downloader',
    description: 'Download Twitter videos and media content for free. No registration required.',
    images: ['https://tweetxpro.com/images/og.png']
  },
  icons: {
    icon: [
      { url: '/images/favicon.png' },
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180' }
    ]
  }
};

export default function RootLayout({ children, params }) {
    const locale = params?.locale || 'en';

    return (
      <html lang={locale} suppressHydrationWarning>
        <head>
            <GoogleAdsense />
            <GoogleAnalytics />
            <UmamiAnalytics />
        </head>
        <body className="bg-background text-foreground">
            <Providers>
                <MyNavbar locale={locale} />
                {children}
                <MyFooter locale={locale} />
            </Providers>
        </body>
      </html>
    );
  }