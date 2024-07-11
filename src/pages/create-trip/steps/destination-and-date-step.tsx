import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean;
    closeGuestsInput: () => void;
    openGuestsInput: () => void;
    setDestination: (destination: string) => void;
    setEventRangeDates: (dates: DateRange | undefined) => void;
    eventRangeDates: DateRange | undefined;
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventRangeDates,
    eventRangeDates
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    function openDatePicker() {
        setIsDatePickerOpen(true)
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false)
    }

    const displayDate = eventRangeDates && eventRangeDates.from && eventRangeDates.to ?
        format(eventRangeDates.from, "dd' de 'LLL").concat(' até ').concat(format(eventRangeDates.to, "dd' de 'LLL")) : null

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc 400" />
                <input disabled={isGuestsInputOpen} onChange={(event) => setDestination(event.target.value)} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
            </div>

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc 400" />
                <span className="text-lg text-zinc-400 w-40 flex-1">{displayDate || 'Quando?'}</span>
            </button>

            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-[400px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data</h2>
                                <button type="button" onClick={closeDatePicker}>
                                    <ArrowRight className="size-5 text-zinc-400" />
                                </button>
                            </div>
                            <DayPicker mode="range" selected={eventRangeDates} onSelect={setEventRangeDates} />
                        </div>
                    </div>
                </div>
            )}

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={openGuestsInput}>
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )}
        </div>
    );
}
