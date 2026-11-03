import { useState } from "react"
import { leaveRequests } from "../data/requests"
import { ManagerLayout } from "../layouts/manager/ManagerLayout"
import { AttendancePage } from "../pages/manager/AttendancePage"
import { RequestsPage } from "../pages/manager/RequestsPage"
import { StaffSchedulePage } from "../pages/manager/StaffSchedulePage"
import { SummaryPage } from "../pages/manager/SummaryPage"
import type { LeaveRequest, ManagerPage, RequestStatus } from "../types"

/** Pengatur halaman untuk manajer. Setiap halaman ada di folder pages/manager. */
export function ManagerApp({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<ManagerPage>("summary")
  // Disimpan di sini agar keputusan izin juga terlihat di halaman Ringkasan.
  const [requests, setRequests] = useState<LeaveRequest[]>(leaveRequests)

  function navigate(next: ManagerPage) {
    setPage(next)
    window.scrollTo(0, 0)
  }

  function decide(id: string, status: RequestStatus) {
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  function renderPage() {
    switch (page) {
      case "summary":
        return <SummaryPage requests={requests} onNavigate={navigate} />
      case "staff-schedule":
        return <StaffSchedulePage />
      case "attendance":
        return <AttendancePage />
      case "requests":
        return <RequestsPage requests={requests} onDecide={decide} />
    }
  }

  return (
    <ManagerLayout page={page} onNavigate={navigate} onLogout={onLogout}>
      {renderPage()}
    </ManagerLayout>
  )
}
