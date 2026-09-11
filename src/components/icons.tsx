import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** Four-point twinkle centred on (cx, cy) with the given point radius. */
function twinkle(cx: number, cy: number, r: number) {
  const w = r * 0.28
  return [
    `M${cx} ${cy - r}`,
    `C${cx} ${cy - w} ${cx + w} ${cy} ${cx + r} ${cy}`,
    `C${cx + w} ${cy} ${cx} ${cy + w} ${cx} ${cy + r}`,
    `C${cx} ${cy + w} ${cx - w} ${cy} ${cx - r} ${cy}`,
    `C${cx - w} ${cy} ${cx} ${cy - w} ${cx} ${cy - r}`,
    "Z",
  ].join(" ")
}

export function IconSparkles({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d={twinkle(9.5, 12, 6.5)} />
      <path d={twinkle(17.5, 7.5, 3.2)} />
      <path d={twinkle(17.5, 16.5, 3.2)} />
    </svg>
  )
}

export function IconDashboardGrid({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  )
}

export function IconUsers({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  )
}

export function IconFlask({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <path d="M10 2v6.5a1 1 0 0 1-.15.52L4.14 19A1.5 1.5 0 0 0 5.4 21h13.2a1.5 1.5 0 0 0 1.26-2L14.15 9.02A1 1 0 0 1 14 8.5V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  )
}

export function IconBook({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  )
}

export function IconTrendingUp({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </svg>
  )
}

export function IconAlertMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      strokeWidth={2.5}
      aria-hidden
      {...props}
    >
      <path d="M12 4v10" />
      <path d="M12 19.5h.01" />
    </svg>
  )
}

export function IconSettings({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

export function IconHelpCircle({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...strokeProps}
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}
