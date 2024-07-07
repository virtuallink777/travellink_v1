import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.context<ExpressContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  testQuery: publicProcedure.query(() => {
    return "TRPC is working!";
  }),
});

export type AppRouter = typeof appRouter;
