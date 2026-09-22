'use client';

import { useState } from 'react';

interface DayPoint {
  date: string;
  count: number;
}

export function PageviewsChart({ data }: { data: DayPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(1, ...data.map(d => d.count));
  const gridlineSteps = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative">
      <div className="flex items-end gap-px sm:gap-0.5 h-40 border-b border-[#c3c2b7] relative">
        {gridlineSteps.map(step => (
          <div
            key={step}
            className="absolute left-0 right-0 border-t border-[#e1e0d9]"
            style={{ bottom: `${step * 100}%` }}
          />
        ))}
        {data.map((d, i) => {
          const heightPct = (d.count / max) * 100;
          return (
            <div
              key={d.date}
              className="relative flex-1 h-full flex items-end group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-full rounded-t-[3px] bg-amber-500 group-hover:bg-amber-600 transition-colors min-h-[2px]"
                style={{ height: `${Math.max(heightPct, 1)}%` }}
              />
              {hovered === i && (
                <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 z-10 px-2 py-1 rounded-lg bg-stone-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-lg pointer-events-none">
                  {new Date(d.date + 'T00:00:00').toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                  : {d.count}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-[#898781] font-semibold">
        <span>
          {new Date(data[0]?.date + 'T00:00:00').toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <span>
          {new Date(data[data.length - 1]?.date + 'T00:00:00').toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
