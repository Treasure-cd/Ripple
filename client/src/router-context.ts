import type { QueryClient } from '@tanstack/react-query'

import type { AuthContext } from '../lib/auth'

export type RouterContext = {
  queryClient: QueryClient
  auth: AuthContext
}
