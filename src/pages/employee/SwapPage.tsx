import { useState, type FormEvent } from "react"
import {
  Button,
  FileUpload,
  formatShortDate,
  Icon,
  Note,
  SelectField,
  SHIFT_ICON,
  TextareaField,
  TextField,
} from "../../components/ui"
import { SHIFT_TIMES } from "../../data/constants"
import { currentEmployee, swapPartners } from "../../data/employee"
import { dayName } from "../../lib/date"
import type { AttachedFile, ShiftName, SwapRequest } from "../../types"

const WORK_SHIFTS: ShiftName[] = ["Pagi", "Siang", "Malam"]

type ShiftPickerProps = {
  label: string
  date: string
  shift: ShiftName
  onDateChange: (iso: string) => void
  onShiftChange: (shift: ShiftName) => void
}

/** Kotak pilihan tanggal + sif (Shift asal / Ditukar ke). */
function ShiftPicker({ label, date, shift, onDateChange, onShiftChange }: ShiftPickerProps) {
  return (
    <div className="field">
      <span className="field__label">{label}</span>
      <div className="shift-picker">
        <label className="shift-picker__row">
          <span>{formatShortDate(date)}</span>
          <Icon name="calendar" size={20} />
          <input
            type="date"
            className="field__overlay"
            aria-label={`Tanggal ${label.toLowerCase()}`}
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            onClick={(e) => e.currentTarget.showPicker?.()}
          />
        </label>
        <label className="shift-picker__row shift-picker__shift">
          <span>
            <Icon name={SHIFT_ICON[shift]} size={18} />
            {shift}
          </span>
          <Icon name="chevron-down" size={18} />
          <select
            className="field__overlay"
            aria-label={`Sif ${label.toLowerCase()}`}
            value={shift}
            onChange={(e) => onShiftChange(e.target.value as ShiftName)}
          >
            {WORK_SHIFTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <span className="shift-picker__time">{SHIFT_TIMES[shift]}</span>
      </div>
    </div>
  )
}

type SwapPageProps = {
  initial: SwapRequest | null
  onSubmit: (request: SwapRequest) => void
}

export function SwapPage({ initial, onSubmit }: SwapPageProps) {
  const [partner, setPartner] = useState(initial?.partner ?? "Zaki")
  const [fromDate, setFromDate] = useState(initial?.fromDate ?? "2026-11-05")
  const [toDate, setToDate] = useState(initial?.toDate ?? "2026-11-05")
  const [fromShift, setFromShift] = useState<ShiftName>(initial?.fromShift ?? "Siang")
  const [toShift, setToShift] = useState<ShiftName>(initial?.toShift ?? "Malam")
  const [reason, setReason] = useState(
    initial?.reason ?? "Mengantar ibu kontrol pada siang hari. Saya dapat masuk shift malam.",
  )
  const [file, setFile] = useState<AttachedFile | null>(initial?.file ?? { name: "bukti-tukar.jpg", size: "248 KB" })
  const [showErrors, setShowErrors] = useState(false)

  const sameDay = fromDate === toDate
  const dateSummary = sameDay
    ? `${dayName(fromDate)}, ${formatShortDate(fromDate)} (hari yang sama)`
    : `${dayName(fromDate)}, ${formatShortDate(fromDate)} ↔ ${dayName(toDate)}, ${formatShortDate(toDate)}`

  const sameShift = sameDay && fromShift === toShift
  const reasonError = reason.trim() === ""
  const fileError = file === null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sameShift || reasonError || fileError) {
      setShowErrors(true)
      return
    }
    onSubmit({
      partner,
      fromDate,
      toDate,
      fromShift,
      toShift,
      reason,
      file,
      submittedAt: "3 Nov 2026, 14:32 WIB",
    })
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      <Note tone="green">Rekan harus setuju terlebih dahulu sebelum diproses manajer</Note>

      <div>
        <div className="field-pair">
          <TextField label="Nama" value={currentEmployee.name} readOnly large />
          <SelectField
            label="Tukar dengan"
            large
            options={swapPartners}
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
          />
        </div>
        <p className="hint">Pilihan rekan: {swapPartners.join(", ")}</p>
      </div>

      <div>
        <div className="field-pair">
          <ShiftPicker
            label="Shift asal"
            date={fromDate}
            shift={fromShift}
            onDateChange={setFromDate}
            onShiftChange={setFromShift}
          />
          <ShiftPicker
            label="Ditukar ke"
            date={toDate}
            shift={toShift}
            onDateChange={setToDate}
            onShiftChange={setToShift}
          />
        </div>
        <p className="hint">
          {currentEmployee.name} ↔ {partner} • {dateSummary}
        </p>
      </div>

      {showErrors && sameShift && (
        <Note tone="danger" icon="alert-circle">
          Sif asal dan sif tujuan sama. Pilih sif yang berbeda.
        </Note>
      )}

      <TextareaField
        label="Alasan"
        rows={2}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        error={showErrors && reasonError}
        hint={showErrors && reasonError ? "Alasan wajib diisi." : undefined}
      />

      <div>
        <div className="label-row">
          <b>Bukti pendukung *</b>
          <span>Wajib • foto/dokumen</span>
        </div>
        <FileUpload value={file} onChange={setFile} error={showErrors && fileError ? "Bukti pendukung wajib diunggah." : undefined} />
      </div>

      <Button type="submit" size="lg" block icon="send">
        Kirim Pengajuan
      </Button>
    </form>
  )
}
