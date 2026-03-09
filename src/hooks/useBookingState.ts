import { useState, useCallback } from "react";
import {
  ROOMS,
  USER_SCHEDULE,
  getCurrentFreeSlot,
  findAvailableRoom,
  Room,
  TimeSlot,
  GroupSize,
} from "@/lib/dummyData";

export type BookingScreen =
  | "who-coming"
  | "reserved"
  | "checked-in"
  | "times-up"
  | "report-done"
  | "violation-policy";

export interface BookingState {
  screen: BookingScreen;
  groupSize: GroupSize | null;
  selectedRoom: Room | null;
  currentSlot: TimeSlot | null;
  reservationSlot: TimeSlot | null;
  isCheckedIn: boolean;
  extensionCount: number;
  groupEmails: string[];
}

export function useBookingState() {
  const freeSlot = getCurrentFreeSlot(USER_SCHEDULE);

  const [screenHistory, setScreenHistory] = useState<BookingScreen[]>([]);

  const [state, setState] = useState<BookingState>({
    screen: "who-coming",
    groupSize: null,
    selectedRoom: null,
    currentSlot: freeSlot,
    reservationSlot: null,
    isCheckedIn: false,
    extensionCount: 0,
    groupEmails: [],
  });

  const selectGroupSize = useCallback(
    (size: GroupSize) => {
      if (!freeSlot) return;
      const duration = size === "solo" ? 30 : 60;
      const end = new Date(freeSlot.start.getTime() + duration * 60 * 1000);
      const slotEnd = end > freeSlot.end ? freeSlot.end : end;
      const slot: TimeSlot = { start: freeSlot.start, end: slotEnd };
      const room = findAvailableRoom(ROOMS, size, slot);
      setState((s) => ({
        ...s,
        groupSize: size,
        selectedRoom: room,
        reservationSlot: slot,
      }));
    },
    [freeSlot]
  );

  const navigateTo = useCallback((screen: BookingScreen, updates: Partial<BookingState> = {}) => {
    setState((s) => {
      setScreenHistory((h) => [...h, s.screen]);
      return { ...s, ...updates, screen };
    });
  }, []);

  const goBack = useCallback(() => {
    setScreenHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setState((s) => ({ ...s, screen: prev }));
      return h.slice(0, -1);
    });
  }, []);

  const reserve = useCallback(() => {
    navigateTo("reserved");
  }, [navigateTo]);

  const checkIn = useCallback(() => {
    navigateTo("checked-in", { isCheckedIn: true });
  }, [navigateTo]);

  const timesUp = useCallback(() => {
    navigateTo("times-up");
  }, [navigateTo]);

  const extend = useCallback(() => {
    if (!state.reservationSlot || !state.selectedRoom) return;
    const duration = state.groupSize === "solo" ? 30 : 60;
    const newEnd = new Date(state.reservationSlot.end.getTime() + duration * 60 * 1000);
    const newSlot: TimeSlot = { start: state.reservationSlot.start, end: newEnd };
    // Check if current room is available for extension
    const available = findAvailableRoom(ROOMS, state.groupSize!, newSlot);
    if (available && available.id === state.selectedRoom.id) {
      setState((s) => ({
        ...s,
        reservationSlot: newSlot,
        extensionCount: s.extensionCount + 1,
        screen: "checked-in",
      }));
    }
  }, [state.reservationSlot, state.selectedRoom, state.groupSize]);

  const switchRoom = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: "who-coming",
      groupSize: null,
      selectedRoom: null,
      reservationSlot: null,
      isCheckedIn: false,
      extensionCount: 0,
    }));
  }, []);

  const reportOccupied = useCallback(() => {
    setState((s) => ({ ...s, screen: "report-done" }));
  }, []);

  const findSpace = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: "who-coming",
      groupSize: null,
      selectedRoom: null,
      reservationSlot: null,
      isCheckedIn: false,
      extensionCount: 0,
    }));
  }, []);

  const canExtend = state.extensionCount < 1;

  const extensionAvailable = (() => {
    if (!canExtend || !state.reservationSlot || !state.selectedRoom || !state.groupSize) return false;
    const duration = state.groupSize === "solo" ? 30 : 60;
    const newEnd = new Date(state.reservationSlot.end.getTime() + duration * 60 * 1000);
    const newSlot: TimeSlot = { start: state.reservationSlot.end, end: newEnd };
    const room = findAvailableRoom(ROOMS, state.groupSize, newSlot);
    return room?.id === state.selectedRoom.id;
  })();

  const switchGroupSize = useCallback(
    (newSize: GroupSize) => {
      if (!freeSlot) return;
      const duration = newSize === "solo" ? 30 : 60;
      const end = new Date(freeSlot.start.getTime() + duration * 60 * 1000);
      const slotEnd = end > freeSlot.end ? freeSlot.end : end;
      const slot: TimeSlot = { start: freeSlot.start, end: slotEnd };
      const room = findAvailableRoom(ROOMS, newSize, slot);
      setState((s) => ({
        ...s,
        groupSize: newSize,
        selectedRoom: room,
        reservationSlot: slot,
        screen: "who-coming",
        isCheckedIn: false,
        extensionCount: 0,
      }));
    },
    [freeSlot]
  );

  return {
    state,
    freeSlot,
    selectGroupSize,
    reserve,
    checkIn,
    timesUp,
    extend,
    switchRoom,
    reportOccupied,
    findSpace,
    canExtend,
    extensionAvailable,
    switchGroupSize,
  };
}
