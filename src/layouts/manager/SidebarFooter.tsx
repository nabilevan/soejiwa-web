import { Avatar, Icon } from "../../components/ui"
import { manager } from "../../data/team"

/** Footer sidebar manajer: profil yang sedang masuk + tombol keluar. */
export function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="sidebar__footer">
      <Avatar initials={manager.initials} size="lg" />
      <span className="sidebar__profile">
        <b>{manager.name}</b>
        <small>{manager.role} • Manajer</small>
      </span>
      <button type="button" className="icon-btn" onClick={onLogout} aria-label="Keluar" title="Keluar">
        <Icon name="logout" size={22} />
      </button>
    </div>
  )
}
