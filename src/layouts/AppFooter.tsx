import { APP_NAME, APP_TAGLINE } from "../data/constants"

/** Footer teks di bagian bawah halaman login: "KEDAI SOEJIWA • ABSENSI & JADWAL PEGAWAI". */
export function AppFooter() {
  return (
    <footer className="app-footer">
      {APP_NAME.toUpperCase()} • {APP_TAGLINE.toUpperCase()}
    </footer>
  )
}
