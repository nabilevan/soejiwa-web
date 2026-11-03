const DAY_HEADERS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

type MonthCalendarProps = {
  year: number
  /** 0 = Januari */
  month: number
  markedDays: number[]
  today?: number
}

/** Kalender bulanan kecil dengan penanda hari bersif. */
export function MonthCalendar({ year, month, markedDays, today }: MonthCalendarProps) {
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <section className="card month-cal">
      <div className="month-cal__head">
        <b>
          {MONTH_NAMES[month]} {year}
        </b>
        <span>Tanda: sif terjadwal</span>
      </div>
      <div className="month-cal__grid">
        {DAY_HEADERS.map((d) => (
          <span key={d} className="month-cal__dow">
            {d}
          </span>
        ))}
        {Array.from({ length: firstWeekday }, (_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const classes = [
            "month-cal__day",
            markedDays.includes(day) && "is-marked",
            day === today && "is-today",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <span key={day} className={classes} aria-current={day === today ? "date" : undefined}>
              {day}
            </span>
          )
        })}
      </div>
    </section>
  )
}
