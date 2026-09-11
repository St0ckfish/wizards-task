import { ChevronRight, FlaskConical, PenLine, Syringe } from "lucide-react"

import {
  getWizardName,
  type Wizard,
  type WizardElixir,
} from "@/api/wizards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ProfileBadge = {
  label: string
  tone: "lavender" | "gold"
}

type MemberProfileDialogProps = {
  wizard: Wizard | null
  onOpenChange: (open: boolean) => void
}

function BadgePill({ badge }: { badge: ProfileBadge }) {
  return (
    <Badge
      variant="outline"
      className={
        badge.tone === "gold"
          ? "h-7 rounded-full border-gold/20 bg-gold/10 px-3 text-[11px] font-medium text-gold"
          : "h-7 rounded-full border-lavender/20 bg-lavender/10 px-3 text-[11px] font-medium text-lavender"
      }
    >
      {badge.label}
    </Badge>
  )
}

function ElixirRow({ elixir }: { elixir: WizardElixir }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-[8px] bg-foreground/3 px-3 py-3 text-left transition-colors hover:bg-foreground/6"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-foreground/10 text-lavender">
        <Syringe className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] text-foreground">
          {elixir.name}
        </span>
        <span className="mt-0.5 block text-[12px] text-secondary-light">
          Registered elixir
        </span>
      </span>
      <ChevronRight className="size-4 text-secondary-light" />
    </button>
  )
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[13px] text-secondary-light">{label}</p>
      <p className="mt-1.5 text-[15px] leading-6 font-medium">{children}</p>
    </div>
  )
}

export function MemberProfileDialog({
  wizard,
  onOpenChange,
}: MemberProfileDialogProps) {
  const profile = wizard
    ? {
        displayName: getWizardName(wizard),
        registryCode: `WR-${wizard.id.slice(0, 8).toUpperCase()}`,
        givenName: wizard.firstName ?? "Unknown",
        familyName: wizard.lastName ?? "Unknown",
        status: "Active",
        specialty: "Not specified",
        portrait: "/portraits/cauldron.jpg",
        badges: [
          { label: "Registered Wizard", tone: "lavender" },
          { label: "Ministry Record", tone: "gold" },
        ] satisfies ProfileBadge[],
        associatedElixirs: wizard.elixirs,
      }
    : null

  return (
    <Dialog open={wizard !== null} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[min(92svh,760px)] w-[calc(100%-1.5rem)] max-w-[744px] gap-0 overflow-y-auto rounded-lg border border-hairline/30 bg-surface p-0 ring-0 sm:max-w-[744px]"
      >
        {profile ? (
          <>
            <DialogHeader className="gap-0 px-6 pt-6 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.16em] text-lavender uppercase">
                    Member Profile
                  </p>
                  <DialogTitle className="mt-2 text-[28px] leading-none font-medium tracking-tight">
                    {profile.displayName}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Registry record for {profile.displayName}
                  </DialogDescription>
                </div>
                <div className="sm:text-right">
                  <p className="text-[13px] text-secondary-light">Registry ID</p>
                  <p className="mt-2 text-[22px] leading-none font-medium tracking-tight text-gold">
                    {profile.registryCode}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:px-8">
              <div className="flex flex-col items-start gap-4">
                <img
                  src={profile.portrait}
                  alt=""
                  className="size-[180px] rounded-full object-cover ring-1 ring-lavender/25 shadow-[0_0_30px_0_rgb(208_188_255/12%)]"
                />
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge) => (
                    <BadgePill key={badge.label} badge={badge} />
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid gap-5 rounded-[8px] bg-[#081727] p-5 sm:grid-cols-2">
                  <DetailField label="First Name">{profile.givenName}</DetailField>
                  <DetailField label="Last Name">{profile.familyName}</DetailField>
                  <DetailField label="Registry Status">
                    <span className="flex items-center gap-2 text-gold">
                      <span className="size-2 rounded-full bg-gold" aria-hidden />
                      {profile.status}
                    </span>
                  </DetailField>
                  <DetailField label="Primary Specialty">
                    {profile.specialty}
                  </DetailField>
                </div>

                <section>
                  <h3 className="mb-3 flex items-center gap-2 text-[15px] font-medium">
                    <FlaskConical className="size-4 text-lavender" />
                    Associated Elixirs
                  </h3>
                  {profile.associatedElixirs.length > 0 ? (
                    <ul className="space-y-2">
                      {profile.associatedElixirs.map((elixir) => (
                        <li key={elixir.id}>
                          <ElixirRow elixir={elixir} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="rounded-[8px] bg-foreground/3 px-4 py-3 text-[13px] text-secondary-light">
                      None registered
                    </p>
                  )}
                </section>
              </div>
            </div>

            <DialogFooter className="mx-0 mb-0 rounded-b-lg border-t border-foreground/4 bg-transparent px-6 py-5 sm:px-8">
              <DialogClose
                render={
                  <Button
                    variant="ghost"
                    className="h-9 rounded-[8px] px-5 text-[13px] text-secondary-light hover:text-foreground"
                  />
                }
              >
                Close
              </DialogClose>
              <Button
                type="button"
                className="h-9 rounded-[8px] bg-lavender px-5 text-[13px] font-medium text-primary-foreground shadow-elixir hover:bg-lavender/90 active:bg-lavender/80"
              >
                <PenLine className="size-3.5" data-icon="inline-start" />
                Edit Record
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
