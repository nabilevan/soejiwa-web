import { useState, type FormEvent } from "react"
import { Button, Icon, Note, TextField } from "../../components/ui"
import { findAccount } from "../../data/accounts"
import { APP_NAME, APP_TAGLINE, LOGO_SRC, TEAM_MOTTO, TEAM_MOTTO_SUB } from "../../data/constants"
import { AppFooter } from "../../layouts/AppFooter"
import type { Role } from "../../types"

type LoginPageProps = {
  onLogin: (role: Role) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const account = findAccount(username, password)
    if (!account) {
      setError(true)
      return
    }
    setError(false)
    onLogin(account.role)
  }

  function clearError() {
    if (error) setError(false)
  }

  return (
    <div className="login-page">
      {/* Panel kiri (desktop saja) */}
      <aside className="login-hero">
        <p className="login-hero__kicker">{APP_TAGLINE.toUpperCase()}</p>
        <div className="login-hero__art">
          <img src={LOGO_SRC} alt="Tim Kedai Soejiwa" />
        </div>
        <h2 className="login-hero__title">{TEAM_MOTTO}</h2>
        <p className="login-hero__text">
          {TEAM_MOTTO_SUB}
          <br />
          Mulai harimu bersama {APP_NAME}.
        </p>
        <p className="login-hero__brand">{APP_NAME.toUpperCase()}</p>
      </aside>

      {/* Form masuk */}
      <main className="login-panel">
        <form className={`login-form ${error ? "has-error" : ""}`} onSubmit={handleSubmit} noValidate>
          <img className="login-form__logo" src={LOGO_SRC} alt={APP_NAME} />

          <h1 className="login-form__title">Masuk</h1>
          <p className="login-form__lead only-desktop">Selamat datang kembali. Gunakan akunmu untuk melanjutkan.</p>
          <p className="login-form__lead only-mobile">Akunmu akan menentukan akses ke halaman Pegawai atau Manajer.</p>

          <TextField
            label="Username"
            name="username"
            autoComplete="username"
            placeholder="Masukkan username"
            icon="mail"
            large
            error={error}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              clearError()
            }}
          />

          <TextField
            label="Kata sandi / PIN"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan kata sandi / PIN"
            large
            error={error}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              clearError()
            }}
            trailing={
              <button
                type="button"
                className="field__trailing"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                <Icon name={showPassword ? "eye" : "eye-off"} size={20} />
              </button>
            }
          />

          {error ? (
            <Note tone="danger" icon="alert-circle">
              Username atau kata sandi/PIN salah. Silakan coba lagi.
            </Note>
          ) : (
            <Note tone="green" className="only-desktop">
              Akses Pegawai atau Manajer terdeteksi otomatis dari akunmu.
            </Note>
          )}

          <div className="login-row">
            <label className="checkbox">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Ingat saya
            </label>
            <button
              type="button"
              className="link"
              onClick={() => window.alert("Silakan hubungi HRD Kedai Soejiwa untuk mengatur ulang kata sandi atau PIN.")}
            >
              Lupa kata sandi?
            </button>
          </div>

          <div className="login-actions">
            <Button type="submit" size="lg" block icon="arrow-right" className="login-submit">
              Masuk
            </Button>

            <p className="login-routes only-desktop">
              Akun Pegawai menuju Beranda Pegawai.
              <br />
              Akun Manajer menuju Ringkasan Manajer.
            </p>

            <div className="login-demo">
              <Button variant="secondary" size="sm" block onClick={() => onLogin("employee")}>
                Demo: Masuk sebagai Pegawai
              </Button>
              <Button variant="secondary" size="sm" block onClick={() => onLogin("manager")}>
                Demo: Masuk sebagai Manajer
              </Button>
            </div>
          </div>

          <p className="login-help">
            <Icon name="help" size={18} />
            Belum punya akun? Hubungi HRD.
          </p>
        </form>
      </main>

      <AppFooter />
    </div>
  )
}
