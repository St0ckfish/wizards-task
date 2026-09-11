import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { specialtyBreakdown } from "@/data/dashboard"
import { panelClass } from "@/lib/panel"

export function SpecialtyChart() {
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
          role="img"
          aria-label="Wizards by specialty: Alchemists 45%, Transmuters 30%, Conjurers 25%"
        >
          <div
            aria-hidden
            className="size-full rounded-full border-16 border-track"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[22px] leading-none font-medium tracking-tight">
              1.2k
            </p>
            <p className="mt-1 text-[11px] text-secondary-light">Total</p>
          </div>
        </div>

        <ul className="mt-6 space-y-2.5">
          {specialtyBreakdown.map((slice) => (
            <li
              key={slice.name}
              className="flex items-center justify-between text-[13px]"
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
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
