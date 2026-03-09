import Header from "@/components/Header";
import WhoComing from "@/components/WhoComing";
import ReservedScreen from "@/components/ReservedScreen";
import CheckedInScreen from "@/components/CheckedInScreen";
import TimesUpScreen from "@/components/TimesUpScreen";
import ReportDoneScreen from "@/components/ReportDoneScreen";
import { useBookingState } from "@/hooks/useBookingState";

const Index = () => {
  const {
    state,
    selectGroupSize,
    selectWhen,
    selectLaterSlot,
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
    goBack,
  } = useBookingState();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <Header onBack={state.screen !== "who-coming" ? goBack : undefined} />

      <main className="flex-1 pb-10">
        {state.screen === "who-coming" && (
          <WhoComing
            onSelect={selectGroupSize}
            onReserve={reserve}
            selectedSize={state.groupSize}
            selectedRoom={state.selectedRoom}
            reservationSlot={state.reservationSlot}
          />
        )}

        {state.screen === "reserved" && state.selectedRoom && state.reservationSlot && (
          <ReservedScreen
            room={state.selectedRoom}
            slot={state.reservationSlot}
            onCheckIn={checkIn}
            onReportOccupied={reportOccupied}
          />
        )}

        {state.screen === "checked-in" && state.selectedRoom && state.reservationSlot && (
          <CheckedInScreen
            room={state.selectedRoom}
            slot={state.reservationSlot}
            onSimulateTimesUp={timesUp}
            onReportOccupied={reportOccupied}
          />
        )}

        {state.screen === "times-up" && state.selectedRoom && state.reservationSlot && state.groupSize && (
          <TimesUpScreen
            room={state.selectedRoom}
            slot={state.reservationSlot}
            groupSize={state.groupSize}
            canExtend={canExtend}
            extensionAvailable={extensionAvailable}
            onExtend={extend}
            onSwitchRoom={switchRoom}
            onSwitchGroupSize={switchGroupSize}
          />
        )}

        {state.screen === "report-done" && (
          <ReportDoneScreen onFindSpace={findSpace} />
        )}
      </main>
    </div>
  );
};

export default Index;
