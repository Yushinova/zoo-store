import { UserProvider } from '@/app/providers/UserProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieNotice from '@/components/footer/CookieNotice';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Лучший друг - Магазин зоотоваров",
  description: "Корма, уход и многое другое для ваших питомцев",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          {children}
        </UserProvider>
        {/* CookieNotice отдельно */}
        <CookieNotice />
      </body>
    </html>
  );
}