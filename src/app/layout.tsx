'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <h1 className="text-xl font-bold text-gray-900">HR Dashboard</h1>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <a
                        href="/"
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium${
                          pathname === '/'
                            ? ' border-blue-500 text-gray-900'
                            : ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                      >
                        Dashboard
                      </a>
                      <a
                        href="/bookmarks"
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium${
                          pathname === '/bookmarks'
                            ? ' border-blue-500 text-gray-900'
                            : ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                      >
                        Bookmarks
                      </a>
                      <a
                        href="/analytics"
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium${
                          pathname === '/analytics'
                            ? ' border-blue-500 text-gray-900'
                            : ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                      >
                        Analytics
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
