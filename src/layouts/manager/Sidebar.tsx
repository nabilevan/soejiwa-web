import { Brand, Icon } from "../../components/ui"
import { APP_TAGLINE, TEAM_MOTTO, TEAM_MOTTO_SUB } from "../../data/constants"
import type { ManagerPage } from "../../types"
import { MANAGER_NAV } from "./managerNav"
import { SidebarFooter } from "./SidebarFooter"

type SidebarProps = {
  page: ManagerPage
  onNavigate: (page: ManagerPage) => void
  onLogout: () => void
}

export function Sidebar({ page, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <Brand />
        <p className="sidebar__tagline">{APP_TAGLINE.toUpperCase()}</p>
      </div>

      <p className="sidebar__label">RUANG MANAJER</p>
      <nav className="sidebar__nav" aria-label="Navigasi manajer">
        {MANAGER_NAV.map((item) => {
          const isActive = item.id === page
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar__link ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon} size={22} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="team-card">
        <Icon name="coffee" size={30} />
        <b>{TEAM_MOTTO}</b>
        <span>{TEAM_MOTTO_SUB}</span>
      </div>

      <SidebarFooter onLogout={onLogout} />
    </aside>
  )
}
