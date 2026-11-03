import { Icon } from "../../components/ui"
import { APP_NAME, NOW_LABEL, TODAY_LABEL } from "../../data/constants"

export function Topbar({ title }: { title: string }) {
  return (
    <header className="topbar">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Icon name="coffee" size={22} />
        <span>{APP_NAME}</span>
        <span aria-hidden="true">/</span>
        <strong aria-current="page">{title}</strong>
      </nav>
      <div className="topbar__meta">
        <span className="topbar__date">{TODAY_LABEL}</span>
        <b>{NOW_LABEL}</b>
        <button type="button" className="icon-btn" aria-label="Notifikasi">
          <Icon name="bell" size={22} />
        </button>
      </div>
    </header>
  )
}
