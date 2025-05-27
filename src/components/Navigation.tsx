'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from './ui/Button';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-bold text-gray-900">HR Dashboard</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium${
                  pathname === '/'
                    ? ' border-blue-500 text-gray-900'
                    : ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/bookmarks"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium${
                  pathname === '/bookmarks'
                    ? ' border-blue-500 text-gray-900'
                    : ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Bookmarks
              </Link>
              <Link
                href="/analytics"
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium${
                  pathname === '/analytics'
                    ? ' border-blue-500 text-gray-900'
                    : ' border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Analytics
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-500">
              {user?.name} ({user?.role})
            </span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 