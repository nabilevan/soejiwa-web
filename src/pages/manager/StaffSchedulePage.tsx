import { useState } from "react"
import { PageHeader } from "../../components/manager/PageHeader"
import { Button, Icon, Note, Person, SHIFT_ICON, ShiftChip, shiftClass, StatusBadge, type IconName } from "../../components/ui"
import { SHIFT_HOURS, SHIFT_TIMES, TODAY_INDEX, WEEK_DAYS, WEEK_LABEL } from "../../data/constants"
import { team, teamSchedule } from "../../data/team"
import type { ScheduleCell, ShiftName } from "../../types"

const LEGEND: ShiftName[] = ["Pagi", "Siang", "Malam", "Libur"]

function cellNote(cell: ScheduleCell, dayIndex: number): { label: string; icon: IconName; className: string } {
  if (cell.note === "pending") return { label: "Izin menunggu", icon: "clock", className: "cell-note--pending" }
  if (cell.note === "approved") return { label: "Izin disetujui", icon: "check", className: "cell-note--approved" }
  if (dayIndex < TODAY_INDEX) return { label: "Sudah berlalu", icon: "history", className: "" }
  if (dayIndex === TODAY_INDEX) return { label: "Hari ini", icon: "calendar", className: "" }
  return { label: "Terjadwal", icon: "calendar", className: "" }
}

export function StaffSchedulePage() {
  const [notice, setNotice] = useState("")
  const totalShifts = Object.values(teamSchedule)
    .flat()
    .filter((c) => c.shift !== "Libur").length

  return (
    <>
      <PageHeader
        title="Jadwal Pegawai"
        description="Atur ritme kerja tim, satu minggu sekaligus."
        actions={
          <>
            <Button
              variant="outline"
              size="lg"
              icon="share"
              onClick={() => setNotice(`Jadwal ${WEEK_LABEL} sudah dibagikan kepada ${team.length} pegawai.`)}
            >
              Bagikan jadwal
            </Button>
            <Button
              size="lg"
              icon="pencil"
              onClick={() => setNotice("Mode ubah jadwal belum terhubung ke backend. Data yang tampil adalah data demo.")}
            >
              Ubah jadwal
            </Button>
          </>
        }
      />

      {notice && (
        <Note tone="green" onClose={() => setNotice("")}>
          {notice}
        </Note>
      )}

      <div className="toolbar">
        <Button variant="outline" icon="chevron-left" onClick={() => setNotice("Data minggu sebelumnya belum tersedia pada prototipe ini.")}>
          Sebelumnya
        </Button>
        <b className="toolbar__label">{WEEK_LABEL}</b>
        <Button variant="outline" icon="chevron-right" onClick={() => setNotice("Data minggu berikutnya belum tersedia pada prototipe ini.")}>
          Berikutnya
        </Button>
        <span className="toolbar__spacer" />
        <StatusBadge status="Sudah dibagikan" />
        <span className="toolbar__meta">
          {team.length} pegawai • {totalShifts} sif
        </span>
      </div>

      <section className="card schedule-board">
        <table>
          <colgroup>
            <col className="schedule-board__person-col" />
            {WEEK_DAYS.map((d) => (
              <col key={d.day} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="schedule-board__corner">Pegawai / Beban kerja</th>
              {WEEK_DAYS.map((d, i) => (
                <th key={d.day} className={i === TODAY_INDEX ? "is-today" : ""}>
                  <span className="schedule-board__day">
                    {d.day}
                    {i === TODAY_INDEX && <span className="dot" aria-label="hari ini" />}
                  </span>
                  <span className="schedule-board__date">{d.date}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.map((member) => {
              const cells = teamSchedule[member.id]
              const workDays = cells.filter((c) => c.shift !== "Libur").length
              return (
                <tr key={member.id}>
                  <th scope="row">
                    <Person initials={member.initials} name={member.name} role={member.role} />
                    <span className="workload">
                      {workDays} sif • {workDays * SHIFT_HOURS} jam
                    </span>
                  </th>
                  {cells.map((cell, i) => {
                    const note = cellNote(cell, i)
                    return (
                      <td key={i} className={i === TODAY_INDEX ? "is-today" : ""}>
                        <div className={`shift-block tone-${shiftClass(cell.shift)}`}>
                          <span className="shift-block__name">
                            <Icon name={SHIFT_ICON[cell.shift]} size={17} />
                            {cell.shift}
                          </span>
                          <span className="shift-block__time">
                            {cell.shift === "Libur" ? "Tidak ada sif" : SHIFT_TIMES[cell.shift]}
                          </span>
                        </div>
                        <span className={`cell-note ${note.className}`}>
                          <Icon name={note.icon} size={14} strokeWidth={2} />
                          {note.label}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <div className="legend-row">
        <div className="legend">
          <b>Keterangan sif</b>
          <div className="legend__items">
            {LEGEND.map((shift) => (
              <span key={shift} className="legend__item">
                <ShiftChip shift={shift} size="lg" />
                {SHIFT_TIMES[shift]}
              </span>
            ))}
          </div>
        </div>
        <div className="legend-aside">
          <b>Izin &amp; perubahan sif</b>
          <span>Izin menunggu belum mengubah jadwal. Sif mendatang bukan catatan kehadiran.</span>
          <small>Terakhir dibagikan 1 Nov 2026, 17:00</small>
        </div>
      </div>
    </>
  )
}
