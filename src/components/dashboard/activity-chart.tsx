import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { activitySeries } from "@/data/dashboard"
import { panelClass } from "@/lib/panel"

export function ActivityChart() {
  return (
    <Card className={`${panelClass} h-full`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[15px] font-medium tracking-tight">
          Registry Activity
        </CardTitle>
        <Badge
          variant="outline"
          className="h-6 rounded-full border-transparent bg-track px-2.5 text-[11px] font-normal text-foreground"
        >
          Last 30 Days
        </Badge>
      </CardHeader>
      <CardContent className="min-h-62 flex-1 pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[...activitySeries]}
            barCategoryGap="22%"
            margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fill: "var(--color-secondary-light)", fontSize: 12 }}
            />
            <YAxis hide domain={[0, 108]} ticks={[0, 36, 72, 108]} />
            <Tooltip
              cursor={{ fill: "rgb(208 188 255 / 14%)" }}
              contentStyle={{
                background: "#0d1c2d",
                border: "1px solid rgb(208 188 255 / 28%)",
                borderRadius: 12,
                fontSize: 12,
                color: "#d4e4fa",
                boxShadow: "0 0 20px 0 rgb(208 188 255 / 15%)",
              }}
              labelStyle={{ color: "#cbc3d7", marginBottom: 4 }}
              itemStyle={{ color: "#d0bcff" }}
              formatter={(value) => [value ?? 0, "Filings"]}
            />
            <Bar
              dataKey="value"
              fill="var(--color-bar)"
              activeBar={{ fill: "#d0bcff" }}
              radius={[7, 7, 0, 0]}
              maxBarSize={48}
              isAnimationActive={false}
            />
            {/* Drawn after the bars so the rules read over them, as in the design. */}
            <CartesianGrid
              vertical={false}
              stroke="var(--color-grid)"
              syncWithTicks
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
