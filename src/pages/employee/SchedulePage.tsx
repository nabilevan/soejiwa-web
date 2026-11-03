import { useState } from "react"
import { MonthCalendar } from "../../components/schedule/MonthCalendar"
import { Button, Icon, Note, ShiftChip, type IconName } from "../../components/ui"
import { SHIFT_HOURS, SHIFT_TIMES, WEEK_DAYS, WEEK_LABEL_SHORT } from "../../data/constants"
import { currentEmployee, myWeek, scheduledDates, todayDate } from "../../data/employee"
import type { DayState, EmployeePage } from "../../types"

const DAY_STATE: Record<DayState, { label: string; icon: IconName; className: string }> = {
  done: { label: "Selesai", icon: "check", className: "day-status--done" },
  today: { label: "Hari ini", icon: "calendar", className: "day-status--today" },
  scheduled: { label: "Terjadwal", icon: "calendar", className: "" },
  pending: { label: "Izin menunggu", icon: "clock", className: "day-status--pending" },
  approved: { label: "Izin disetujui", icon: "check", className: "day-status--approved" },
}

export function SchedulePage({ onNavigate }: { onNavigate: (page: EmployeePage) => void }) {
  const [notice, setNotice] = useState("")
  const workDays = myWeek.filter((d) => d.shift !== "Libur").length

  return (
    <div className="stack">
      <div className="week-switch">
        <button type="button" className="icon-btn" aria-label="Minggu sebelumnya" onClick={() => setNotice("Data minggu sebelumnya belum tersedia.")}>
          <Icon name="chevron-left" size={24} />
        </button>
        <b className="week-switch__label">{WEEK_LABEL_SHORT}</b>
        <button type="button" className="icon-btn" aria-label="Minggu berikutnya" onClick={() => setNotice("Data minggu berikutnya belum tersedia.")}>
          <Icon name="chevron-right" size={24} />
        </button>
      </div>

      <p className="week-summary">
        {currentEmployee.name} • {workDays} shift / {workDays * SHIFT_HOURS} jam minggu ini
      </p>

      {notice && (
        <Note tone="soft" onClose={() => setNotice("")}>
          {notice}
        </Note>
      )}

      <section className="week-list" aria-label="Jadwal minggu ini">
        {WEEK_DAYS.map((day, i) => {
          const { shift, state } = myWeek[i]
          const status = DAY_STATE[state]
          return (
            <div key={day.day} className={`week-row ${state === "today" ? "is-today" : ""}`}>
              <span className="week-row__day">
                <b>
                  {day.day}
                  {state === "today" && <span className="dot" aria-hidden="true" />}
                </b>
                <small>{day.date}</small>
              </span>
              <span className="week-row__shift">
                <ShiftChip shift={shift} size="lg" />
                {shift === "Libur" ? "Istirahat" : SHIFT_TIMES[shift]}
              </span>
              <span className={`day-status ${status.className}`}>
                <Icon name={status.icon} size={14} strokeWidth={2} />
                {status.label}
              </span>
            </div>
          )
        })}
      </section>

      <Note>Izin 6 November masih menunggu. Sif tetap berlaku hingga permohonan disetujui.</Note>

      <MonthCalendar year={2026} month={10} markedDays={scheduledDates} today={todayDate} />

      <div className="btn-pair">
        <Button size="lg" block onClick={() => onNavigate("swap")}>
          Ajukan Tukar Shift
        </Button>
        <Button variant="outline-green" size="lg" block onClick={() => onNavigate("leave")}>
          Ajukan Izin
        </Button>
      </div>
    </div>
  )
}
