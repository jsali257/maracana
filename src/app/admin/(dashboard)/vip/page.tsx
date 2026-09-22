import { getAllVipMembers } from '../../../../lib/collections';
import { VipTable } from '../../../../components/admin/VipTable';

export const dynamic = 'force-dynamic';

export default async function AdminVipPage() {
  const members = await getAllVipMembers();

  const rows = members.map(m => ({
    id: String(m._id),
    name: m.name,
    phone: m.phone,
    email: m.email,
    status: m.status,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-stone-900">VIP Text Club</h1>
        <p className="text-sm text-stone-500 mt-1">{members.length} total signups</p>
      </div>
      <VipTable members={rows} />
    </div>
  );
}
