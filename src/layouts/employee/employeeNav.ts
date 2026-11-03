import type { IconName } from "../../components/ui"
import { currentEmployee } from "../../data/employee"
import type { EmployeePage } from "../../types"

export type NavTab = EmployeePage | "profile"
export type NavItem = { id: NavTab; label: string; icon: IconName }

// Desain memakai dua set tab bawah:
// - "main"    → Beranda, Jadwal, Izin, Riwayat (Beranda & Riwayat)
// - "request" → Jadwal, Pengajuan, Profil (Jadwal & semua form pengajuan)
export const NAV_SETS: Record<"main" | "request", NavItem[]> = {
  main: [
    { id: "home", label: "Beranda", icon: "home" },
    { id: "schedule", label: "Jadwal", icon: "calendar" },
    { id: "leave", label: "Izin", icon: "file" },
    { id: "history", label: "Riwayat", icon: "clock" },
  ],
  request: [
    { id: "schedule", label: "Jadwal", icon: "calendar" },
    { id: "leave", label: "Pengajuan", icon: "file" },
    { id: "profile", label: "Profil", icon: "user" },
  ],
}

export type PageMeta = {
  /** Judul di sisi kanan header. Kosong = tampilkan lonceng & avatar. */
  title?: string
  subtitle?: string
  /** Tampilkan "Halo, {nama}" di bawah logo. */
  greeting?: boolean
  /** Tampilkan tombol kembali di kiri logo. */
  back?: boolean
  nav: keyof typeof NAV_SETS
  activeTab: NavTab
}

export const PAGE_META: Record<EmployeePage, PageMeta> = {
  home: { nav: "main", activeTab: "home" },
  schedule: {
    title: "Jadwal Saya",
    subtitle: `${currentEmployee.name} • ${currentEmployee.role}`,
    greeting: true,
    nav: "request",
    activeTab: "schedule",
  },
  leave: { title: "Ajukan Izin", back: true, nav: "request", activeTab: "leave" },
  history: { title: "Riwayat Absensi", nav: "main", activeTab: "history" },
  swap: { title: "Ajukan Tukar Shift", back: true, nav: "request", activeTab: "leave" },
  "swap-status": { title: "Status Tukar Shift", back: true, nav: "request", activeTab: "leave" },
}
