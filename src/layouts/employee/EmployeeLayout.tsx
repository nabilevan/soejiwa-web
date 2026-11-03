import type { ReactNode } from "react"
import type { EmployeePage } from "../../types"
import { BottomNav } from "./BottomNav"
import { EmployeeHeader } from "./EmployeeHeader"
import { NAV_SETS, PAGE_META, type NavTab } from "./employeeNav"

type EmployeeLayoutProps = {
  page: EmployeePage
  onNavigate: (page: EmployeePage) => void
  onBack: () => void
  onLogout: () => void
  children: ReactNode
}

/** Kerangka aplikasi pegawai: header → konten → navigasi bawah (footer). */
export function EmployeeLayout({ page, onNavigate, onBack, onLogout, children }: EmployeeLayoutProps) {
  const meta = PAGE_META[page]

  function handleTab(tab: NavTab) {
    if (tab === "profile") {
      if (window.confirm("Keluar dari akun ini?")) onLogout()
      return
    }
    onNavigate(tab)
  }

  return (
    <div className="employee-app">
      <EmployeeHeader meta={meta} onBack={onBack} onLogout={onLogout} />
      <main className="employee-main">
        <div className="employee-content">{children}</div>
      </main>
      <BottomNav items={NAV_SETS[meta.nav]} active={meta.activeTab} onSelect={handleTab} />
    </div>
  )
}
