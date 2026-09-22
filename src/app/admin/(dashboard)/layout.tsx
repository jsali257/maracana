import Link from 'next/link';
import { LayoutDashboard, CalendarCheck, MessageCircleHeart, BarChart3, Users, LogOut } from 'lucide-react';
import { getSession } from '../../../lib/session';
import { logoutAction } from '../../../lib/actions';
import { MaracanaLogo } from '../../../components/MaracanaLogo';

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/reservations', label: 'Reservations', icon: CalendarCheck },
  { href: '/admin/vip', label: 'VIP Club', icon: MessageCircleHeart },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  const navItems =
    session.role === 'owner'
      ? [...NAV_ITEMS, { href: '/admin/users', label: 'Users', icon: Users }]
      : NAV_ITEMS;

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-stone-950 text-stone-300">
        <div className="flex items-center gap-3 px-5 py-6 border-b border-stone-800">
          <MaracanaLogo className="w-9 h-9" />
          <div>
            <p className="font-display text-sm font-black uppercase text-white tracking-wide">
              El Maracaná
            </p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-300 hover:text-white hover:bg-stone-900 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-stone-800 space-y-2">
          <div className="px-3">
            <p className="text-xs font-semibold text-white truncate">{session.name}</p>
            <p className="text-[11px] text-stone-500 truncate">{session.email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-900 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-stone-950 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <MaracanaLogo className="w-7 h-7" />
          <span className="font-display text-xs font-black uppercase tracking-wide">Admin</span>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="p-2 rounded-lg bg-stone-900 text-stone-300 cursor-pointer" aria-label="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="flex-1 min-w-0">
        {/* Mobile nav row */}
        <nav className="md:hidden fixed top-[52px] left-0 right-0 z-30 bg-white border-b border-stone-200 flex items-center gap-1 px-2 py-2 overflow-x-auto no-scrollbar">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 whitespace-nowrap shrink-0"
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 pt-[104px] md:pt-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
