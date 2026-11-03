import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Icon, type IconName } from "./Icon"

type Variant = "primary" | "secondary" | "outline" | "outline-green" | "muted" | "danger"
type Size = "sm" | "md" | "lg"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  block?: boolean
  icon?: IconName
  children: ReactNode
}

/**
 * primary       → hijau, aksi utama
 * secondary     → putih, teks gelap
 * outline       → putih, teks hijau, garis abu-abu
 * outline-green → putih, teks & garis hijau
 * muted         → abu-abu (status selesai)
 * danger        → merah muda, hanya untuk penolakan
 */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  icon,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, block && "btn--block", className]
    .filter(Boolean)
    .join(" ")

  return (
    <button type={type} className={classes} {...rest}>
      {icon && <Icon name={icon} size={size === "lg" ? 20 : 18} />}
      {children}
    </button>
  )
}
