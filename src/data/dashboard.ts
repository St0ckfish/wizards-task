export type SpecialtySlice = {
  name: string
  value: number
  color: string
}

export const registryStats = {
  totalWizards: 1248,
  wizardDelta: "+4% from last moon",
  activeElixirs: 856,
  newFormulas: 24,
  pendingVerifications: 12,
  pendingNote: "Requires High-Council approval",
} as const

export const activitySeries = [
  { label: "Moon Start", value: 34 },
  { label: "", value: 54 },
  { label: "", value: 38 },
  { label: "", value: 78 },
  { label: "", value: 42 },
  { label: "Full Moon", value: 100 },
  { label: "", value: 64 },
  { label: "", value: 80 },
  { label: "", value: 30 },
  { label: "Moon End", value: 72 },
] as const

export const specialtyBreakdown: SpecialtySlice[] = [
  { name: "Alchemists", value: 45, color: "#d0bcff" },
  { name: "Transmuters", value: 30, color: "#ffb95f" },
  { name: "Conjurers", value: 25, color: "#bcc7dd" },
]
