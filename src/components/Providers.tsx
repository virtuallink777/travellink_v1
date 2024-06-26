'use client'

import React, { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/trpc/client'
import { httpBatchLink } from '@trpc/client'


const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
                fetch(url, opts) {
                    return fetch(url, {
                        ...opts,
                        credentials: 'include',
                    })
                }
            })
        ]
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
     <QueryClientProvider client={queryClient}>
        {children}
     </QueryClientProvider>
    </trpc.Provider>
  ) 
}

export default Providers
