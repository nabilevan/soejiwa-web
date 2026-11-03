import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon"

type Tone = "plain" | "soft" | "green" | "amber" | "danger"

type NoteProps = {
  tone?: Tone
  icon?: IconName | null
  className?: string
  onClose?: () => void
  children: ReactNode
}

/** Catatan/peringatan kecil. `plain` tanpa latar, lainnya dengan latar berwarna. */
export function Note({ tone = "plain", icon = "info", className = "", onClose, children }: NoteProps) {
  return (
    <div className={`note note--${tone} ${className}`} role={tone === "danger" ? "alert" : undefined}>
      {icon && <Icon name={icon} size={18} />}
      <div className="note__body">{children}</div>
      {onClose && (
        <button type="button" className="note__close" onClick={onClose} aria-label="Tutup">
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}
