import { Bell, Menu, Search, Settings } from "lucide-react"

import { Input } from "@/components/ui/input"

type TopbarProps = {
  onMenuClick?: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="topbar-effect sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-background/80 pr-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-6">
        <button
          className="flex h-16 w-16 items-center justify-center border-r border-white/10 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground lg:hidden"
          type="button"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
        >
          <Menu className="h-4 w-5" />
        </button>

        <div className="hidden font-heading text-[24px] leading-8 font-bold text-gold lg:block">
          Wizarding Registry
        </div>

        <div className="ml-10 hidden lg:flex">
          <label className="relative w-72">
            <span className="sr-only">Scry records</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Scrying records..."
              className="h-10 w-72 rounded-full border-white/10 bg-card pr-4 pl-10 text-[13px] dark:bg-card"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 text-muted-foreground lg:gap-5">
        <button
          className="rounded-full p-2 hover:bg-white/10"
          type="button"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-white" />
        </button>
        <button
          className="hidden rounded-full p-2 hover:bg-white/10 lg:inline-flex"
          type="button"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-white" />
        </button>
        <div className="hidden h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-card lg:block">
          <img
            src="images/user-avatar.jpg"
            alt="User avatar"
            className="h-10 w-10 object-cover"
          />
        </div>
      </div>
    </header>
  )
}
