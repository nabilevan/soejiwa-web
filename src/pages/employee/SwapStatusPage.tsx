import { FileCard, Icon, Note, SHIFT_ICON } from "../../components/ui"
import { SHIFT_TIMES } from "../../data/constants"
import { currentEmployee } from "../../data/employee"
import { team } from "../../data/team"
import { formatLongDate } from "../../lib/date"
import type { ShiftName, SwapRequest } from "../../types"

type Step = { title: string; detail: string; state: "done" | "current" | "upcoming" }

function SwapSide({ label, person, role, shift }: { label: string; person: string; role: string; shift: ShiftName }) {
  return (
    <div className="swap-side">
      <small>{label}</small>
      <b>
        {person} • {role}
      </b>
      <span className="swap-side__shift">
        <Icon name={SHIFT_ICON[shift]} size={18} />
        {shift}
      </span>
      <small>{SHIFT_TIMES[shift]}</small>
    </div>
  )
}

export function SwapStatusPage({ request }: { request: SwapRequest }) {
  const partnerRole = team.find((m) => m.name === request.partner)?.role ?? "Pegawai"
  const steps: Step[] = [
    { title: "Diajukan", detail: `${request.submittedAt} • ${currentEmployee.name}`, state: "done" },
    { title: "Rekan setuju", detail: `Menunggu persetujuan ${request.partner}`, state: "current" },
    { title: "Disetujui manajer", detail: "Menunggu setelah rekan setuju", state: "upcoming" },
  ]

  return (
    <div className="stack">
      <div className="status-banner">
        <Icon name="clock" size={26} />
        <span>
          <b>Menunggu</b>
          <span>Menunggu persetujuan {request.partner}</span>
        </span>
      </div>

      <section className="card swap-card">
        <p className="swap-card__date">
          <Icon name="calendar" size={20} />
          {formatLongDate(request.fromDate)}
        </p>

        <div className="swap-compare">
          <SwapSide label="Shift asal" person={currentEmployee.name} role={currentEmployee.role} shift={request.fromShift} />
          <Icon name="swap" size={24} />
          <SwapSide label="Ditukar ke" person={request.partner} role={partnerRole} shift={request.toShift} />
        </div>

        <div className="detail-block">
          <b className="detail-label">Alasan</b>
          <p>{request.reason}</p>
        </div>

        {request.file && (
          <div className="detail-block">
            <b className="detail-label">Bukti pendukung</b>
            <FileCard file={request.file} />
          </div>
        )}
      </section>

      <section>
        <h2 className="section-title">Proses persetujuan</h2>
        <ol className="timeline">
          {steps.map((step) => (
            <li key={step.title} className={`timeline__item is-${step.state}`}>
              <span className="timeline__dot">
                {step.state === "done" && <Icon name="check" size={18} strokeWidth={2.4} />}
                {step.state === "current" && <Icon name="clock" size={18} strokeWidth={2} />}
                {step.state === "upcoming" && <span className="timeline__ring" />}
              </span>
              <span className="timeline__body">
                <b>{step.title}</b>
                <small>{step.detail}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Note tone="green">Jadwal tetap tidak berubah sampai pengajuan disetujui manajer.</Note>
    </div>
  )
}
