import { useState } from "react"
import { EmployeeLayout } from "../layouts/employee/EmployeeLayout"
import { HistoryPage } from "../pages/employee/HistoryPage"
import { HomePage } from "../pages/employee/HomePage"
import { LeavePage } from "../pages/employee/LeavePage"
import { SchedulePage } from "../pages/employee/SchedulePage"
import { SwapPage } from "../pages/employee/SwapPage"
import { SwapStatusPage } from "../pages/employee/SwapStatusPage"
import type { EmployeePage, SwapRequest } from "../types"

/** Pengatur halaman untuk pegawai. Setiap halaman ada di folder pages/employee. */
export function EmployeeApp({ onLogout }: { onLogout: () => void }) {
  const [history, setHistory] = useState<EmployeePage[]>(["home"])
  const [swapRequest, setSwapRequest] = useState<SwapRequest | null>(null)
  const page = history[history.length - 1]

  function navigate(next: EmployeePage) {
    if (next === page) return
    setHistory((h) => [...h, next])
    window.scrollTo(0, 0)
  }

  function goBack() {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : ["home"]))
  }

  function renderPage() {
    switch (page) {
      case "home":
        return <HomePage onNavigate={navigate} />
      case "schedule":
        return <SchedulePage onNavigate={navigate} />
      case "leave":
        return <LeavePage />
      case "history":
        return <HistoryPage />
      case "swap":
        return (
          <SwapPage
            initial={swapRequest}
            onSubmit={(request) => {
              setSwapRequest(request)
              navigate("swap-status")
            }}
          />
        )
      case "swap-status":
        return swapRequest ? <SwapStatusPage request={swapRequest} /> : <SwapPage initial={null} onSubmit={setSwapRequest} />
    }
  }

  return (
    <EmployeeLayout page={page} onNavigate={navigate} onBack={goBack} onLogout={onLogout}>
      {renderPage()}
    </EmployeeLayout>
  )
}
