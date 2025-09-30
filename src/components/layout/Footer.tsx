import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Globe, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 via-red-500 via-amber-400 via-blue-800 to-slate-400">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Sentinel Atlas
              </h2>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Global, secure intake portal for reporting hate-speech content with authority-grade evidence packaging.
            </p>
            
            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>Evidence hashing</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Signed reports</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>Jurisdiction-aware routing</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/submit" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Submit Evidence</Link></li>
              <li><Link to="/status" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Case Status</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">How It Works</Link></li>
              <li><Link to="/verify" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Verify Evidence</Link></li>
            </ul>
          </div>

          {/* For Authorities */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">For Authorities</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/authorities" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Verification Portal</Link></li>
              <li><Link to="/authorities/api" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">API Documentation</Link></li>
              <li><Link to="/authorities/signature-checker" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Signature Checker</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Legal & Privacy</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/privacy" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Terms of Service</Link></li>
              <li><Link to="/gdpr" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">GDPR Rights</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 Sentinel Atlas. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <select className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="ar">العربية</option>
                <option value="he">עברית</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}