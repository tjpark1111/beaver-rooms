export interface Room {
  id: string;
  building: string;
  number: string;
  capacity: "solo" | "small-group" | "large-group";
  reservations: Reservation[];
}

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  checkedIn: boolean;
  violations: string[];
}

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

const today = new Date();
const h = (hour: number, min: number = 0) => {
  const d = new Date(today);
  d.setHours(hour, min, 0, 0);
  return d;
};

export const USER_SCHEDULE: CalendarEvent[] = [
  { title: "Finance Class", start: h(10, 0), end: h(11, 30) },
  { title: "Marketing Seminar", start: h(13, 0), end: h(14, 45) },
  { title: "Evening Exam", start: h(18, 0), end: h(20, 0) },
];

export const ROOMS: Room[] = [
  { id: "e62-217", building: "E62", number: "217", capacity: "solo", reservations: [] },
  { id: "e62-265", building: "E62", number: "265", capacity: "solo", reservations: [] },
  { id: "e62-310", building: "E62", number: "310", capacity: "small-group", reservations: [] },
  { id: "e62-422", building: "E62", number: "422", capacity: "small-group", reservations: [] },
  { id: "e62-515", building: "E62", number: "515", capacity: "large-group", reservations: [] },
  { id: "e52-101", building: "E52", number: "101", capacity: "solo", reservations: [] },
  { id: "e52-204", building: "E52", number: "204", capacity: "small-group", reservations: [] },
  { id: "e52-350", building: "E52", number: "350", capacity: "large-group", reservations: [] },
];

export function findFreeSlots(schedule: CalendarEvent[]): TimeSlot[] {
  const sorted = [...schedule].sort((a, b) => a.start.getTime() - b.start.getTime());
  const slots: TimeSlot[] = [];
  const dayStart = h(0, 0);
  const dayEnd = h(24, 0);

  let cursor = dayStart;
  for (const event of sorted) {
    if (event.start > cursor) {
      slots.push({ start: new Date(cursor), end: new Date(event.start) });
    }
    if (event.end > cursor) cursor = new Date(event.end);
  }
  if (cursor < dayEnd) {
    slots.push({ start: new Date(cursor), end: dayEnd });
  }
  return slots;
}

function roundUpToQuarterHourEDT(): Date {
  // Get current time in EDT (UTC-4)
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const edtMs = utcMs - 4 * 3600000;
  const edt = new Date(edtMs);

  const mins = edt.getMinutes();
  const remainder = mins % 15;
  if (remainder !== 0 || edt.getSeconds() > 0 || edt.getMilliseconds() > 0) {
    edt.setMinutes(mins + (15 - remainder), 0, 0);
  } else {
    edt.setSeconds(0, 0);
  }

  // Map back to a "today" Date using the EDT hours/minutes
  const result = new Date(today);
  result.setHours(edt.getHours(), edt.getMinutes(), 0, 0);
  return result;
}

export function getCurrentFreeSlot(_schedule: CalendarEvent[]): TimeSlot | null {
  const nowRounded = roundUpToQuarterHourEDT();
  // No building hours — allow reservations 24/7, extending 24h from now
  const farEnd = new Date(nowRounded.getTime() + 24 * 60 * 60 * 1000);
  return { start: nowRounded, end: farEnd };
}

export type GroupSize = "solo" | "small-group" | "large-group";

export function findAvailableRoom(
  rooms: Room[],
  groupSize: GroupSize,
  slot: TimeSlot,
  excludeRoomId?: string
): Room | null {
  return rooms.find(r => {
    if (r.capacity !== groupSize) return false;
    if (excludeRoomId && r.id === excludeRoomId) return false;
    // Check no overlapping reservations
    return !r.reservations.some(
      res => res.startTime < slot.end && res.endTime > slot.start
    );
  }) || null;
}

export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const minStr = minutes.toString().padStart(2, '0');
  return `${h12}:${minStr}${ampm}`;
}

export function formatTimeRange(start: Date, end: Date): string {
  return `${formatTime(start)}-${formatTime(end)}`;
}

export function generateLaterSlots(groupSize: GroupSize): TimeSlot[] {
  const nowRounded = roundUpToQuarterHourEDT();
  const duration = groupSize === "solo" ? 30 : 60;
  const slots: TimeSlot[] = [];
  // Generate slots every 30 minutes for the next 8 hours
  for (let i = 0; i < 16; i++) {
    const start = new Date(nowRounded.getTime() + i * 30 * 60 * 1000);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    slots.push({ start, end });
  }
  return slots;
}
