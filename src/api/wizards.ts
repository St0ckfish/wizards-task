const WIZARDS_URL = "https://wizard-world-api.herokuapp.com/Wizards"

export type WizardElixir = {
  id: string
  name: string
}

export type Wizard = {
  id: string
  firstName: string | null
  lastName: string | null
  elixirs: WizardElixir[]
}

async function requestWizards(
  params: URLSearchParams,
  signal?: AbortSignal
): Promise<Wizard[]> {
  const url = new URL(WIZARDS_URL)
  url.search = params.toString()

  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`Unable to load wizards (${response.status})`)
  }

  return response.json() as Promise<Wizard[]>
}

function toTitleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

function matchesName(wizard: Wizard, query: string) {
  const haystack = [wizard.firstName, wizard.lastName, getWizardName(wizard)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

export async function fetchWizards(
  search: string,
  signal?: AbortSignal
): Promise<Wizard[]> {
  const query = search.trim()

  if (!query) {
    return requestWizards(new URLSearchParams(), signal)
  }

  // The public API is case-sensitive: "weasley" returns [], "Weas" matches.
  const titled = toTitleCase(query)
  const titledWords = titled.split(/\s+/)
  const searches = [
    new URLSearchParams({ FirstName: titled }),
    new URLSearchParams({ LastName: titled }),
  ]

  if (titledWords.length > 1) {
    searches.push(
      new URLSearchParams({
        FirstName: titledWords[0],
        LastName: titledWords.slice(1).join(" "),
      })
    )
  }

  const matches = await Promise.all(
    searches.map((params) => requestWizards(params, signal))
  )
  const unique = Array.from(
    new Map(matches.flat().map((wizard) => [wizard.id, wizard])).values()
  )

  if (unique.length > 0) return unique

  const all = await requestWizards(new URLSearchParams(), signal)
  return all.filter((wizard) => matchesName(wizard, query))
}

export function getWizardName(wizard: Pick<Wizard, "firstName" | "lastName">) {
  return [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown"
}
