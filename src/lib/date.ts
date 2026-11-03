const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const MONTHS_LONG = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** "2026-11-05" → "Kamis" */
export function dayName(iso: string) {
  return DAYS[parseIso(iso).getDay()]
}

/** "2026-11-05" → "Kamis, 5 November 2026" */
export function formatLongDate(iso: string) {
  const date = parseIso(iso)
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`
}
