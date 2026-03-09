import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/dummyData";
import { Timer } from "lucide-react";
import type { Room, TimeSlot, GroupSize } from "@/lib/dummyData";

interface TimesUpScreenProps {
  room: Room;
  slot: TimeSlot;
  groupSize: GroupSize;
  canExtend: boolean;
  extensionAvailable: boolean;
  onExtend: () => void;
  onSwitchRoom: () => void;
  onSwitchGroupSize: (size: GroupSize) => void;
}

const TimesUpScreen = ({
  room,
  slot,
  groupSize,
  canExtend,
  extensionAvailable,
  onExtend,
  onSwitchRoom,
  onSwitchGroupSize,
}: TimesUpScreenProps) => {
  const duration = groupSize === "solo" ? 30 : 60;
  const extendedEnd = new Date(slot.end.getTime() + duration * 60 * 1000);

  return (
    <div className="flex flex-col items-center px-6 pt-10">
      <Timer size={64} className="text-destructive mb-2" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Time's Up</h2>
      <p className="text-sm italic text-foreground mb-4 text-center max-w-xs">
        Please vacate the room with all of your belongings in consideration for the room's next user ☺
      </p>
      <div className="w-full max-w-xs border-t border-destructive mb-6" />
      <h3 className="text-xl font-bold text-foreground">Need more time?</h3>

      {canExtend && extensionAvailable ? (
        <Button
          variant="brand"
          size="lg"
          className="mt-6 w-64 h-14 rounded-xl text-lg"
          onClick={onExtend}
        >
          Extend to {formatTime(extendedEnd)}
        </Button>
      ) : (
        <Button
          variant="brand"
          size="lg"
          className="mt-6 w-64 h-14 rounded-xl text-lg"
          onClick={onSwitchRoom}
        >
          Switch to different room
        </Button>
      )}

      {groupSize === "solo" && (
        <div className="mt-8 w-full max-w-xs text-center">
          <p className="text-base font-semibold text-foreground mb-3">
            Need a bigger room?
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 rounded-xl"
              onClick={() => onSwitchGroupSize("small-group")}
            >
              Switch to Group: 2-4
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 rounded-xl"
              onClick={() => onSwitchGroupSize("large-group")}
            >
              Switch to Group: 5-8
            </Button>
          </div>
        </div>
      )}

      {groupSize === "small-group" && (
        <div className="mt-8 w-full max-w-xs text-center">
          <p className="text-base font-semibold text-foreground mb-3">
            Need a bigger room?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 rounded-xl"
            onClick={() => onSwitchGroupSize("large-group")}
          >
            Switch to Group: 5-8
          </Button>
        </div>
      )}
    </div>
  );
};

export default TimesUpScreen;
