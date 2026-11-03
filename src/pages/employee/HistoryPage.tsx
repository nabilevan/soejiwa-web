import { useState } from "react"
import { Icon, Note, StatusBadge } from "../../components/ui"
import { NOW_LABEL, SHIFT_TIMES } from "../../data/constants"
import { attendanceHistory, monthStats } from "../../data/employee"

export function HistoryPage() {
  const [notice, setNotice] = useState("")

  return (
    <div className="stack">
      <div className="card month-switch">
        <button type="button" className="icon-btn" aria-label="Bulan sebelumnya" onClick={() => setNotice("Riwayat Oktober 2026 belum tersedia.")}>
          <Icon name="chevron-left" size={22} />
        </button>
        <b>November 2026</b>
        <button type="button" className="icon-btn" aria-label="Bulan berikutnya" onClick={() => setNotice("Belum ada riwayat untuk bulan berikutnya.")}>
          <Icon name="chevron-right" size={22} />
        </button>
      </div>

      {notice && (
        <Note tone="soft" onClose={() => setNotice("")}>
          {notice}
        </Note>
      )}

      <div className="summary-strip">
        <div>
          <b>{monthStats.present}</b>
          <span>Hadir</span>
        </div>
        <div>
          <b>{monthStats.late}</b>
          <span>Terlambat</span>
        </div>
        <div>
          <b>{monthStats.approvedLeave}</b>
          <span>Izin disetujui</span>
        </div>
      </div>

      <section>
        <div className="section-head">
          <h2>Catatan kehadiran</h2>
          <span className="section-head__meta">{attendanceHistory.length} catatan</span>
        </div>

        <div className="stack">
          {attendanceHistory.map((record) => (
            <article key={record.date} className="card record">
              <div className="record__head">
                <b>{record.date}</b>
                <StatusBadge status={record.status} />
              </div>
              <p className="record__shift">
                Sif {record.shift} • {SHIFT_TIMES[record.shift]}
              </p>
              <div className="record__times">
                <div className="record__time">
                  <Icon name="login" size={22} className="is-in" />
                  <span>
                    <small>Masuk</small>
                    <b>{record.checkIn}</b>
                  </span>
                </div>
                <div className="record__time">
                  <Icon name="logout" size={22} />
                  <span>
                    <small>Pulang</small>
                    <b>{record.checkOut ?? "—"}</b>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Note tone="soft">Hanya absensi tercatat yang tampil di sini. Sif mendatang ada di Jadwal Saya.</Note>
      <p className="form-foot">Diperbarui hari ini, {NOW_LABEL}</p>
    </div>
  )
}
