import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '../components/common/SmoothScroll';

const geomFont = localFont({
  src: [
    {
      path: '../public/font/Marcellus-Regular.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-geom',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Stilvoll India India | Elevating Spaces',
  description: 'The Future of Hardware. Premium Architectural Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`antialiased ${geomFont.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
