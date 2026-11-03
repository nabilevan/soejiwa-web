import type { AttendanceRecord, DayState, ShiftName, StatusLabel } from "../types"

// Data untuk pegawai yang sedang masuk (Aeesha).
export const currentEmployee = {
  id: "aeesha",
  initials: "AE",
  name: "Aeesha",
  role: "Barista",
}

export const todayShift = {
  shift: "Pagi" as ShiftName,
  time: "07:00–15:00",
  place: "Kedai Soejiwa",
  checkIn: "06:57",
  checkInStatus: "Tepat waktu",
}

export const monthStats = { present: 2, late: 0, approvedLeave: 0 }

export const myWeek: { shift: ShiftName; state: DayState }[] = [
  { shift: "Pagi", state: "done" },
  { shift: "Pagi", state: "today" },
  { shift: "Libur", state: "scheduled" },
  { shift: "Siang", state: "scheduled" },
  { shift: "Pagi", state: "pending" },
  { shift: "Malam", state: "scheduled" },
  { shift: "Libur", state: "scheduled" },
]

/** Tanggal November 2026 yang memiliki sif (untuk penanda kalender). */
export const scheduledDates = [2, 3, 5, 6, 7]
export const todayDate = 3

export const myRequests: { title: string; date: string; status: StatusLabel }[] = [
  { title: "Izin keperluan pribadi", date: "Jumat, 6 November 2026", status: "Menunggu" },
]

export const attendanceHistory: AttendanceRecord[] = [
  { date: "Selasa, 3 November", shift: "Pagi", checkIn: "06:57", checkOut: null, status: "Sedang bekerja" },
  { date: "Senin, 2 November", shift: "Pagi", checkIn: "06:58", checkOut: "15:03", status: "Tepat waktu" },
]

export const swapPartners = ["Zaki", "Ramadhan", "Didin"]
