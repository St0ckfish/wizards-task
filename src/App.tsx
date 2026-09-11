import { ActivityChart } from "@/components/dashboard/activity-chart"
import { SpecialtyChart } from "@/components/dashboard/specialty-chart"
import { StatCards } from "@/components/dashboard/stat-cards"
import { WizardTable } from "@/components/dashboard/wizard-table"
import { AppShell } from "@/components/layout/app-shell"

export default function App() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header className="space-y-1.5">
          <h1 className="text-[28px] leading-tight font-medium tracking-tight text-foreground">
            Wizarding Registry Dashboard
          </h1>
          <p className="text-[13px] text-muted-foreground">
            Overseeing the mystical equilibrium across all magical realms.
          </p>
        </header>

        <StatCards />

        <section
          aria-label="Registry charts"
          className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]"
        >
          <ActivityChart />
          <SpecialtyChart />
        </section>

        <WizardTable />
      </div>
    </AppShell>
  )
}
