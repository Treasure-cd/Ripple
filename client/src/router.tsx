import { createRouter } from '@tanstack/react-router'

import { getAuthContext } from '../lib/auth'
import { queryClient } from '../lib/query-client'
import { routeTree } from './routeTree.gen'
import type { RouterContext } from './router-context'

export function getRouter() {
  const context = {
    queryClient,
    auth: getAuthContext(),
  } satisfies RouterContext

  return createRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
