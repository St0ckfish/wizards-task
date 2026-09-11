import {
  IconBook,
  IconDashboardGrid,
  IconFlask,
  IconHelpCircle,
  IconSettings,
  IconSparkles,
  IconUsers,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { navLabel: "Dashboard", icon: <IconDashboardGrid className="h-5 w-5" /> },
  {
    navLabel: "Wizards",
    icon: <IconUsers className="h-5 w-5 text-secondary-light" />,
  },
  {
    navLabel: "Elixirs",
    icon: <IconFlask className="h-5 w-5 text-secondary-light" />,
  },
  {
    navLabel: "Archives",
    icon: <IconBook className="h-5 w-5 text-secondary-light" />,
  },
]

type SidebarProps = {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const activeItem = "Dashboard"

  return (
    <aside
      className={cn(
        "hidden h-[calc(100vh-64px)] w-64 shrink-0 overflow-y-auto border-r border-white/10 bg-surface px-4 py-6 lg:sticky lg:top-16 lg:flex lg:flex-col",
        className
      )}
    >
      <div className="mb-10 p-5 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-secondary-soft to-gold p-0.5">
          <div className="flex h-full w-full items-center justify-center rounded-[calc(var(--radius-xl)-2px)] bg-surface">
            <IconSparkles className="h-8 w-8 text-gold" />
          </div>
        </div>
        <p className="font-black text-gold">Registry</p>
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          Ministry of Alchemical Records
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map(({ navLabel, icon }) => (
          <a
            key={navLabel}
            href="#"
            onClick={(event) => event.preventDefault()}
            aria-current={activeItem === navLabel ? "page" : undefined}
            className={cn(
              "flex w-full items-center rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors",
              activeItem === navLabel
                ? "border-r-2 border-gold bg-gold/20 text-gold"
                : "text-secondary-light hover:bg-white/10"
            )}
          >
            <span className="mr-4">{icon}</span>
            {navLabel}
          </a>
        ))}
      </nav>

      <div className="space-y-2">
        <Button
          type="button"
          className="mb-6 h-11 w-full gap-2 rounded-lg bg-lavender px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elixir hover:bg-lavender/90 active:translate-y-px active:bg-lavender/80"
        >
          + New Elixir
        </Button>

        <a
          href="#"
          onClick={(event) => event.preventDefault()}
          className="flex w-full px-4 py-2 text-left text-sm font-semibold text-secondary-light"
        >
          <span className="mr-4">
            <IconSettings className="h-5 w-5 text-secondary-light" />
          </span>
          Settings
        </a>
        <a
          href="#"
          onClick={(event) => event.preventDefault()}
          className="flex w-full px-4 py-2 text-left text-sm font-semibold text-secondary-light"
        >
          <span className="mr-4">
            <IconHelpCircle className="h-5 w-5 text-secondary-light" />
          </span>
          Support
        </a>
      </div>
    </aside>
  )
}
