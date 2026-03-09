import { Button } from "@/components/ui/button";
import { GroupSize, formatTimeRange, formatTime } from "@/lib/dummyData";
import type { Room, TimeSlot } from "@/lib/dummyData";
import { ChevronDown } from "lucide-react";

interface WhoComingProps {
  onSelect: (size: GroupSize) => void;
  onReserve: () => void;
  selectedSize: GroupSize | null;
  selectedRoom: Room | null;
  reservationSlot: TimeSlot | null;
}

const WhoComing = ({ onSelect, onReserve, selectedSize, selectedRoom, reservationSlot }: WhoComingProps) => {
  return (
    <div className="flex flex-col items-center px-6 pt-8">
      <img
        src="/images/beaver-rooms-logo.png"
        alt="Beaver Rooms"
        className="w-48 h-auto object-contain mb-4"
      />
      <h2 className="text-2xl font-bold text-foreground mb-6">Who's coming?</h2>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          variant="brand"
          size="lg"
          className={`w-full h-14 rounded-xl text-lg ${selectedSize === "solo" ? "ring-2 ring-offset-2 ring-primary" : ""}`}
          onClick={() => onSelect("solo")}
        >
          Myself
        </Button>
        <Button
          variant="brand"
          size="lg"
          className={`w-full h-14 rounded-xl text-lg ${selectedSize === "small-group" ? "ring-2 ring-offset-2 ring-primary" : ""}`}
          onClick={() => onSelect("small-group")}
        >
          Group: 2-4
        </Button>
        <Button
          variant="brand"
          size="lg"
          className={`w-full h-14 rounded-xl text-lg ${selectedSize === "large-group" ? "ring-2 ring-offset-2 ring-primary" : ""}`}
          onClick={() => onSelect("large-group")}
        >
          Group: 5-8
        </Button>
      </div>

      {selectedSize && selectedRoom && reservationSlot && (
        <div className="flex flex-col items-center mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <ChevronDown className="h-8 w-8 text-accent-foreground mb-2" />
          <p className="text-xl font-semibold text-foreground">
            {selectedRoom.building}-{selectedRoom.number}{" "}
            <span className="font-normal text-muted-foreground">is open</span>
          </p>
          <p className="text-lg text-muted-foreground mt-1">
            {formatTimeRange(reservationSlot.start, reservationSlot.end)}
          </p>
          <Button
            variant="brand"
            size="lg"
            className="mt-4 w-48 h-14 rounded-xl text-lg"
            onClick={onReserve}
          >
            Reserve
          </Button>
        </div>
      )}
    </div>
  );
};

export default WhoComing;
