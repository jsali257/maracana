import { Eye, MessageCircleHeart, CalendarCheck } from 'lucide-react';
import { getPageviewsByDay, getTopReferrers, getDeviceBreakdown, getConversionCounts } from '../../../../lib/collections';
import { PageviewsChart } from '../../../../components/admin/PageviewsChart';

export const dynamic = 'force-dynamic';

const DEVICE_COLORS: Record<string, string> = {
  desktop: '#2a78d6',
  mobile: '#eb6834',
  tablet: '#1baf7a',
};
const DEVICE_LABELS: Record<string, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  tablet: 'Tablet',
};

export default async function AdminAnalyticsPage() {
  const [pageviews, referrers, devices, conversions] = await Promise.all([
    getPageviewsByDay(30),
    getTopReferrers(30, 6),
    getDeviceBreakdown(30),
    getConversionCounts(30),
  ]);

  const deviceTotal = Math.max(1, devices.reduce((sum, d) => sum + d.count, 0));

  const statTiles = [
    { label: 'Pageviews (30d)', value: conversions.pageviews, icon: Eye },
    { label: 'VIP Signups (30d)', value: conversions.vipSignups, icon: MessageCircleHeart },
    { label: 'Reservations (30d)', value: conversions.reservationsSubmitted, icon: CalendarCheck },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-stone-900">Analytics</h1>
        <p className="text-sm text-stone-500 mt-1">Last 30 days</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statTiles.map(tile => (
          <div key={tile.label} className="rounded-2xl bg-white border border-stone-200 p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center shrink-0">
              <tile.icon className="w-5 h-5 text-stone-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-stone-900">{tile.value}</p>
              <p className="text-xs text-stone-500 font-semibold">{tile.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 p-5">
        <h2 className="font-display text-lg font-black uppercase text-stone-900 mb-5">
          Pageviews per Day
        </h2>
        <PageviewsChart data={pageviews} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <h2 className="font-display text-lg font-black uppercase text-stone-900 mb-4">
            Device Breakdown
          </h2>
          {devices.length === 0 ? (
            <p className="text-sm text-stone-400 py-6 text-center">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {devices.map(d => {
                const pct = Math.round((d.count / deviceTotal) * 100);
                const color = DEVICE_COLORS[d._id] ?? '#898781';
                return (
                  <li key={d._id}>
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {DEVICE_LABELS[d._id] ?? d._id}
                      </span>
                      <span className="text-stone-500">{d.count} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-stone-200 p-5">
          <h2 className="font-display text-lg font-black uppercase text-stone-900 mb-4">
            Top Referrers
          </h2>
          {referrers.length === 0 ? (
            <p className="text-sm text-stone-400 py-6 text-center">
              No referrer data yet — most visits are direct.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {referrers.map(r => (
                <li key={r._id} className="flex items-center justify-between text-sm">
                  <span className="text-stone-700 truncate max-w-[70%]">{r._id}</span>
                  <span className="text-stone-500 font-semibold">{r.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
