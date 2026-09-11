export function formatRegistryId(id: string) {
  const compact = id.replaceAll("-", "")
  return `${compact.slice(0, 8)}...${compact.slice(-6)}`
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value)
}

export function displayName(value: string | null) {
  return value ?? "(None)"
}
