import { useState, type ReactNode } from "react"

import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { cn } from "@/lib/utils"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-svh bg-background">
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex min-h-[calc(100svh-4rem)]">
        <Sidebar />

        {sidebarOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              aria-label="Close navigation"
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar
              className={cn(
                "relative z-50 flex h-full flex-col shadow-[8px_0_24px_rgb(0_0_0/35%)]"
              )}
            />
          </div>
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
          {children}
        </main>
      </div>
    </div>
  )
}
