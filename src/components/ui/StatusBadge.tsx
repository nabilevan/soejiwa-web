import type { StatusLabel } from "../../types"
import { Icon, type IconName } from "./Icon"

type Tone = "green" | "amber" | "red" | "blue" | "neutral"

const STATUS_STYLE: Record<StatusLabel, { tone: Tone; icon: IconName }> = {
  "Tepat waktu": { tone: "green", icon: "check-circle" },
  "Sedang bekerja": { tone: "green", icon: "check-circle" },
  Selesai: { tone: "green", icon: "check-circle" },
  Disetujui: { tone: "green", icon: "check-circle" },
  "Sudah dibagikan": { tone: "green", icon: "check-circle" },
  Menunggu: { tone: "amber", icon: "clock" },
  Terlambat: { tone: "red", icon: "alert-circle" },
  Ditolak: { tone: "red", icon: "alert-circle" },
  Urgent: { tone: "red", icon: "alert-circle" },
  Terjadwal: { tone: "blue", icon: "calendar-clock" },
}

/** Badge status selalu memakai ikon, sesuai pustaka antarmuka di desain. */
export function StatusBadge({ status, className = "" }: { status: StatusLabel; className?: string }) {
  const { tone, icon } = STATUS_STYLE[status]
  return (
    <span className={`badge badge--${tone} ${className}`}>
      <Icon name={icon} size={15} strokeWidth={2} />
      {status}
    </span>
  )
}
