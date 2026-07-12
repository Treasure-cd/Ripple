import { createFileRoute } from '@tanstack/react-router'
import List from '#/components/List'
import Sidebar from '#/components/Sidebar'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/discover')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selected, setSelected] = useState<string[]>([])

  const onSelect = (filter: string): void => {
    setSelected((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    )
  }

  return (
    <div className="p-12">
      <h1 className="text-4xl font-semibold mb-8">
        Welcome to the discover page
      </h1>

      <section className="flex gap-18">
        <Sidebar selected={selected} onSelect={onSelect} />
        <List selected={selected} />
      </section>
    </div>
  )
}
