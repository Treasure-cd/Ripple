import { createFileRoute } from '@tanstack/react-router'
import SignUp from '../components/SignUp'

export const Route = createFileRoute('/signup')({
  head: () => ({
    meta: [{ title: 'Ripple | Sign up' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}

