'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateReservationStatus } from '../../lib/actions';

export function ReservationStatusControl({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const setStatus = (next: 'confirmed' | 'cancelled' | 'pending') => {
    setError('');
    startTransition(async () => {
      const result = await updateReservationStatus(id, next);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      {status !== 'confirmed' && (
        <button
          onClick={() => setStatus('confirmed')}
          disabled={isPending}
          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer disabled:opacity-50"
        >
          Confirm
        </button>
      )}
      {status !== 'cancelled' && (
        <button
          onClick={() => setStatus('cancelled')}
          disabled={isPending}
          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
      )}
      {error && <span className="text-[10px] text-red-600">{error}</span>}
    </div>
  );
}
