import { Avatar, Brand, Icon } from "../../components/ui"
import { currentEmployee } from "../../data/employee"
import type { PageMeta } from "./employeeNav"

type EmployeeHeaderProps = {
  meta: PageMeta
  onBack: () => void
  onLogout: () => void
}

export function EmployeeHeader({ meta, onBack, onLogout }: EmployeeHeaderProps) {
  return (
    <header className="employee-header">
      {meta.back && (
        <button type="button" className="icon-btn employee-header__back" onClick={onBack} aria-label="Kembali">
          <Icon name="arrow-left" size={24} />
        </button>
      )}

      <div className="employee-header__brand">
        <Brand size="sm" />
        {meta.greeting && <span className="employee-header__greeting">Halo, {currentEmployee.name}</span>}
      </div>

      {meta.title ? (
        <div className="employee-header__title">
          <b>{meta.title}</b>
          {meta.subtitle && <small>{meta.subtitle}</small>}
        </div>
      ) : (
        <div className="employee-header__actions">
          <button type="button" className="icon-btn" aria-label="Notifikasi">
            <Icon name="bell" size={24} />
          </button>
          <button type="button" className="avatar-btn" onClick={onLogout} title="Keluar" aria-label="Keluar">
            <Avatar initials={currentEmployee.initials} size="lg" />
          </button>
        </div>
      )}
    </header>
  )
}
