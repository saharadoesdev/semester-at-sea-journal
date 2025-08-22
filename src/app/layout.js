import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sahara at Sea | A Semester Abroad Journal",
  description: "Follow Sahara Smith's 100-day journey across Europe, Africa, and Asia with the Semester at Sea study abroad program. Featuring a live-tracking map, daily journal entries, and interactive stories from ports of call around the world.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Sahara at Sea | A Semester Abroad Journal",
    description: "Follow Sahara's study abroad journey around the world.",
    url: 'https://whereis.saharasmith.com',
    siteName: "Sahara's Voyage",
    // images: [
    //   {
    //     url: 'https://whereis.saharasmith.com/og-image.png', // Path to your social sharing image
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="page-wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
