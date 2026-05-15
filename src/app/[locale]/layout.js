





import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages();
  
  const seo = messages?.seo || {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: seo.title || 'AYSA AFRICA',
    description: seo.description || 'Empowering African Youth',
    keywords: seo.keywords || '',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
    openGraph: {
      title: seo.ogTitle || 'AYSA AFRICA',
      description: seo.ogDescription || '',
      url: `${siteUrl}/${locale}`,
      siteName: 'AYSA AFRICA',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle || 'AYSA AFRICA',
      description: seo.ogDescription || '',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#167616" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AYSA AFRICA',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              description: locale === 'fr' 
                ? 'Organisation pour l\'autonomisation de la jeunesse africaine'
                : 'Organization for empowering African youth',
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-stone-200">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
