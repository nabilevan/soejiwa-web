import { useMemo, useState } from "react"
import { MetricGrid, type Metric } from "../../components/manager/MetricCard"
import { PageHeader } from "../../components/manager/PageHeader"
import { Button, Icon, Note, Person, StatusBadge } from "../../components/ui"
import { NOW_LABEL, SHIFT_TIMES, TODAY_LABEL } from "../../data/constants"
import { team } from "../../data/team"
import type { TeamMember } from "../../types"

const ALL_EMPLOYEES = "Semua pegawai"
const ALL_STATUS = "Semua status"

function downloadCsv(rows: TeamMember[]) {
  const header = ["Pegawai", "Jabatan", "Sif", "Jam sif", "Masuk", "Pulang", "Durasi", "Status", "Keterangan"]
  const body = rows.map((m) => [
    m.name,
    m.role,
    m.todayShift,
    SHIFT_TIMES[m.todayShift],
    m.checkIn ?? "-",
    m.checkOut ?? "-",
    m.duration ?? "-",
    m.status,
    m.remark,
  ])
  const csv = [header, ...body]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n")
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
  const link = document.createElement("a")
  link.href = url
  link.download = "rekap-absensi-kedai-soejiwa.csv"
  link.click()
  URL.revokeObjectURL(url)
}

/** Dropdown bergaya tombol, sesuai desain filter "Semua pegawai" / "Semua status". */
function FilterSelect({ value, options, onChange, label }: { value: string; options: string[]; onChange: (v: string) => void; label: string }) {
  return (
    <label className="filter-select">
      <Icon name="chevron-down" size={18} />
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}

export function AttendancePage() {
  const [employee, setEmployee] = useState(ALL_EMPLOYEES)
  const [status, setStatus] = useState(ALL_STATUS)
  const [search, setSearch] = useState("")

  const statuses = [ALL_STATUS, ...new Set(team.map((m) => m.status))]
  const rows = useMemo(
    () =>
      team.filter(
        (m) =>
          (employee === ALL_EMPLOYEES || m.name === employee) &&
          (status === ALL_STATUS || m.status === status) &&
          m.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [employee, status, search],
  )

  const checkedIn = team.filter((m) => m.checkIn)
  const metrics: Metric[] = [
    { label: "Pegawai terjadwal", value: `${team.length} orang`, caption: TODAY_LABEL, icon: "calendar" },
    { label: "Sudah masuk", value: `${checkedIn.length} orang`, caption: "Masih dalam sif berjalan", icon: "login" },
    {
      label: "Tepat waktu",
      value: `${team.filter((m) => m.status === "Tepat waktu").length} orang`,
      caption: `Dari ${checkedIn.length} absensi masuk`,
      icon: "check-circle",
    },
    {
      label: "Terlambat",
      value: `${team.filter((m) => m.status === "Terlambat").length} orang`,
      caption: "Keterlambatan total 4 menit",
      icon: "alarm",
    },
  ]

  return (
    <>
      <PageHeader
        title="Rekap Absensi"
        description="Pantau catatan masuk dan pulang tim dengan jelas."
        actions={
          <Button size="lg" icon="download" onClick={() => downloadCsv(rows)}>
            Unduh rekap
          </Button>
        }
      />

      <MetricGrid items={metrics} />

      <div className="filters">
        <Button variant="outline" size="lg" icon="calendar">
          3 November 2026
        </Button>
        <FilterSelect label="Filter pegawai" value={employee} onChange={setEmployee} options={[ALL_EMPLOYEES, ...team.map((m) => m.name)]} />
        <FilterSelect label="Filter status" value={status} onChange={setStatus} options={statuses} />
        <label className="search-box">
          <Icon name="search" size={20} />
          <input placeholder="Cari nama pegawai..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      <section className="card panel">
        <div className="table-wrap">
          <table className="table table--wide">
            <thead>
              <tr>
                <th>Pegawai</th>
                <th>Sif</th>
                <th>Masuk</th>
                <th>Pulang</th>
                <th>Durasi</th>
                <th>Status</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className={m.checkIn ? "" : "is-muted"}>
                  <td>
                    <Person initials={m.initials} name={m.name} role={m.role} />
                  </td>
                  <td>
                    <span className="cell-stack">
                      <b>{m.todayShift}</b>
                      <small>{SHIFT_TIMES[m.todayShift]}</small>
                    </span>
                  </td>
                  <td className="cell-time">{m.checkIn ?? "—"}</td>
                  <td>{m.checkOut ?? "—"}</td>
                  <td>{m.duration ?? "—"}</td>
                  <td>
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="text-muted">{m.remark}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty">
                    Tidak ada pegawai yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>
            Menampilkan {rows.length} dari {team.length} pegawai • {checkedIn.length} absensi tercatat
          </span>
          <span className="pagination">
            <button type="button" className="icon-btn" aria-label="Halaman sebelumnya" disabled>
              <Icon name="chevron-left" size={18} />
            </button>
            <b>1</b>
            <button type="button" className="icon-btn" aria-label="Halaman berikutnya" disabled>
              <Icon name="chevron-right" size={18} />
            </button>
          </span>
        </div>
      </section>

      <div className="foot-note">
        <Note>Durasi berjalan dihitung hingga {NOW_LABEL}. Terjadwal tidak berarti tidak hadir.</Note>
        <span>Pembaruan terakhir {NOW_LABEL}</span>
      </div>
    </>
  )
}
