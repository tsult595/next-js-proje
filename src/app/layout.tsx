import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import Providers from './store/Providers';
import { AuthProvider } from '../contexts/AuthContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fake Store',
  description: 'Online store with fake products from FakeStoreAPI',
  metadataBase: new URL('http://localhost:3001'),
  openGraph: {
    title: 'Fake Store',
    description: 'Browse and shop fake products',
    url: 'https://your-site.com',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preload" href="/next.svg" as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased gradient-bg`}>
        <AuthProvider>
          <Providers>
            <main className="py-7 px-5 max-w-7xl mx-auto">{children}</main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}