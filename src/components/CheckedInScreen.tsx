import { Button } from "@/components/ui/button";
import { formatTime, formatTimeRange } from "@/lib/dummyData";
import type { Room, TimeSlot } from "@/lib/dummyData";
import { CheckCircle2, MapPin, Clock } from "lucide-react";

interface CheckedInScreenProps {
  room: Room;
  slot: TimeSlot;
  onSimulateTimesUp: () => void;
  onReportOccupied: () => void;
}

const CheckedInScreen = ({ room, slot, onSimulateTimesUp, onReportOccupied }: CheckedInScreenProps) => {
  return (
    <div className="flex flex-col items-center px-6 pt-10">
      <CheckCircle2 className="h-12 w-12 text-emerald-600 mb-3" />
      <h2 className="text-xl font-bold text-foreground">Checked In</h2>

      <div className="bg-card rounded-2xl shadow-md p-5 w-full max-w-xs text-center mt-4">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">{room.building}-{room.number}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatTimeRange(slot.start, slot.end)}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center max-w-xs">
        Please vacate the room by <span className="font-semibold">{formatTime(slot.end)}</span> with all belongings.
      </p>

      {/* Demo button to simulate time's up */}
      <Button
        variant="outline"
        size="sm"
        className="mt-8"
        onClick={onSimulateTimesUp}
      >
        ⏱ Simulate Time's Up
      </Button>
    </div>
  );
};

export default CheckedInScreen;
