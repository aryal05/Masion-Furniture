'use client';

import { useStoreOpenStatus } from '@/lib/hooks/useStoreOpenStatus';

export function StoreHours() {
  const { isOpen, nextOpenTime, storeHours } = useStoreOpenStatus();

  // Get current day name in store timezone
  const now = new Date();
  const todayName = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
  }).format(now);

  return (
    <div className="bg-card rounded-2xl border border-line p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-ink text-lg">Store Hours</h3>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>

      <p className="text-xs text-muted mb-4">{nextOpenTime} • Eastern Time</p>

      <ul className="space-y-2">
        {storeHours.map((hours) => {
          const isToday = hours.day === todayName;
          return (
            <li
              key={hours.day}
              className={`flex items-center justify-between text-sm py-1.5 px-3 rounded-lg ${
                isToday ? 'bg-primary/5 font-semibold text-ink' : 'text-body'
              }`}
            >
              <span>{hours.day}</span>
              <span>{hours.open} – {hours.close}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
