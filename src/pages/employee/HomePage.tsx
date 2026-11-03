import { useState } from "react"
import { Button, Icon, Note, SHIFT_ICON, StatusBadge } from "../../components/ui"
import { TODAY_LABEL } from "../../data/constants"
import { currentEmployee, monthStats, myRequests, todayShift } from "../../data/employee"
import type { EmployeePage } from "../../types"

function currentTime() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).replace(".", ":")
}

export function HomePage({ onNavigate }: { onNavigate: (page: EmployeePage) => void }) {
  const [checkOut, setCheckOut] = useState<string | null>(null)

  return (
    <div className="stack">
      <section className="greeting">
        <h1>Halo, {currentEmployee.name}</h1>
        <p>
          {TODAY_LABEL} • {currentEmployee.role}
        </p>
      </section>

      {/* Kartu sif hari ini */}
      <section className="card today-card">
        <div className="today-card__top">
          <span>Shift hari ini</span>
          <StatusBadge status={checkOut ? "Selesai" : "Sedang bekerja"} />
        </div>

        <div className="today-card__shift">
          <span className="icon-tile">
            <Icon name={SHIFT_ICON[todayShift.shift]} size={26} />
          </span>
          <span>
            <span className="today-card__time">{todayShift.time}</span>
            <span className="today-card__place">
              Shift {todayShift.shift} • {todayShift.place}
            </span>
          </span>
        </div>

        <div className="punch-grid">
          <div className="punch">
            <span className="punch__label">Absen masuk</span>
            <span className="punch__value">{todayShift.checkIn} WIB</span>
            <span className="punch__hint is-good">
              <Icon name="check" size={13} strokeWidth={2.2} /> {todayShift.checkInStatus}
            </span>
          </div>
          <div className="punch">
            <span className="punch__label">Absen pulang</span>
            <span className="punch__value">{checkOut ? `${checkOut} WIB` : "—"}</span>
            <span className={`punch__hint ${checkOut ? "is-good" : ""}`}>{checkOut ? "Tercatat" : "Belum tercatat"}</span>
          </div>
        </div>

        <div className="btn-pair">
          <Button variant="muted" icon="check" disabled block>
            Sudah masuk
          </Button>
          {checkOut ? (
            <Button variant="muted" icon="check" disabled block>
              Sudah pulang
            </Button>
          ) : (
            <Button icon="logout" block onClick={() => setCheckOut(currentTime())}>
              Absen pulang
            </Button>
          )}
        </div>
      </section>

      <div className="stat-tiles">
        <div className="stat-tile stat-tile--green">
          <span className="stat-tile__label">Hadir bulan ini</span>
          <b className="stat-tile__value">{monthStats.present} hari</b>
        </div>
        <div className="stat-tile stat-tile--plain">
          <span className="stat-tile__label">Terlambat</span>
          <b className="stat-tile__value">{monthStats.late} kali</b>
        </div>
      </div>

      <section>
        <div className="section-head">
          <h2>Permohonan saya</h2>
          <button type="button" className="link" onClick={() => onNavigate("leave")}>
            Ajukan izin <Icon name="plus" size={16} strokeWidth={2.2} />
          </button>
        </div>
        <div className="stack stack--sm">
          {myRequests.map((request) => (
            <button key={request.title} type="button" className="card request-card" onClick={() => onNavigate("leave")}>
              <Icon name="file" size={24} />
              <span className="request-card__body">
                <b>{request.title}</b>
                <small>{request.date}</small>
              </span>
              <StatusBadge status={request.status} />
            </button>
          ))}
        </div>
      </section>

      <Note icon="map-pin">Pastikan kamu berada di kedai saat absen.</Note>
    </div>
  )
}
