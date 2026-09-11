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

export async function fetchWizards(
  search: string,
  signal?: AbortSignal
): Promise<Wizard[]> {
  const query = search.trim()

  if (!query) {
    return requestWizards(new URLSearchParams(), signal)
  }

  const words = query.split(/\s+/)
  const searches =
    words.length > 1
      ? [
          new URLSearchParams({ FirstName: query }),
          new URLSearchParams({ LastName: query }),
          new URLSearchParams({
            FirstName: words[0],
            LastName: words.slice(1).join(" "),
          }),
        ]
      : [
          new URLSearchParams({ FirstName: query }),
          new URLSearchParams({ LastName: query }),
        ]

  const matches = await Promise.all(
    searches.map((params) => requestWizards(params, signal))
  )

  return Array.from(
    new Map(matches.flat().map((wizard) => [wizard.id, wizard])).values()
  )
}

export function getWizardName(wizard: Pick<Wizard, "firstName" | "lastName">) {
  return [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown"
}
