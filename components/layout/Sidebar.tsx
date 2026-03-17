'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Home, Wrench, Package, FileCheck, Settings } from 'lucide-react';

export function Sidebar({ locale }: { locale: string }) {
  // Tunaita maneno yetu ya lugha mbili kutoka kwenye file la json (Namespace: Navigation)
  const t = useTranslations('Navigation');

  // Orodha ya menu zetu
  const links = [
    { href: `/${locale}`, icon: Home, label: t('dashboard') },
    { href: `/${locale}/job-cards`, icon: Wrench, label: t('jobCards') },
    { href: `/${locale}/inventory`, icon: Package, label: t('inventory') },
    { href: `/${locale}/inspections`, icon: FileCheck, label: t('inspection') },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col">
      {/* Kichwa cha Mfumo */}
      <div className="p-6 border-b border-slate-800 text-center">
        <h2 className="text-2xl font-bold text-blue-500">MoTech-i</h2>
        <p className="text-xs text-slate-400 mt-1">Intelligent Autoworks</p>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-colors"
            >
              <Icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sehemu ya chini ya Sidebar */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}