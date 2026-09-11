import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ListFilter,
  LoaderCircle,
  Search,
} from "lucide-react"

import {
  fetchWizards,
  getWizardName,
  type Wizard,
  type WizardElixir,
} from "@/api/wizards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MemberProfileDialog } from "@/components/dashboard/member-profile-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { formatCount, formatRegistryId } from "@/lib/format"
import { panelClass } from "@/lib/panel"

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20] as const

const TABLE_COLUMNS = [
  { heading: "ID", width: "w-[18%]" },
  { heading: "Wizard Name", width: "w-[22%]" },
  { heading: "Elixirs", width: "w-[12%]" },
  { heading: "Associated Elixirs", width: "w-[36%]" },
  { heading: "Actions", width: "w-[12%]" },
] as const

const headClass =
  "h-12 px-4 text-[11px] font-medium tracking-[0.14em] text-secondary-light uppercase lg:px-6"

function ElixirCell({
  elixirs,
  expanded,
  onToggle,
}: {
  elixirs: WizardElixir[]
  expanded: boolean
  onToggle: () => void
}) {
  if (elixirs.length === 0) {
    return <span className="text-secondary-light/50">None registered</span>
  }

  const visibleElixirs = expanded ? elixirs : elixirs.slice(0, 2)

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleElixirs.map((elixir) =>
        elixirs.length === 1 ? (
          <Badge
            key={elixir.id}
            variant="outline"
            className="h-auto max-w-full rounded-2xl border-[#41361b] bg-[#1c2220] px-2.5 py-1 text-[11px] leading-4 font-normal whitespace-normal text-gold sm:max-w-60"
          >
            {elixir.name}
          </Badge>
        ) : (
          <Badge
            key={elixir.id}
            variant="outline"
            className="h-auto max-w-full rounded-full border-[#2a2b58] bg-[#151e3a] px-2.5 py-1 text-[11px] leading-4 font-normal whitespace-normal text-[#c6b6ff] sm:max-w-48"
          >
            {elixir.name}
          </Badge>
        )
      )}
      {elixirs.length > 2 ? (
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full px-2 py-1 text-[11px] text-secondary-light transition-colors hover:bg-white/5 hover:text-foreground"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `+${elixirs.length - 2} more`}
        </button>
      ) : null}
    </div>
  )
}

export function WizardTable() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10)
  const [selected, setSelected] = useState<Wizard | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const debouncedQuery = useDebouncedValue(query, 400)

  const {
    data: wizards = [],
    error,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["wizards", debouncedQuery.trim()],
    queryFn: ({ signal }) => fetchWizards(debouncedQuery, signal),
  })

  const pageCount = Math.max(1, Math.ceil(wizards.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visible = wizards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const start = wizards.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = (currentPage - 1) * pageSize + visible.length
  const pagesToShow = useMemo(() => {
    const first = Math.max(1, Math.min(currentPage - 1, pageCount - 2))
    return Array.from(
      { length: Math.min(3, pageCount) },
      (_, index) => first + index
    )
  }, [currentPage, pageCount])

  function toggleElixirs(wizardId: string) {
    setExpandedRows((current) => {
      const next = new Set(current)
      if (next.has(wizardId)) next.delete(wizardId)
      else next.add(wizardId)
      return next
    })
  }

  const statusMessage = isError ? (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <p className="text-[13px] text-coral">
        {error instanceof Error ? error.message : "Unable to load wizards"}
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => void refetch()}
        className="border-white/10"
      >
        Try again
      </Button>
    </div>
  ) : !isPending && visible.length === 0 ? (
    <p className="px-4 py-16 text-center text-[13px] text-secondary-light">
      No wizards found
      {debouncedQuery ? ` for “${debouncedQuery}”` : ""}. Try a first or last
      name like Fred, Weasley, or Potter.
    </p>
  ) : null

  return (
    <Card className={`${panelClass} max-sm:[--card-spacing:--spacing(4)]`}>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-[15px] font-medium tracking-tight">
          Master Wizard Registry
        </CardTitle>

        <div className="flex h-10 w-full min-w-0 items-center rounded-[10px] border border-input bg-card/90 sm:max-w-76">
          <label className="relative flex min-w-0 flex-1 items-center">
            <span className="sr-only">Search wizards</span>
            <Search className="pointer-events-none absolute left-3 size-3.5 text-secondary-light" />
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
                setExpandedRows(new Set())
              }}
              placeholder="Search by name..."
              aria-label="Search wizards by first or last name"
              className="h-10 min-w-0 rounded-none border-0 bg-transparent pr-2 pl-9 text-[13px] placeholder:text-secondary-light/50 focus-visible:ring-0 dark:bg-transparent"
            />
            {isFetching ? (
              <LoaderCircle
                className="absolute right-2 size-3.5 animate-spin text-secondary-light"
                aria-label="Updating results"
              />
            ) : null}
          </label>
          <span aria-hidden className="h-4 w-px shrink-0 bg-input" />
          <Button
            type="button"
            variant="ghost"
            className="h-10 shrink-0 rounded-none rounded-r-[10px] px-2.5 text-[13px] font-normal text-secondary-light hover:text-foreground sm:px-3"
          >
            <ListFilter className="size-3.5" data-icon="inline-start" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        {statusMessage}

        {isPending ? (
          <>
            <div className="space-y-3 px-4 md:hidden">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={`mobile-loading-${index}`}
                  className="space-y-3 rounded-lg border border-hairline/30 p-4"
                >
                  <Skeleton className="h-4 w-40 bg-white/8" />
                  <Skeleton className="h-3 w-28 bg-white/8" />
                  <Skeleton className="h-6 w-48 bg-white/8" />
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              <Table className="min-w-180">
                <TableHeader>
                  <TableRow className="border-transparent bg-card hover:bg-card">
                    {TABLE_COLUMNS.map((column) => (
                      <TableHead key={column.heading} className={headClass}>
                        {column.heading}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }, (_, index) => (
                    <TableRow
                      key={`loading-${index}`}
                      className="border-foreground/3"
                    >
                      {Array.from({ length: 5 }, (_, cell) => (
                        <TableCell key={cell} className="h-16 px-4 lg:px-6">
                          <Skeleton className="h-3 w-full max-w-32 bg-white/8" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : null}

        {!isPending && !isError && visible.length > 0 ? (
          <>
            <ul className="space-y-3 px-4 md:hidden">
              {visible.map((wizard) => (
                <li
                  key={wizard.id}
                  className="rounded-lg border border-hairline/30 bg-foreground/2 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium">
                        {getWizardName(wizard)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-lavender">
                        {formatRegistryId(wizard.id)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0 text-secondary-light hover:text-foreground"
                      aria-label={`View ${getWizardName(wizard)}`}
                      onClick={() => setSelected(wizard)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </div>
                  <p className="mt-3 text-[12px] text-secondary-light">
                    {wizard.elixirs.length}{" "}
                    {wizard.elixirs.length === 1 ? "elixir" : "elixirs"}
                  </p>
                  <div className="mt-2">
                    <ElixirCell
                      elixirs={wizard.elixirs}
                      expanded={expandedRows.has(wizard.id)}
                      onToggle={() => toggleElixirs(wizard.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Table className="min-w-180">
                <TableHeader>
                  <TableRow className="border-transparent bg-card hover:bg-card">
                    {TABLE_COLUMNS.map((column) => (
                      <TableHead
                        key={column.heading}
                        className={`${headClass} ${column.width}`}
                      >
                        {column.heading}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((wizard) => (
                    <TableRow
                      key={wizard.id}
                      className="border-foreground/3 hover:bg-foreground/2"
                    >
                      <TableCell className="px-4 py-4 font-mono text-[12px] text-lavender lg:px-6">
                        {formatRegistryId(wizard.id)}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[13px] font-medium whitespace-normal lg:px-6">
                        {getWizardName(wizard)}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[13px] text-secondary-light lg:px-6">
                        {wizard.elixirs.length}
                      </TableCell>
                      <TableCell className="px-4 py-4 whitespace-normal lg:px-6">
                        <ElixirCell
                          elixirs={wizard.elixirs}
                          expanded={expandedRows.has(wizard.id)}
                          onToggle={() => toggleElixirs(wizard.id)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-4 lg:px-6">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 text-secondary-light hover:text-foreground"
                          aria-label={`View ${getWizardName(wizard)}`}
                          onClick={() => setSelected(wizard)}
                        >
                          <Eye className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t-0 bg-foreground/4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <p className="text-[12px] text-secondary-light">
            {isPending
              ? "Loading wizard records..."
              : `Showing ${start}-${end} of ${formatCount(wizards.length)} Records`}
          </p>
          <div className="flex items-center gap-2 text-[12px] text-secondary-light">
            <span id="rows-per-page-label">Rows</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                if (!value) return
                setPageSize(Number(value) as (typeof PAGE_SIZE_OPTIONS)[number])
                setPage(1)
              }}
            >
              <SelectTrigger
                size="sm"
                aria-labelledby="rows-per-page-label"
                className="min-w-16 bg-card"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start" alignItemWithTrigger={false}>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Pagination className="mx-0 w-full justify-center sm:w-auto sm:justify-end">
          <PaginationContent>
            <PaginationItem>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-secondary-light disabled:opacity-30"
                disabled={isPending || currentPage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            {pagesToShow.map((item) => (
              <PaginationItem key={item}>
                <PaginationLink
                  href={`#registry-page-${item}`}
                  isActive={item === currentPage}
                  onClick={(event) => {
                    event.preventDefault()
                    if (item <= pageCount) setPage(item)
                  }}
                  className={
                    item === currentPage
                      ? "size-8 rounded-[10px] border-transparent bg-lavender! font-medium text-primary-foreground hover:bg-lavender/90!"
                      : "size-8 rounded-[10px] border-transparent bg-transparent text-secondary-light"
                  }
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-secondary-light disabled:opacity-30"
                disabled={isPending || currentPage === pageCount}
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>

      <MemberProfileDialog
        wizard={selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      />
    </Card>
  )
}
