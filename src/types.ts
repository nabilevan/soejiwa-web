// Tipe data yang dipakai di seluruh aplikasi.

export type Role = "employee" | "manager"
export type AppView = "login" | Role

export type EmployeePage = "home" | "schedule" | "leave" | "history" | "swap" | "swap-status"
export type ManagerPage = "summary" | "staff-schedule" | "attendance" | "requests"

export type ShiftName = "Pagi" | "Siang" | "Malam" | "Libur"

export type StatusLabel =
  | "Tepat waktu"
  | "Sedang bekerja"
  | "Selesai"
  | "Terlambat"
  | "Terjadwal"
  | "Menunggu"
  | "Disetujui"
  | "Ditolak"
  | "Urgent"
  | "Sudah dibagikan"

export type RequestStatus = "Menunggu" | "Disetujui" | "Ditolak"

/** Status satu hari di jadwal pegawai. */
export type DayState = "done" | "today" | "scheduled" | "pending" | "approved"

export type WeekDay = {
  day: string // "Senin"
  short: string // "Sen"
  date: string // "2 Nov"
}

export type ScheduleCell = {
  shift: ShiftName
  /** Catatan tambahan selain status bawaan (sudah berlalu / hari ini / terjadwal). */
  note?: "pending" | "approved"
}

export type TeamMember = {
  id: string
  initials: string
  name: string
  role: string
  todayShift: ShiftName
  checkIn: string | null
  checkOut: string | null
  duration: string | null
  status: StatusLabel
  remark: string
}

export type Account = {
  username: string
  password: string
  role: Role
}

export type AttachedFile = {
  name: string
  size: string // "248 KB"
}

export type LeaveRequest = {
  id: string
  memberId: string
  type: string
  date: string // "6 Nov 2026"
  dateLong: string // "6 November"
  duration: string // "1 hari"
  urgent?: boolean
  status: RequestStatus
  reason: string
  file: AttachedFile
  summary: string
  impact?: { title: string; text: string }
  submittedAt: string
  submittedShort: string
}

export type AttendanceRecord = {
  date: string
  shift: ShiftName
  checkIn: string
  checkOut: string | null
  status: StatusLabel
}

export type SwapRequest = {
  partner: string
  /** Format ISO "2026-11-05" */
  fromDate: string
  toDate: string
  fromShift: ShiftName
  toShift: ShiftName
  reason: string
  file: AttachedFile | null
  submittedAt: string
}
