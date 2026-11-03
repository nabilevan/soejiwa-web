import type { ReactNode } from "react"
import type { ManagerPage } from "../../types"
import { MANAGER_NAV } from "./managerNav"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

type ManagerLayoutProps = {
  page: ManagerPage
  onNavigate: (page: ManagerPage) => void
  onLogout: () => void
  children: ReactNode
}

/** Kerangka ruang manajer: sidebar kiri (dengan footer profil) + topbar + konten. */
export function ManagerLayout({ page, onNavigate, onLogout, children }: ManagerLayoutProps) {
  const title = MANAGER_NAV.find((item) => item.id === page)?.label ?? ""

  return (
    <div className="manager-app">
      <Sidebar page={page} onNavigate={onNavigate} onLogout={onLogout} />
      <div className="manager-main">
        <Topbar title={title} />
        <main className="manager-content">{children}</main>
      </div>
    </div>
  )
}
