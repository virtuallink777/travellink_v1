import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "./trpc";

export const trpc = createTRPCReact<AppRouter>({});

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
    }),
  ],
});
