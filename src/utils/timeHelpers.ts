export interface VenueStatus {
  isOpen: boolean;
  statusText: string;
  isHappyHour: boolean;
  closingTimeToday: string;
  currentDayIndex: number;
  currentDayName: string;
}

export function getVenueStatus(): VenueStatus {
  // Use client local time or simulated Central Time
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[day];

  // Hours:
  // Mon-Thu: 11:00 AM (660m) - 12:00 AM (midnight, 1440m or next day 0m)
  // Fri-Sat: 11:00 AM (660m) - 2:00 AM (120m next day)
  // Sun: 11:00 AM (660m) - 12:00 AM (midnight)
  
  let isOpen = false;
  let closingTimeToday = "12:00 AM";

  if (day >= 1 && day <= 4) {
    // Mon-Thu: 11:00 AM - 12:00 AM (24:00)
    isOpen = totalMinutes >= 660 && totalMinutes < 1440;
    closingTimeToday = "12:00 AM";
  } else if (day === 5 || day === 6) {
    // Fri or Sat: 11:00 AM - 2:00 AM
    isOpen = totalMinutes >= 660 || totalMinutes < 120;
    closingTimeToday = "2:00 AM";
  } else if (day === 0) {
    // Sunday: 11:00 AM - 12:00 AM
    isOpen = totalMinutes >= 660 && totalMinutes < 1440;
    closingTimeToday = "12:00 AM";
  }

  // Happy hour: Mon-Fri | 3:00 PM (15:00 = 900m) – 7:00 PM (19:00 = 1140m)
  const isWeekday = day >= 1 && day <= 5;
  const isHappyHour = isWeekday && totalMinutes >= 900 && totalMinutes <= 1140;

  let statusText = "Closed Now";
  if (isHappyHour) {
    statusText = "Happy Hour Live Now! ($2.99 Drafts & $4.99 Margaritas)";
  } else if (isOpen) {
    statusText = `Open Now • Closes at ${closingTimeToday}`;
  } else {
    statusText = "Opens Today at 11:00 AM";
  }

  return {
    isOpen,
    statusText,
    isHappyHour,
    closingTimeToday,
    currentDayIndex: day,
    currentDayName
  };
}
