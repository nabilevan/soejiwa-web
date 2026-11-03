type BrandProps = {
  size?: "sm" | "md"
}

/** Logo teks "KEDAI Soejiwa". */
export function Brand({ size = "md" }: BrandProps) {
  return (
    <span className={`brand brand--${size}`}>
      <span className="brand__kicker">KEDAI</span>
      <span className="brand__name">Soejiwa</span>
    </span>
  )
}
