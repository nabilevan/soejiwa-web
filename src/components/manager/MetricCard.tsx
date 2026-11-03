import { Icon, type IconName } from "../ui"

export type Metric = {
  label: string
  value: string
  caption: string
  icon: IconName
}

export function MetricCard({ label, value, caption, icon }: Metric) {
  return (
    <div className="card metric">
      <div className="metric__head">
        <span>{label}</span>
        <Icon name={icon} size={24} />
      </div>
      <b className="metric__value">{value}</b>
      <span className="metric__caption">{caption}</span>
    </div>
  )
}

export function MetricGrid({ items }: { items: Metric[] }) {
  return (
    <div className="metrics">
      {items.map((item) => (
        <MetricCard key={item.label} {...item} />
      ))}
    </div>
  )
}
