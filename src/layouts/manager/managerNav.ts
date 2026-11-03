import type { IconName } from "../../components/ui"
import type { ManagerPage } from "../../types"

export const MANAGER_NAV: { id: ManagerPage; label: string; icon: IconName }[] = [
  { id: "summary", label: "Ringkasan", icon: "grid" },
  { id: "staff-schedule", label: "Jadwal Pegawai", icon: "calendar" },
  { id: "attendance", label: "Rekap Absensi", icon: "clipboard-check" },
  { id: "requests", label: "Permohonan Izin", icon: "file" },
]
