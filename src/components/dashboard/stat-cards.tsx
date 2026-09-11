import {
  IconAlertMark,
  IconFlask,
  IconTrendingUp,
} from "@/components/icons"
import { Card } from "@/components/ui/card"
import { registryStats } from "@/data/dashboard"
import { formatCount } from "@/lib/format"
import { panelClass } from "@/lib/panel"

const stats = [
  {
    label: "Total Registered Wizards",
    value: formatCount(registryStats.totalWizards),
    valueClass: "text-lavender",
    hintClass: "text-gold",
    hint: (
      <>
        <IconTrendingUp className="size-3.5" />
        {registryStats.wizardDelta}
      </>
    ),
  },
  {
    label: "Active Elixirs",
    value: formatCount(registryStats.activeElixirs),
    valueClass: "text-gold",
    hintClass: "text-gold",
    hint: (
      <>
        <IconFlask className="size-3.5" />
        {registryStats.newFormulas} new formulas registered
      </>
    ),
  },
  {
    label: "Pending Verifications",
    value: formatCount(registryStats.pendingVerifications),
    valueClass: "text-coral",
    hintClass: "text-coral",
    hint: (
      <>
        <IconAlertMark className="size-3.5" />
        {registryStats.pendingNote}
      </>
    ),
  },
] as const

export function StatCards() {
  return (
    <section aria-label="Registry totals" className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`${panelClass} flex h-full flex-col justify-between gap-4 p-6`}
        >
          <p className="text-[11px] font-medium tracking-[0.14em] text-secondary-light uppercase">
            {stat.label}
          </p>
          <p
            className={`text-[32px] leading-none font-medium tracking-tight ${stat.valueClass}`}
          >
            {stat.value}
          </p>
          <p
            className={`flex items-center gap-2 text-[12px] ${stat.hintClass}`}
          >
            {stat.hint}
          </p>
        </Card>
      ))}
    </section>
  )
}
