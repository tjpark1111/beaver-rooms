import { Button } from "@/components/ui/button";
import { formatTimeRange } from "@/lib/dummyData";
import type { Room, TimeSlot } from "@/lib/dummyData";
import { Clock, MapPin } from "lucide-react";

interface ReservedScreenProps {
  room: Room;
  slot: TimeSlot;
  isLater: boolean;
  onCheckIn: () => void;
  onReportOccupied: () => void;
}

const ReservedScreen = ({ room, slot, isLater, onCheckIn, onReportOccupied }: ReservedScreenProps) => {
  return (
    <div className="flex flex-col items-center px-6 pt-10">
      <div className="bg-card rounded-2xl shadow-md p-6 w-full max-w-xs text-center">
        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-foreground">
          {room.building}-{room.number}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-base">{formatTimeRange(slot.start, slot.end)}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          {isLater ? "Reserved — remember to check in later when you enter your room" : "Reserved — head to the room now"}
        </p>
      </div>

      <Button
        variant="checkin"
        size="lg"
        className="mt-6 w-48 h-14 rounded-xl text-lg"
        onClick={onCheckIn}
      >
        Check In
      </Button>

      <p className="text-xs text-muted-foreground mt-2 text-center max-w-xs">
        You must check in within 15 minutes of your reservation start time or your reservation will be cancelled.
      </p>

      <div className="mt-10 w-full max-w-xs text-center">
        <p className="text-sm text-muted-foreground">Issues? ☹️</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={onReportOccupied}
        >
          Room was occupied
        </Button>
      </div>
    </div>
  );
};

export default ReservedScreen;
