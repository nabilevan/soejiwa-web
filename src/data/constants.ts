import type { ShiftName, WeekDay } from "../types"

// Data demo mengikuti desain (Selasa, 3 November 2026 pukul 14:32 WIB).
export const APP_NAME = "Kedai Soejiwa"
export const APP_TAGLINE = "Absensi & Jadwal Pegawai"
export const TEAM_MOTTO = "Satu tim, satu jiwa."
export const TEAM_MOTTO_SUB = "Jadwal rapi, kerja lebih nyaman."

export const TODAY_LABEL = "Selasa, 3 November 2026"
export const NOW_LABEL = "14:32 WIB"
export const TODAY_INDEX = 1 // indeks Selasa di WEEK_DAYS
export const WEEK_LABEL = "2–8 November 2026"
export const WEEK_LABEL_SHORT = "2–8 Nov 2026"

export const LOGO_SRC = "/assets/soejiwa-team.png"

export const SHIFT_TIMES: Record<ShiftName, string> = {
  Pagi: "07:00–15:00",
  Siang: "11:00–19:00",
  Malam: "15:00–23:00",
  Libur: "Tanpa sif",
}

export const SHIFT_HOURS = 8

export const WEEK_DAYS: WeekDay[] = [
  { day: "Senin", short: "Sen", date: "2 Nov" },
  { day: "Selasa", short: "Sel", date: "3 Nov" },
  { day: "Rabu", short: "Rab", date: "4 Nov" },
  { day: "Kamis", short: "Kam", date: "5 Nov" },
  { day: "Jumat", short: "Jum", date: "6 Nov" },
  { day: "Sabtu", short: "Sab", date: "7 Nov" },
  { day: "Minggu", short: "Min", date: "8 Nov" },
]

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024
export const UPLOAD_ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
