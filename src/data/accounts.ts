import type { Account } from "../types"

// Akun demo. Ganti dengan pemanggilan API saat backend sudah tersedia.
export const accounts: Account[] = [
  { username: "aeesha", password: "12345678", role: "employee" },
  { username: "ramadhan", password: "12345678", role: "manager" },
]

export function findAccount(username: string, password: string) {
  const name = username.trim().toLowerCase()
  return accounts.find((a) => a.username === name && a.password === password) ?? null
}
