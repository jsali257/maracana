'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Download } from 'lucide-react';
import { updateVipStatus } from '../../lib/actions';

interface VipRow {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'active' | 'unsubscribed';
  createdAt: string;
}

export function VipTable({ members }: { members: VipRow[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      m => m.name.toLowerCase().includes(q) || m.phone.includes(q) || (m.email ?? '').toLowerCase().includes(q)
    );
  }, [members, query]);

  const exportCsv = () => {
    const header = ['Name', 'Phone', 'Email', 'Status', 'Joined'];
    const rows = filtered.map(m => [m.name, m.phone, m.email ?? '', m.status, m.createdAt]);
    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vip-club-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, phone, email..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-stone-500"
          />
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-[11px] uppercase tracking-wide text-stone-500">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-stone-400">
                    No VIP members found.
                  </td>
                </tr>
              ) : (
                filtered.map(m => <VipRowItem key={m.id} member={m} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VipRowItem({ member }: { member: VipRow }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleStatus = () => {
    const next = member.status === 'active' ? 'unsubscribed' : 'active';
    startTransition(async () => {
      await updateVipStatus(member.id, next);
      router.refresh();
    });
  };

  return (
    <tr className="border-b border-stone-100 last:border-0">
      <td className="px-4 py-3 font-semibold text-stone-900">{member.name}</td>
      <td className="px-4 py-3 text-stone-600">{member.phone}</td>
      <td className="px-4 py-3 text-stone-500 text-xs">{member.email || '—'}</td>
      <td className="px-4 py-3 text-stone-500 text-xs">{new Date(member.createdAt).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
            member.status === 'active'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-stone-100 text-stone-500 border-stone-200'
          }`}
        >
          {member.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={toggleStatus}
          disabled={isPending}
          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 cursor-pointer disabled:opacity-50"
        >
          {member.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
        </button>
      </td>
    </tr>
  );
}
