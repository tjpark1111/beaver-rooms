import { Button } from "@/components/ui/button";

interface ReportDoneScreenProps {
  onFindSpace: () => void;
}

const ReportDoneScreen = ({ onFindSpace }: ReportDoneScreenProps) => {
  return (
    <div className="flex flex-col items-center px-6 pt-10">
      <h2 className="text-xl font-bold text-foreground">Thank you for reporting</h2>
      <p className="text-sm italic text-muted-foreground mt-3 text-center max-w-xs">
        Repeated violations of room policies will result in loss of reservation privileges
      </p>

      <div className="mt-6 w-full max-w-xs border-2 border-destructive rounded-xl p-4">
        <p className="font-bold text-foreground">Our Policies:</p>
        <p className="text-sm italic text-foreground mt-3">
          Check-in <span className="underline">upon entry</span> to the room,{" "}
          <span className="underline">within the first 15 minutes</span> of your time slot
          (reservation is cancelled thereafter).
        </p>
        <p className="text-sm italic text-foreground mt-3">
          Promptly vacate the room,{" "}
          <span className="underline">with all of your belongings</span>, at the end of your
          reservation.
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-base font-bold text-foreground mb-3">Need another room?</p>
        <Button
          variant="brand"
          size="lg"
          className="w-48 h-14 rounded-xl text-lg"
          onClick={onFindSpace}
        >
          Find Space
        </Button>
      </div>
    </div>
  );
};

export default ReportDoneScreen;
