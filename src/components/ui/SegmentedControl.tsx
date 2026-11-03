type SegmentedControlProps<T extends string> = {
  name: string
  options: T[]
  value: T
  onChange: (value: T) => void
}

/** Pilihan tunggal berbentuk tombol berderet (mis. jenis izin). */
export function SegmentedControl<T extends string>({ name, options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div className="segmented" role="radiogroup">
      {options.map((option) => (
        <label key={option} className={option === value ? "is-selected" : ""}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={option === value}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  )
}
