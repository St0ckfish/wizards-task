# Wizarding Registry Dashboard

A responsive, Figma-matched wizard registry built with React, TypeScript,
Tailwind CSS, shadcn/ui, Recharts, and TanStack Query.

## Features

- Static KPI cards and registry charts matching the supplied design
- Live data from the public
  [Wizard World API](https://wizard-world-api.herokuapp.com/Wizards)
- First- or last-name API search with a 400 ms debounce
- TanStack Query caching, cancellation, retry, and error handling
- Client-side pagination with 10 records per page
- Loading skeletons, empty results, and retryable error state
- Graceful `null` name handling
- Expandable elixir lists and API-backed member profile modals
- Responsive sidebar, table, and mobile navigation

## Run locally

Requirements: [Bun](https://bun.sh/) 1.0 or newer.

```bash
bun install
bun run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Quality checks

```bash
bun run lint
bun run build
```

## Project structure

- `src/api/wizards.ts` — typed API client and first/last-name search
- `src/hooks/use-debounced-value.ts` — reusable 400 ms search debounce
- `src/components/dashboard/` — cards, charts, table, and profile modal
- `src/data/dashboard.ts` — static KPI and chart data
- `src/components/ui/` — shadcn/ui primitives

## With more time

I would add component and browser tests for request cancellation, failed API
responses, and keyboard navigation; persist filters in the URL; virtualize very
large elixir lists; and add code splitting to reduce the initial JavaScript
bundle.
