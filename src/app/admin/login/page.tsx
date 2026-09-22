'use client';

import { useActionState } from 'react';
import { loginAction } from '../../../lib/actions';
import { MaracanaLogo } from '../../../components/MaracanaLogo';

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-stone-200 p-8 shadow-2xl space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <MaracanaLogo className="w-14 h-14" />
          <div>
            <h1 className="font-display text-2xl font-black uppercase text-stone-900">
              Admin Dashboard
            </h1>
            <p className="text-xs text-stone-500 mt-1">El Maracaná Sports Bar &amp; Grill</p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          {state?.error && (
            <p className="text-xs text-center text-red-600 font-semibold">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 rounded-xl font-bold text-sm bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
