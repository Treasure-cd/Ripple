import { mockUsers } from '../../data/mock'
import { Link } from '@tanstack/react-router'
import type { User } from '../../types/user'
import { Bolt } from 'lucide-react'

export default function List( { selected }: { selected: string[] }) {
  let filteredUsers = mockUsers.filter((user) =>
    user.skills.some((skill) => selected.includes(skill)),
  )
  if (filteredUsers.length <= 0) {
    filteredUsers = mockUsers
  }
  return (
    <div className="space-y-12 w-2/3">
      {filteredUsers.map((user: User) => (
        <div
          key={user.id}
          className="bg-card space-y-6 p-5 rounded-xl flex flex-col gap-3 hover:bg-neutral-700 transition-colors"
        >
          <div>
            <h2 className="font-medium text-2xl text-foreground mb-6">
              {user.name}
            </h2>
            <span className="bg-primary text-foreground px-3 rounded-full"><Bolt/> {user.credits} </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <h4 className="text-foreground min-w-full mb-2">Skills</h4>
            {user.skills.map((skill: string) => (
              <span
                key={skill}
                className="bg-sidebar mb-6 text-foreground px-3 py-1 text-sm rounded-lg"
              >
                {skill}
              </span>
            ))}
            <h4 className="w-full">Interested in</h4>
            {user.interests.map((int: string) => (
              <span className="text-accent-foreground" key={int}>
                {int}
              </span>
            ))}
          </div>
          <Link
            to="/user/$id"
            params={{ id: user.id }}
            className="bg-primary cursor-pointer text-neutral-900 font-medium py-2 text-center rounded-xl"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  )
}
