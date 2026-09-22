'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStaffAccount } from '../../lib/actions';

export function CreateStaffForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'staff' as 'owner' | 'staff' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await createStaffAccount(form);
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setForm({ name: '', email: '', password: '', role: 'staff' });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-stone-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-stone-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Temporary Password</label>
          <input
            type="text"
            required
            minLength={8}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm font-mono focus:outline-none focus:border-stone-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value as 'owner' | 'staff' })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm focus:outline-none focus:border-stone-500"
          >
            <option value="staff">Staff</option>
            <option value="owner">Owner</option>
          </select>
        </div>
      </div>

      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  );
}
