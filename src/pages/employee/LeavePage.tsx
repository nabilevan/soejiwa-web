import { useState, type FormEvent } from "react"
import {
  Button,
  DateField,
  FileUpload,
  Icon,
  Note,
  SegmentedControl,
  Switch,
  TextareaField,
} from "../../components/ui"
import type { AttachedFile } from "../../types"

const LEAVE_TYPES = ["Sakit", "Urgent/Darurat", "Keperluan lain"] as const
type LeaveType = (typeof LEAVE_TYPES)[number]

function countDays(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime()
  return Math.floor(ms / 86_400_000) + 1
}

export function LeavePage() {
  const [type, setType] = useState<LeaveType>("Keperluan lain")
  const [startDate, setStartDate] = useState("2026-11-06")
  const [endDate, setEndDate] = useState("2026-11-06")
  const [urgent, setUrgent] = useState(false)
  const [reason, setReason] = useState("Mengantar ibu kontrol ke rumah sakit.")
  const [file, setFile] = useState<AttachedFile | null>({ name: "surat-kontrol.pdf", size: "248 KB" })
  const [submitted, setSubmitted] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const days = countDays(startDate, endDate)
  const dateError = days < 1
  const reasonError = reason.trim() === ""
  const fileError = file === null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (dateError || reasonError || fileError) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setSubmitted(true)
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      {submitted ? (
        <Note tone="green" icon="check-circle" onClose={() => setSubmitted(false)}>
          Pengajuan izin berhasil dikirim dan menunggu persetujuan HRD.
        </Note>
      ) : (
        <Note tone="green" icon={null} className="note--strong">
          Pengajuan maksimal 7 hari sebelum hari H. Kasus urgent dapat diajukan kapan saja.
        </Note>
      )}

      <fieldset className="fieldset">
        <legend className="field__label">Jenis izin *</legend>
        <SegmentedControl name="leave-type" options={[...LEAVE_TYPES]} value={type} onChange={setType} />
      </fieldset>

      <div className="field-pair">
        <DateField label="Tanggal mulai *" value={startDate} onChange={setStartDate} />
        <DateField
          label="Tanggal selesai *"
          value={endDate}
          min={startDate}
          onChange={setEndDate}
          error={showErrors && dateError}
        />
      </div>

      {dateError ? (
        <Note tone="danger" icon="alert-circle">
          Tanggal selesai tidak boleh sebelum tanggal mulai.
        </Note>
      ) : (
        <div className="summary-chip">
          <Icon name="calendar-clock" size={20} />
          {days} hari • Sif Pagi, 07:00–15:00
        </div>
      )}

      <div className="toggle-card">
        <span>
          <b>Kasus urgent</b>
          <small>[Prosedur resmi menyusul dari mitra]</small>
        </span>
        <Switch label="Kasus urgent" checked={urgent} onChange={setUrgent} />
      </div>

      <TextareaField
        label="Alasan izin *"
        rows={2}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        error={showErrors && reasonError}
        hint={showErrors && reasonError ? "Alasan izin wajib diisi." : undefined}
      />

      <div>
        <div className="label-row">
          <b>Bukti pendukung</b>
          <span>Wajib</span>
        </div>
        <FileUpload value={file} onChange={setFile} error={showErrors && fileError ? "Bukti pendukung wajib diunggah." : undefined} />
      </div>

      <Button type="submit" size="lg" block icon="send">
        Kirim Pengajuan
      </Button>
      <p className="form-foot">Jadwal tidak berubah sebelum izin disetujui HRD.</p>
    </form>
  )
}
