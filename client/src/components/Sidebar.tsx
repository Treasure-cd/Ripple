import { filters } from '../../data/filters'

export default function Sidebar({
  selected,
  onSelect,
}: {
  selected: string[]
  onSelect: (filter: string) => void
}) {
  return (
    <aside className="bg-sidebar rounded-xl w-1/3 h-fit">
      <h3 className="px-6 py-4">Filters</h3>
      <div className="h-0.5 w-full bg-sidebar-foreground/50" />
      <div className="flex flex-wrap gap-4 px-6 py-4">
        {filters.map((filter) => {
          const isActive = selected.includes(filter)
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onSelect(filter)}
              aria-pressed={isActive}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-sidebar-foreground/10 text-sidebar-foreground hover:bg-sidebar-foreground/20'
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
