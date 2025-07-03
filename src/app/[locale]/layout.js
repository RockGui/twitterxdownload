import "../globals.css";

import GoogleAnalytics from '../components/google/GoogleAnalytics';
import GoogleAdsense from '../components/google/GoogleAdsense';
import UmamiAnalytics from '../components/common/UmamiAnalytics';

import {Providers} from "../providers";

import MyNavbar from '../components/ui/MyNavbar';
import MyFooter from '../components/ui/MyFooter';
import { getTranslation } from '@/lib/i18n';

// 多语言 meta 数据
const metaData = {
  'en': {
    title: 'TweetXPro - Download Twitter Videos',
    description: 'Download Twitter videos, images, and GIFs easily with TweetXPro. Fast, free, and no registration required.',
    keywords: 'twitter downloader, x video downloader, twitter video download, x.com downloader, free twitter downloader',
  },
  'zh-CN': {
    title: 'TweetXPro - 免费下载 Twitter 视频',
    description: '使用 TweetXPro 轻松下载 Twitter 视频、图片和 GIF。快速、免费、无需注册。',
    keywords: 'twitter下载器,x视频下载器,twitter视频下载,x.com下载器,免费twitter下载器',
  },
  'zh-HK': {
    title: 'TweetXPro - 免費下載 Twitter 視頻',
    description: '使用 TweetXPro 輕鬆下載 Twitter 視頻、圖片和 GIF。快速、免費、無需註冊。',
    keywords: 'twitter下載器,x視頻下載器,twitter視頻下載,x.com下載器,免費twitter下載器',
  },
  'ja': {
    title: 'TweetXPro - Twitter動画ダウンロード',
    description: 'TweetXProでTwitter動画、画像、GIFを簡単にダウンロード。高速、無料、登録不要。',
    keywords: 'twitterダウンローダー,x動画ダウンローダー,twitter動画ダウンロード,x.comダウンローダー,無料twitterダウンローダー',
  },
  'ko': {
    title: 'TweetXPro - Twitter 동영상 다운로드',
    description: 'TweetXPro로 Twitter 동영상, 이미지, GIF를 쉽게 다운로드하세요. 빠르고 무료, 가입 불필요.',
    keywords: 'twitter다운로더,x동영상다운로더,twitter동영상다운로드,x.com다운로더,무료twitter다운로더',
  },
  'fr': {
    title: 'TweetXPro - Télécharger des vidéos Twitter',
    description: 'Téléchargez facilement des vidéos, images et GIF Twitter avec TweetXPro. Rapide, gratuit, sans inscription.',
    keywords: 'téléchargeur twitter, téléchargeur vidéo x, téléchargement vidéo twitter, téléchargeur x.com, téléchargeur twitter gratuit',
  },
  'es': {
    title: 'TweetXPro - Descargar videos de Twitter',
    description: 'Descarga fácilmente videos, imágenes y GIF de Twitter con TweetXPro. Rápido, gratuito, sin registro.',
    keywords: 'descargador twitter, descargador video x, descarga video twitter, descargador x.com, descargador twitter gratis',
  },
  'pt': {
    title: 'TweetXPro - Baixar vídeos do Twitter',
    description: 'Baixe facilmente vídeos, imagens e GIF do Twitter com TweetXPro. Rápido, gratuito, sem registro.',
    keywords: 'baixador twitter, baixador video x, baixar video twitter, baixador x.com, baixador twitter gratis',
  },
  'it': {
    title: 'TweetXPro - Scarica video Twitter',
    description: 'Scarica facilmente video, immagini e GIF Twitter con TweetXPro. Veloce, gratuito, senza registrazione.',
    keywords: 'scaricatore twitter, scaricatore video x, scarica video twitter, scaricatore x.com, scaricatore twitter gratis',
  },
  'de': {
    title: 'TweetXPro - Twitter-Videos herunterladen',
    description: 'Laden Sie Twitter-Videos, Bilder und GIFs einfach mit TweetXPro herunter. Schnell, kostenlos, keine Registrierung.',
    keywords: 'twitter downloader, x video downloader, twitter video download, x.com downloader, kostenloser twitter downloader',
  },
  'th': {
    title: 'TweetXPro - ดาวน์โหลดวิดีโอ Twitter',
    description: 'ดาวน์โหลดวิดีโอ รูปภาพ และ GIF จาก Twitter ได้อย่างง่ายดายด้วย TweetXPro เร็ว ฟรี ไม่ต้องลงทะเบียน',
    keywords: 'ดาวน์โหลด twitter, ดาวน์โหลดวิดีโอ x, ดาวน์โหลดวิดีโอ twitter, ดาวน์โหลด x.com, ดาวน์โหลด twitter ฟรี',
  },
  'tr': {
    title: 'TweetXPro - Twitter Video İndir',
    description: 'TweetXPro ile Twitter videolarını, görsellerini ve GIF\'lerini kolayca indirin. Hızlı, ücretsiz, kayıt gerektirmez.',
    keywords: 'twitter indirici, x video indirici, twitter video indir, x.com indirici, ücretsiz twitter indirici',
  },
};

export async function generateMetadata({ params }) {
  const locale = params?.locale || 'en';
  const meta = metaData[locale] || metaData['en'];
  
  return {
    metadataBase: new URL('https://tweetxpro.com'),
    title: {
      default: meta.title,
      template: `%s | TweetXPro`
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'tweetxpro' }],
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: `https://tweetxpro.com/${locale}`,
      languages: {
        'en': 'https://tweetxpro.com/en',
        'zh-CN': 'https://tweetxpro.com/zh-CN',
        'zh-HK': 'https://tweetxpro.com/zh-HK',
        'ja': 'https://tweetxpro.com/ja',
        'ko': 'https://tweetxpro.com/ko',
        'fr': 'https://tweetxpro.com/fr',
        'es': 'https://tweetxpro.com/es',
        'pt': 'https://tweetxpro.com/pt',
        'it': 'https://tweetxpro.com/it',
        'de': 'https://tweetxpro.com/de',
        'th': 'https://tweetxpro.com/th',
        'tr': 'https://tweetxpro.com/tr',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://tweetxpro.com/${locale}`,
      siteName: 'TweetXPro',
      images: [
        {
          url: 'https://tweetxpro.com/images/og.png',
          width: 1200,
          height: 630,
        }
      ],
      locale: locale === 'zh-CN' ? 'zh_CN' : locale === 'zh-HK' ? 'zh_HK' : locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@tweetxpro',
      title: meta.title,
      description: meta.description,
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
}

export default function RootLayout({ children, params }) {
    const locale = params?.locale || 'en';
    const meta = metaData[locale] || metaData['en'];

    // 结构化数据
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TweetXPro",
        "description": meta.description,
        "url": `https://tweetxpro.com/${locale}`,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "creator": {
            "@type": "Organization",
            "name": "TweetXPro",
            "url": "https://tweetxpro.com"
        },
        "inLanguage": locale,
        "availableOnDevice": ["Desktop", "Mobile", "Tablet"],
        "featureList": [
            "Twitter video download",
            "Multi-language support", 
            "Content safety",
            "No registration required"
        ]
    };

    return (
      <html lang={locale} suppressHydrationWarning>
        <head>
            <GoogleAdsense />
            <GoogleAnalytics />
            <UmamiAnalytics />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
        </head>
        <body className="bg-[var(--color-background)] text-[var(--color-foreground)]">
            <Providers>
                <MyNavbar locale={locale} />
                <main className="min-h-[70vh] bg-[var(--color-content)] rounded-xl shadow-md my-6 p-4 border border-[var(--color-accent)]">
                  {children}
                </main>
                <MyFooter locale={locale} />
            </Providers>
        </body>
      </html>
    );
  }