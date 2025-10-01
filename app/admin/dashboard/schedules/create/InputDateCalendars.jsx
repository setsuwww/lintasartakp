"use client"

import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/Select"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

import { shiftStyles } from "@/constants/shiftConstants"
import { capitalize } from "@/function/globalFunction"

export default function ScheduleInputDateCalendars({
  events, shifts,
  activeDate, setActiveDate,
  handleDateSelect,
  updateShift, setAllShift, getAvailableSecondShifts,
  clearEvents,
}) {
  return (
    <div className="space-y-4">
      <Label className="text-zinc-700">Pick Dates & Assign Shifts</Label>

      <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm">
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={handleDateSelect}
          height="auto"
          headerToolbar={{
            left: "prev next today",
            center: "title",
            right: "",
          }}
          events={events.map((e) => ({
            id: e.date,
            start: e.date,
            title: [
              shifts.find((s) => s.id.toString() === e.shiftId)?.type,
              shifts.find((s) => s.id.toString() === e.secondShiftId)?.type,
            ].filter(Boolean).join(" & "),
            allDay: true,
          }))}
          dayCellContent={(args) => {
            const date = args.date.toISOString().split("T")[0]
            const event = events.find((e) => e.date === date)
            const isActive = activeDate === date
            const dayName = args.date.toLocaleDateString("en-US", { weekday: "short" })

            const renderShifts = () => (
              <div className="flex flex-col space-y-1 w-full">
                {event?.shiftId && (
                  <Badge className={`w-full flex items-center justify-center ${shiftStyles[shifts.find((s) => s.id.toString() === event.shiftId)?.type]
                    }`}
                  >
                    {capitalize(shifts.find((s) => s.id.toString() === event.shiftId)?.type || "")}
                  </Badge>
                )}
                {event?.secondShiftId && (
                  <Badge className={`w-full flex items-center justify-center ${shiftStyles[shifts.find((s) => s.id.toString() === event.secondShiftId)?.type]
                    }`}
                  >
                    {capitalize(shifts.find((s) => s.id.toString() === event.secondShiftId)?.type || "")}
                  </Badge>
                )}
                {!event?.shiftId && !event?.secondShiftId && (
                  <span className="text-xs text-zinc-400 font-medium">Click to add</span>
                )}
              </div>
            )

            return (
              <div className={`flex flex-col items-center justify-start cursor-pointer p-3 rounded-lg transition-all transform
                  ${isActive
                  ? "bg-white border-2 border-zinc-200 shadow-md scale-[1.02]"
                  : "hover:scale-[0.98] hover:bg-white/50 backdrop-blur-md border border-transparent hover:border-zinc-300"
                }`}
                onClick={() => setActiveDate(isActive ? null : date)}
              >
                <div className="text-center mb-2">
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{dayName}</div>
                  <div className="text-lg font-semibold text-zinc-700">{args.dayNumberText}</div>
                </div>

                {isActive ? (
                  <div className="space-y-2 w-full">
                    <Select value={event?.shiftId || "default"} onValueChange={(val) => updateShift(date, val, false)}>
                      <SelectTrigger className="w-full h-8 text-xs border-zinc-200 bg-white">
                        <SelectValue placeholder="Shift 1" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-zinc-200">
                        <SelectItem value="default">No shift</SelectItem>
                        {shifts.map((s) => (
                          <SelectItem key={s.id} value={s.id.toString()}>
                            {capitalize(s.type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {event?.shiftId && (
                      <Select value={event?.secondShiftId || "default"} onValueChange={(val) => updateShift(date, val, true)}>
                        <SelectTrigger className="w-full h-8 text-xs border-zinc-200 bg-white">
                          <SelectValue placeholder="Shift 2" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-zinc-200">
                          <SelectItem value="default">No second shift</SelectItem>
                          {getAvailableSecondShifts(event.shiftId).map((s) => (
                            <SelectItem key={s.id} value={s.id.toString()}>
                              {capitalize(s.type)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ) : (
                  renderShifts()
                )}
              </div>
            )
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {shifts.map((s) => (
          <Button key={s.id} type="button" variant="outline" size="sm" onClick={() => setAllShift(s.id)}
            className="capitalize border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
          >
            Set all {capitalize(s.type)}
          </Button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" onClick={clearEvents} disabled={events.length === 0}
          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          Clear all dates
        </Button>
      </div>
    </div>
  )
}
