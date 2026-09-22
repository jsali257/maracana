import { redirect } from 'next/navigation';
import { getSession } from '../../../../lib/session';
import { getAllAdminUsers } from '../../../../lib/collections';
import { CreateStaffForm } from '../../../../components/admin/CreateStaffForm';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getSession();
  if (session.role !== 'owner') {
    redirect('/admin');
  }

  const users = await getAllAdminUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-stone-900">Users</h1>
        <p className="text-sm text-stone-500 mt-1">Manage who can access this dashboard.</p>
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 p-5">
        <h2 className="font-display text-lg font-black uppercase text-stone-900 mb-4">
          Add Staff Account
        </h2>
        <CreateStaffForm />
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-[11px] uppercase tracking-wide text-stone-500">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Added</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={String(u._id)} className="border-b border-stone-100 last:border-0">
                <td className="px-4 py-3 font-semibold text-stone-900">{u.name}</td>
                <td className="px-4 py-3 text-stone-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                      u.role === 'owner'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500 text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
