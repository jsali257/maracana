import { getAllReservations } from '../../../../lib/collections';
import { ReservationStatusControl } from '../../../../components/admin/ReservationStatusControl';
import type { Reservation } from '../../../../lib/collections';

export const dynamic = 'force-dynamic';

export default async function AdminReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const validStatus = status === 'pending' || status === 'confirmed' || status === 'cancelled' ? status : undefined;
  const reservations = await getAllReservations(validStatus as Reservation['status'] | undefined);

  const filters = [
    { label: 'All', value: undefined },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-stone-900">Reservations</h1>
        <p className="text-sm text-stone-500 mt-1">{reservations.length} total</p>
      </div>

      <div className="flex items-center gap-2">
        {filters.map(f => (
          <a
            key={f.label}
            href={f.value ? `/admin/reservations?status=${f.value}` : '/admin/reservations'}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              validStatus === f.value
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-[11px] uppercase tracking-wide text-stone-500">
                <th className="px-4 py-3 font-semibold">Guest</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Date &amp; Time</th>
                <th className="px-4 py-3 font-semibold">Party</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-stone-400">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map(r => (
                  <tr key={String(r._id)} className="border-b border-stone-100 last:border-0 align-top">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-stone-900">{r.name}</p>
                      <p className="text-[11px] text-stone-400 font-mono">{r.confirmationCode}</p>
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      <p>{r.phone}</p>
                      {r.email && <p className="text-xs text-stone-400">{r.email}</p>}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      <p>{r.date}</p>
                      <p className="text-xs text-stone-400">{r.time}</p>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{r.guests}</td>
                    <td className="px-4 py-3 text-stone-500 text-xs max-w-[220px]">
                      {r.seatingPreference && <p className="capitalize">{r.seatingPreference.replace(/-/g, ' ')}</p>}
                      {r.eventName && <p>{r.eventName}</p>}
                      {r.specialRequests && <p className="truncate">{r.specialRequests}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <ReservationStatusControl id={String(r._id)} status={r.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}
