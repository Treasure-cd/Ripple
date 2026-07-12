import { createFileRoute } from '@tanstack/react-router'
import SignIn from '../components/SignIn'

export const Route = createFileRoute('/signin')({
  head: () => ({
    meta: [{ title: 'Ripple | Sign in' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SignIn />
}

