import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.context<ExpressContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  searchFlights: publicProcedure
    .input(
      z.object({
        origin: z.string(),
        destination: z.string(),
        departureDate: z.string(),
        returnDate: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Aquí va la lógica para interactuar con la API de Amadeus
      const response = await fetch(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.AMADEUS_API_KEY}`,
          },

          body: JSON.stringify({
            origin: input.origin,
            destination: input.destination,
            departureDate: input.departureDate,
            returnDate: input.returnDate,
          }),
        }
      );

      const data = await response.json();
      return data;
    }),

  testQuery: publicProcedure.query(() => {
    return "TRPC is working!";
  }),
});

export type AppRouter = typeof appRouter;
