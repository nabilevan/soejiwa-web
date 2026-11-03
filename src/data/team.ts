import type { ScheduleCell, TeamMember } from "../types"

export const team: TeamMember[] = [
  {
    id: "ramadhan",
    initials: "RA",
    name: "Ramadhan",
    role: "HRD",
    todayShift: "Pagi",
    checkIn: "06:55",
    checkOut: null,
    duration: "7 j 37 m",
    status: "Tepat waktu",
    remark: "Sedang bekerja",
  },
  {
    id: "aeesha",
    initials: "AE",
    name: "Aeesha",
    role: "Barista",
    todayShift: "Pagi",
    checkIn: "06:57",
    checkOut: null,
    duration: "7 j 35 m",
    status: "Tepat waktu",
    remark: "Sedang bekerja",
  },
  {
    id: "zaki",
    initials: "ZA",
    name: "Zaki",
    role: "Barista",
    todayShift: "Malam",
    checkIn: null,
    checkOut: null,
    duration: null,
    status: "Terjadwal",
    remark: "Sif belum dimulai",
  },
  {
    id: "didin",
    initials: "DI",
    name: "Didin",
    role: "Kitchen",
    todayShift: "Siang",
    checkIn: "11:04",
    checkOut: null,
    duration: "3 j 28 m",
    status: "Terlambat",
    remark: "Terlambat 4 menit",
  },
]

export const manager = team[0]

export function getMember(id: string) {
  return team.find((m) => m.id === id) ?? team[0]
}

/** Jadwal tim minggu 2–8 November 2026 (Senin–Minggu). */
export const teamSchedule: Record<string, ScheduleCell[]> = {
  ramadhan: [
    { shift: "Libur" },
    { shift: "Pagi" },
    { shift: "Pagi" },
    { shift: "Pagi" },
    { shift: "Pagi" },
    { shift: "Pagi" },
    { shift: "Pagi" },
  ],
  aeesha: [
    { shift: "Pagi" },
    { shift: "Pagi" },
    { shift: "Libur" },
    { shift: "Siang" },
    { shift: "Pagi", note: "pending" },
    { shift: "Malam" },
    { shift: "Libur" },
  ],
  zaki: [
    { shift: "Malam" },
    { shift: "Malam" },
    { shift: "Siang" },
    { shift: "Malam" },
    { shift: "Malam" },
    { shift: "Libur", note: "approved" },
    { shift: "Siang" },
  ],
  didin: [
    { shift: "Siang" },
    { shift: "Siang" },
    { shift: "Malam", note: "pending" },
    { shift: "Siang" },
    { shift: "Libur" },
    { shift: "Siang" },
    { shift: "Malam" },
  ],
}
