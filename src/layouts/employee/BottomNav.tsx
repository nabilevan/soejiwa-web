import { Icon } from "../../components/ui"
import type { NavItem, NavTab } from "./employeeNav"

type BottomNavProps = {
  items: NavItem[]
  active: NavTab
  onSelect: (tab: NavTab) => void
}

/** Footer aplikasi pegawai: navigasi tab di bagian bawah layar. */
export function BottomNav({ items, active, onSelect }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi pegawai">
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav__item ${isActive ? "is-active" : ""}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSelect(item.id)}
          >
            <Icon name={item.icon} size={24} strokeWidth={isActive ? 1.9 : 1.6} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
