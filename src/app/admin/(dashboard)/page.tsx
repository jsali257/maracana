import Link from 'next/link';
import { CalendarCheck, MessageCircleHeart, Eye, ArrowRight } from 'lucide-react';
import { getOverviewStats, getRecentReservations, getRecentVipSignups } from '../../../lib/collections';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const [stats, recentReservations, recentVip] = await Promise.all([
    getOverviewStats(),
    getRecentReservations(5),
    getRecentVipSignups(5),
  ]);

  const statCards = [
    {
      label: 'Reservations This Week',
      value: stats.reservationsThisWeek,
      icon: CalendarCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      label: 'Active VIP Members',
      value: stats.activeVipCount,
      icon: MessageCircleHeart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      label: 'Pageviews (7 days)',
      value: stats.pageviewsLast7Days,
      icon: Eye,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-stone-900">Overview</h1>
        <p className="text-sm text-stone-500 mt-1">A snapshot of what's happening at El Maracaná.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="rounded-2xl bg-white border border-stone-200 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-stone-900">{card.value}</p>
              <p className="text-xs text-stone-500 font-semibold">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-black uppercase text-stone-900">
              Recent Reservations
            </h2>
            <Link href="/admin/reservations" className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentReservations.length === 0 ? (
            <p className="text-sm text-stone-400 py-6 text-center">No reservations yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentReservations.map(r => (
                <li key={String(r._id)} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{r.name}</p>
                    <p className="text-xs text-stone-500">{r.date} at {r.time} &middot; {r.guests} guests</p>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-black uppercase text-stone-900">
              Recent VIP Signups
            </h2>
            <Link href="/admin/vip" className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentVip.length === 0 ? (
            <p className="text-sm text-stone-400 py-6 text-center">No signups yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentVip.map(v => (
                <li key={String(v._id)} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{v.name}</p>
                    <p className="text-xs text-stone-500">{v.phone}</p>
                  </div>
                  <span className="text-xs text-stone-400 shrink-0">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-stone-100 text-stone-500 border-stone-200',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0 ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}
