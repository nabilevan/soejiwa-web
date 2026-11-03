import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"
import { Icon, type IconName } from "./Icon"

type BaseProps = {
  label: ReactNode
  hint?: ReactNode
  error?: boolean
  large?: boolean
  className?: string
}

function controlClass({ error, large, locked }: { error?: boolean; large?: boolean; locked?: boolean }) {
  return ["field__control", error && "is-error", large && "is-large", locked && "is-locked"]
    .filter(Boolean)
    .join(" ")
}

/* ---------- Input teks ---------- */

type TextFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    icon?: IconName
    /** Elemen di sisi kanan, mis. tombol tampilkan sandi. Menggantikan `icon`. */
    trailing?: ReactNode
  }

export function TextField({ label, hint, error, large, icon, trailing, className = "", readOnly, ...input }: TextFieldProps) {
  return (
    <label className={`field ${className}`}>
      <span className="field__label">{label}</span>
      <span className={controlClass({ error, large, locked: readOnly })}>
        <input aria-invalid={error || undefined} readOnly={readOnly} {...input} />
        {trailing ?? (readOnly ? <Icon name="lock" size={18} /> : icon && <Icon name={icon} size={20} />)}
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

/* ---------- Select ---------- */

type SelectFieldProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[]
  }

export function SelectField({ label, hint, error, large, options, className = "", ...select }: SelectFieldProps) {
  return (
    <label className={`field ${className}`}>
      <span className="field__label">{label}</span>
      <span className={controlClass({ error, large })}>
        <select {...select}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} className="field__chevron" />
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

/* ---------- Textarea ---------- */

type TextareaFieldProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextareaField({ label, hint, error, className = "", ...textarea }: TextareaFieldProps) {
  return (
    <label className={`field ${className}`}>
      <span className="field__label">{label}</span>
      <span className={`${controlClass({ error })} field__control--textarea`}>
        <textarea aria-invalid={error || undefined} {...textarea} />
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

/* ---------- Tanggal ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

/** "2026-11-06" → "6 Nov 2026" */
export function formatShortDate(iso: string) {
  if (!iso) return "Pilih tanggal"
  const [y, m, d] = iso.split("-").map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

type DateFieldProps = BaseProps & {
  value: string
  onChange: (iso: string) => void
  min?: string
}

/**
 * Menampilkan tanggal dengan format "6 Nov 2026" dan ikon kalender seperti desain,
 * sementara pemilihan tanggal tetap memakai date picker bawaan browser.
 */
export function DateField({ label, hint, error, value, onChange, min, className = "" }: DateFieldProps) {
  return (
    <label className={`field ${className}`}>
      <span className="field__label">{label}</span>
      <span className={controlClass({ error, large: true })}>
        <span className="field__value">{formatShortDate(value)}</span>
        <Icon name="calendar" size={20} />
        <input
          type="date"
          className="field__overlay"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => e.currentTarget.showPicker?.()}
        />
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}
