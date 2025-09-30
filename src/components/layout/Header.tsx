import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Submit Evidence', href: '/submit' },
  { name: 'Case Status', href: '/status' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'For Authorities', href: '/authorities' },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/20 bg-white/80 backdrop-blur-md dark:border-slate-800/20 dark:bg-slate-950/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 via-red-500 via-amber-400 via-blue-800 to-slate-400">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Sentinel Atlas
              </h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                  location.pathname === item.href
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Globe className="mr-2 h-4 w-4" />
              EN
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}