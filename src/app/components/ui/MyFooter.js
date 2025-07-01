import { getTranslation } from '@/lib/i18n';
import { Link,Chip } from '@heroui/react';

export default function MyFooter({ locale = 'en' }) {
    const t = function(key){
        return getTranslation(locale, key);
    }
    return (
        <div className="page-container p-10 flex justify-between">
            <div className="flex flex-col gap-2 w-full md:w-1/3">
                <div className="flex items-center gap-1">
                    <p className="text-xl font-bold mb-2 w-fit">{t('TweetXPro')}</p>
                    <Link href="https://github.com/RockGui/twitterxdownload" target="_blank"><Chip color="danger" size="sm" variant="flat" className="ml-2 -mt-1.5">v{process.env.APP_VERSION}</Chip></Link>
                </div>
                <p className="text-sm text-gray-500 mb-7">{t('The fastest and most reliable Twitter video downloader. Free to use, no registration required.')}</p>
                <div className="flex items-center">
                    <p className="text-sm text-gray-500">© 2024 TweetXPro {t('All rights reserved.')}</p>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
                <div>
                    <p className="font-bold mb-2">{t('Other Links')}</p>
                    <ul className="flex flex-col gap-1">
                        <li><Link href="/about-us" className="text-sm hover:text-primary">{t('About Us')}</Link></li>
                        <li><Link href="/privacy-policy" className="text-sm hover:text-primary">{t('Privacy Policy')}</Link></li>
                        <li><Link href="/terms-of-service" className="text-sm hover:text-primary">{t('Terms of Service')}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
                <div>
                    <p className="font-bold mb-2">{t('Contact Us')}</p>    
                    <Link href="mailto:support@tweetxpro.com" className="text-sm hover:text-primary mb-4">support@tweetxpro.com</Link>
                    <a href="https://supadr.com?utm_source=tweetxpro.com&utm_medium=badge&utm_campaign=supadr" target="_blank">
                        <img src="https://supadr.com/api/badge/tweetxpro.com.svg?theme=blue" alt="Domain Rating for tweetxpro.com" width="280" height="64" />
                    </a>
                </div>
            </div>
        </div>
    )
}