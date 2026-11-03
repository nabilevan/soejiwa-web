import type { ReactNode } from "react"
import { Icon } from "../ui"

type PanelProps = {
  title: string
  link?: { label: string; onClick: () => void }
  className?: string
  children: ReactNode
}

/** Kartu berjudul dengan tautan "Lihat ... →" di kanan atas. */
export function Panel({ title, link, className = "", children }: PanelProps) {
  return (
    <section className={`card panel ${className}`}>
      <div className="panel__head">
        <h2 className="panel__title">{title}</h2>
        {link && (
          <button type="button" className="link" onClick={link.onClick}>
            {link.label} <Icon name="arrow-right" size={16} strokeWidth={2.2} />
          </button>
        )}
      </div>
      {children}
    </section>
  )
}
