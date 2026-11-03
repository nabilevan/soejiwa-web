import { useState } from "react"
import { EmployeeApp } from "./apps/EmployeeApp"
import { ManagerApp } from "./apps/ManagerApp"
import { LoginPage } from "./pages/auth/LoginPage"
import type { AppView } from "./types"

// Bisa langsung membuka tampilan tertentu lewat ?view=employee atau ?view=manager
function initialView(): AppView {
  const view = new URLSearchParams(window.location.search).get("view")
  return view === "employee" || view === "manager" ? view : "login"
}

export default function App() {
  const [view, setView] = useState<AppView>(initialView)
  const logout = () => setView("login")

  if (view === "employee") return <EmployeeApp onLogout={logout} />
  if (view === "manager") return <ManagerApp onLogout={logout} />
  return <LoginPage onLogin={setView} />
}
