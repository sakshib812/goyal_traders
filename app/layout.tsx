import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'GOYAL TRADERS | B2B digital payments for retailers & distributors',
  description: 'Goyal Traders brings recharge, bill payments, verification and banking services together so your business can launch faster.',
  keywords: ['fintech', 'recharge APIs', 'bill payments', 'verification APIs', 'banking correspondent', 'Goyal Traders'],
  authors: [{ name: 'Goyal Traders' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/goyal-traders-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/goyal-traders-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
