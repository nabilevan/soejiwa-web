import { useMemo, useState } from "react"
import { PageHeader } from "../../components/manager/PageHeader"
import { Button, FileCard, Icon, Modal, Note, Person, StatusBadge } from "../../components/ui"
import { getMember } from "../../data/team"
import type { LeaveRequest, RequestStatus } from "../../types"

type Filter = "Semua" | RequestStatus
const FILTERS: Filter[] = ["Semua", "Menunggu", "Disetujui", "Ditolak"]

type RequestsPageProps = {
  requests: LeaveRequest[]
  onDecide: (id: string, status: RequestStatus) => void
}

export function RequestsPage({ requests, onDecide }: RequestsPageProps) {
  const [filter, setFilter] = useState<Filter>("Semua")
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>("req-2")
  const [confirm, setConfirm] = useState<"approve" | "reject" | null>(null)

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { Semua: requests.length, Menunggu: 0, Disetujui: 0, Ditolak: 0 }
    requests.forEach((r) => (result[r.status] += 1))
    return result
  }, [requests])

  const visible = requests.filter((r) => {
    const member = getMember(r.memberId)
    const text = `${member.name} ${member.role} ${r.type}`.toLowerCase()
    return (filter === "Semua" || r.status === filter) && text.includes(search.trim().toLowerCase())
  })

  const selected = requests.find((r) => r.id === selectedId) ?? null
  const selectedMember = selected ? getMember(selected.memberId) : null
  const urgentRequest = requests.find((r) => r.urgent && r.status === "Menunggu")

  function decide() {
    if (!selected || !confirm) return
    onDecide(selected.id, confirm === "approve" ? "Disetujui" : "Ditolak")
    setConfirm(null)
  }

  return (
    <>
      <PageHeader
        title="Permohonan Izin"
        description="Tinjau kebutuhan tim dan pastikan setiap sif tetap terjaga."
        actions={
          urgentRequest && (
            <span className="urgent-summary">
              <StatusBadge status="Urgent" /> 1 pengajuan untuk besok
            </span>
          )
        }
      />

      <div className="tabs-row">
        <div className="tabs" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`tab ${filter === f ? "is-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f} <span>{counts[f]}</span>
            </button>
          ))}
        </div>
        <Button variant="outline" size="lg" icon="calendar">
          Oktober–November 2026
        </Button>
      </div>

      <div className="requests-layout">
        <div className="stack">
          <section className="card panel">
            <label className="table-search">
              <Icon name="search" size={20} />
              <input placeholder="Cari nama atau jenis izin..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </label>
            <div className="table-wrap">
              <table className="table table--clickable">
                <thead>
                  <tr>
                    <th>Pegawai</th>
                    <th>Jenis izin</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th aria-label="Buka" />
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => {
                    const member = getMember(r.memberId)
                    return (
                      <tr key={r.id} className={r.id === selectedId ? "is-selected" : ""} onClick={() => setSelectedId(r.id)}>
                        <td>
                          <Person initials={member.initials} name={member.name} role={member.role} size="sm" />
                        </td>
                        <td>
                          <span className="cell-stack">
                            <b>{r.type}</b>
                            {r.urgent ? <StatusBadge status="Urgent" /> : <small>{r.duration}</small>}
                          </span>
                        </td>
                        <td>{r.date}</td>
                        <td>
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="cell-action">
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label={`Lihat permohonan ${member.name}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedId(r.id)
                            }}
                          >
                            <Icon name="chevron-right" size={18} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={5} className="empty">
                        Tidak ada permohonan yang cocok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>{visible.length} permohonan • Urutkan: perlu ditinjau</span>
              <b className="text-green">Halaman 1</b>
            </div>
          </section>

          {urgentRequest && (
            <Note tone="amber">
              {getMember(urgentRequest.memberId).name} mengajukan izin untuk besok. Tinjau lebih dulu agar pengganti sif dapat
              disiapkan.
            </Note>
          )}
        </div>

        {selected && selectedMember ? (
          <aside className="card detail">
            <div className="detail__head">
              <h2>Detail permohonan</h2>
              <button type="button" className="icon-btn" onClick={() => setSelectedId(null)} aria-label="Tutup detail">
                <Icon name="close" size={22} />
              </button>
            </div>

            <div className="detail__person">
              <Person initials={selectedMember.initials} name={selectedMember.name} role={selectedMember.role} size="lg" />
              <StatusBadge status={selected.status} />
            </div>

            <dl className="detail__meta">
              <div>
                <dt>Jenis izin</dt>
                <dd>{selected.type}</dd>
              </div>
              <div>
                <dt>Tanggal / durasi</dt>
                <dd>
                  {selected.date} • {selected.duration}
                </dd>
              </div>
            </dl>

            <div className="detail-block">
              <b className="detail-label">Alasan izin</b>
              <p className="reason-box">{selected.reason}</p>
            </div>

            <FileCard file={selected.file} action="download" meta={`${selected.file.name.split(".").pop()?.toUpperCase()} • ${selected.file.size}`} />

            {selected.impact && (
              <div className="impact">
                <b>{selected.impact.title}</b>
                <span>{selected.impact.text}</span>
              </div>
            )}

            <p className="detail__time">
              <Icon name="clock" size={18} />
              Diajukan {selected.submittedAt}
            </p>

            <div className="detail__footer">
              {selected.status === "Menunggu" ? (
                <div className="detail__actions">
                  <Button variant="danger" size="lg" icon="close" onClick={() => setConfirm("reject")}>
                    Tolak izin
                  </Button>
                  <Button size="lg" icon="check" onClick={() => setConfirm("approve")}>
                    Setujui izin
                  </Button>
                </div>
              ) : (
                <Note tone={selected.status === "Disetujui" ? "green" : "danger"} icon={selected.status === "Disetujui" ? "check-circle" : "alert-circle"}>
                  Permohonan ini sudah {selected.status.toLowerCase()}.
                </Note>
              )}
              <p className="detail__note">Keputusan akan ditampilkan kepada pegawai.</p>
            </div>
          </aside>
        ) : (
          <aside className="card detail detail--empty">
            <Icon name="file" size={32} />
            <p>Pilih permohonan untuk melihat detailnya.</p>
          </aside>
        )}
      </div>

      {confirm && selected && selectedMember && (
        <Modal
          title={confirm === "approve" ? "Setujui permohonan?" : "Tolak permohonan?"}
          onClose={() => setConfirm(null)}
          actions={
            <>
              <Button variant="outline" size="lg" onClick={() => setConfirm(null)}>
                Kembali
              </Button>
              <Button variant={confirm === "approve" ? "primary" : "danger"} size="lg" onClick={decide}>
                {confirm === "approve" ? "Ya, setujui" : "Ya, tolak"}
              </Button>
            </>
          }
        >
          Izin {selectedMember.name} pada {selected.date} akan {confirm === "approve" ? "disetujui" : "ditolak"}.
          {confirm === "approve" && selected.impact ? " Pastikan sif yang terdampak tetap terisi." : " Pastikan keputusan sudah tepat."}
        </Modal>
      )}
    </>
  )
}
