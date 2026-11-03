import type { ShiftName } from "../../types"
import { Icon, type IconName } from "./Icon"

export const SHIFT_ICON: Record<ShiftName, IconName> = {
  Pagi: "sunrise",
  Siang: "sun",
  Malam: "moon",
  Libur: "coffee",
}

export function shiftClass(shift: ShiftName) {
  return shift.toLowerCase()
}

type ShiftChipProps = {
  shift: ShiftName
  size?: "sm" | "md" | "lg"
}

/** Label sif berwarna: Pagi hijau, Siang krem, Malam biru, Libur abu-abu. */
export function ShiftChip({ shift, size = "md" }: ShiftChipProps) {
  return (
    <span className={`shift-chip shift-chip--${size} tone-${shiftClass(shift)}`}>
      <Icon name={SHIFT_ICON[shift]} size={size === "lg" ? 18 : 16} />
      {shift}
    </span>
  )
}
