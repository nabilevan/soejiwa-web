import { MetricGrid, type Metric } from "../../components/manager/MetricCard"
import { PageHeader } from "../../components/manager/PageHeader"
import { Panel } from "../../components/manager/Panel"
import { Button, Icon, Note, Person, ShiftChip, StatusBadge } from "../../components/ui"
import { APP_NAME, WEEK_LABEL } from "../../data/constants"
import { getMember, manager, team } from "../../data/team"
import type { LeaveRequest, ManagerPage } from "../../types"

type SummaryPageProps = {
  requests: LeaveRequest[]
  onNavigate: (page: ManagerPage) => void
}

export function SummaryPage({ requests, onNavigate }: SummaryPageProps) {
  const pending = requests.filter((r) => r.status === "Menunggu")
  const checkedIn = team.filter((m) => m.checkIn)
  const onTime = team.filter((m) => m.status === "Tepat waktu")
  const late = team.filter((m) => m.status === "Terlambat")

  const metrics: Metric[] = [
    {
      label: "Sudah absen masuk",
      value: `${checkedIn.length} dari ${team.length}`,
      caption: `${team.length - checkedIn.length} pegawai belum mulai sif`,
      icon: "users",
    },
    {
      label: "Tepat waktu",
      value: `${onTime.length} pegawai`,
      caption: onTime.map((m) => m.name).join(" dan "),
      icon: "check-circle",
    },
    {
      label: "Terlambat",
      value: `${late.length} pegawai`,
      caption: late.map((m) => `${m.name} • 4 menit`).join(", "),
      icon: "alarm",
    },
    {
      label: "Izin menunggu",
      value: `${pending.length} pengajuan`,
      caption: `${pending.filter((r) => r.urgent).length} perlu ditinjau segera`,
      icon: "file-clock",
    },
  ]

  return (
    <>
      <PageHeader
        title={`Selamat siang, ${manager.name}.`}
        description={`Ini kabar tim ${APP_NAME} hari ini.`}
        actions={
          <Button variant="outline" size="lg" icon="calendar" onClick={() => onNavigate("staff-schedule")}>
            Lihat jadwal
          </Button>
        }
      />

      <MetricGrid items={metrics} />

      <div className="dashboard-grid">
        <Panel title="Kehadiran hari ini" link={{ label: "Lihat rekap", onClick: () => onNavigate("attendance") }}>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Pegawai</th>
                  <th>Sif</th>
                  <th>Masuk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {team.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <Person initials={m.initials} name={m.name} role={m.role} />
                    </td>
                    <td>
                      <ShiftChip shift={m.todayShift} />
                    </td>
                    <td className="cell-time">{m.checkIn ?? "—"}</td>
                    <td>
                      <StatusBadge status={m.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note className="panel__foot">Sif Zaki dimulai pukul 15:00; belum dihitung tidak hadir.</Note>
        </Panel>

        <Panel title="Perlu ditinjau" link={{ label: "Lihat semua", onClick: () => onNavigate("requests") }}>
          <div className="reviews">
            {pending.length === 0 && <p className="empty">Tidak ada permohonan yang menunggu.</p>}
            {pending.map((r) => {
              const member = getMember(r.memberId)
              return (
                <article key={r.id} className="review">
                  <div className="review__head">
                    <Person initials={member.initials} name={member.name} role={member.role} />
                    <StatusBadge status={r.urgent ? "Urgent" : "Menunggu"} />
                  </div>
                  <b className="review__title">
                    {r.type} • {r.dateLong}
                  </b>
                  <p className="review__text">{r.summary}</p>
                  <div className="review__foot">
                    {r.urgent ? <StatusBadge status="Menunggu" /> : <span />}
                    <span>{r.submittedShort}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </Panel>
      </div>

      <div className="callout">
        <Icon name="calendar-check" size={30} />
        <span className="callout__body">
          <b>Jadwal minggu ini sudah dibagikan</b>
          <span>{WEEK_LABEL} • {team.length} pegawai • Perubahan izin akan diperbarui setelah disetujui.</span>
        </span>
        <Button variant="outline" icon="arrow-right" onClick={() => onNavigate("staff-schedule")}>
          Kelola jadwal
        </Button>
      </div>
    </>
  )
}
