type AvatarProps = {
  initials: string
  size?: "sm" | "md" | "lg"
}

export function Avatar({ initials, size = "md" }: AvatarProps) {
  return (
    <span className={`avatar avatar--${size}`} aria-hidden="true">
      {initials}
    </span>
  )
}

type PersonProps = {
  initials: string
  name: string
  role: string
  size?: "sm" | "md" | "lg"
}

/** Avatar + nama + jabatan, dipakai di tabel dan panel manajer. */
export function Person({ initials, name, role, size = "md" }: PersonProps) {
  return (
    <div className="person">
      <Avatar initials={initials} size={size} />
      <span className="person__text">
        <span className="person__name">{name}</span>
        <span className="person__role">{role}</span>
      </span>
    </div>
  )
}
