'use client';

import { useState, useEffect } from 'react';

interface StoreHours {
  day: string;
  open: string;
  close: string;
}

const STORE_TIMEZONE = 'America/New_York';

const storeHours: StoreHours[] = [
  { day: 'Sunday', open: '11:00', close: '18:00' },
  { day: 'Monday', open: '10:00', close: '20:00' },
  { day: 'Tuesday', open: '10:00', close: '20:00' },
  { day: 'Wednesday', open: '10:00', close: '20:00' },
  { day: 'Thursday', open: '10:00', close: '20:00' },
  { day: 'Friday', open: '10:00', close: '21:00' },
  { day: 'Saturday', open: '10:00', close: '19:00' }
];

export function useStoreOpenStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpenTime, setNextOpenTime] = useState<string>('');
  const [currentDayHours, setCurrentDayHours] = useState<StoreHours | null>(null);

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      
      // Get current time in store timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: STORE_TIMEZONE,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        weekday: 'long'
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      
      const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
      const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
      const dayName = parts.find(p => p.type === 'weekday')?.value || '';
      
      const currentMinutes = hour * 60 + minute;
      
      // Find today's hours
      const todayHours = storeHours.find(h => h.day === dayName);
      setCurrentDayHours(todayHours || null);
      
      if (!todayHours) {
        setIsOpen(false);
        setNextOpenTime('Opens tomorrow');
        return;
      }
      
      const [openHour, openMinute] = todayHours.open.split(':').map(Number);
      const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
      
      const openMinutes = openHour * 60 + openMinute;
      const closeMinutes = closeHour * 60 + closeMinute;
      
      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        setIsOpen(true);
        setNextOpenTime(`Closes at ${todayHours.close}`);
      } else if (currentMinutes < openMinutes) {
        setIsOpen(false);
        setNextOpenTime(`Opens at ${todayHours.open}`);
      } else {
        setIsOpen(false);
        // Find next day's hours
        const todayIndex = storeHours.findIndex(h => h.day === dayName);
        const nextDayIndex = (todayIndex + 1) % 7;
        const nextDay = storeHours[nextDayIndex];
        setNextOpenTime(`Opens ${nextDay.day} at ${nextDay.open}`);
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return { isOpen, nextOpenTime, currentDayHours, storeHours };
}
