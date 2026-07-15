import { filters } from '../../data/filters'

export default function Sidebar({
  selected,
  onSelect,
}: {
  selected: string[]
  onSelect: (filter: string) => void
}) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_rgba(15,17,20,0.06)] lg:w-80">
      <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Filters
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = selected.includes(filter)
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onSelect(filter)}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(93,111,255,0.18)]'
                  : 'border-border bg-secondary text-foreground hover:border-[color-mix(in_srgb,var(--primary)_24%,var(--border))] hover:bg-accent/40'
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
