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
  const dayStart = h(8, 0);
  const dayEnd = h(22, 0);

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

export function getCurrentFreeSlot(schedule: CalendarEvent[]): TimeSlot | null {
  // For demo, return a simulated "current" free slot
  const slots = findFreeSlots(schedule);
  // Return the slot around 2:45 PM for the demo
  const demoTime = h(14, 45);
  const slot = slots.find(s => s.start.getTime() <= demoTime.getTime() && s.end.getTime() > demoTime.getTime());
  return slot || slots[0] || null;
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
