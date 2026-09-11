import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { specialtyBreakdown } from "@/data/dashboard"
import { panelClass } from "@/lib/panel"

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function SpecialtyChart() {
  const [activeName, setActiveName] = useState<string | null>(null)
  const active = specialtyBreakdown.find((slice) => slice.name === activeName)

  return (
    <Card className={`${panelClass} h-full`}>
      <CardHeader>
        <CardTitle className="text-[15px] font-medium tracking-tight">
          Wizards by Specialty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="relative mx-auto aspect-square w-full max-w-49"
          onMouseLeave={() => setActiveName(null)}
        >
          <svg
            viewBox="0 0 100 100"
            className="size-full -rotate-90"
            role="img"
            aria-label="Wizards by specialty: Alchemists 45%, Transmuters 30%, Conjurers 25%"
          >
            {specialtyBreakdown.map((slice, index) => {
              const start = specialtyBreakdown
                .slice(0, index)
                .reduce((sum, item) => sum + item.value, 0)
              const length = (slice.value / 100) * CIRCUMFERENCE
              const isActive = activeName === slice.name
              const dimmed = activeName !== null && !isActive

              return (
                <circle
                  key={slice.name}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={isActive ? 14 : 10}
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-(start / 100) * CIRCUMFERENCE}
                  strokeLinecap="butt"
                  className="origin-center cursor-pointer transition-[stroke-width,opacity] duration-150"
                  opacity={dimmed ? 0.28 : 1}
                  onMouseEnter={() => setActiveName(slice.name)}
                />
              )
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {active ? (
              <>
                <p
                  className="text-[22px] leading-none font-medium tracking-tight"
                  style={{ color: active.color }}
                >
                  {active.value}%
                </p>
                <p className="mt-1 text-[11px] text-secondary-light">
                  {active.name}
                </p>
              </>
            ) : (
              <>
                <p className="text-[22px] leading-none font-medium tracking-tight">
                  1.2k
                </p>
                <p className="mt-1 text-[11px] text-secondary-light">Total</p>
              </>
            )}
          </div>
        </div>

        <ul className="mt-6 space-y-2.5">
          {specialtyBreakdown.map((slice) => {
            const isActive = activeName === slice.name
            return (
              <li
                key={slice.name}
                className={`flex cursor-pointer items-center justify-between rounded-md px-1 py-0.5 text-[13px] transition-colors ${
                  isActive ? "bg-white/5" : "hover:bg-white/4"
                }`}
                onMouseEnter={() => setActiveName(slice.name)}
                onMouseLeave={() => setActiveName(null)}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: slice.color }}
                    aria-hidden
                  />
                  {slice.name}
                </span>
                <span className="text-secondary-light">{slice.value}%</span>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
