import type { NextApiRequest, NextApiResponse } from "next";
import Amadeus from "amadeus";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY as string,
  clientSecret: process.env.AMADEUS_API_SECRET as string,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Recibida solicitud POST en /api/searchFlights");
    console.log("Cuerpo de la solicitud:", req.body);

    try {
      const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
      } = req.body;

      console.log("Realizando solicitud a Amadeus API...");

      const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults: adults.toString(),
        max: "10", // Se pueden agregar mas solicitudes
      });

      console.log("Respuesta recibida de Amadeus API");

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Error al buscar vuelos:", error);
      res.status(400).json({
        error: error.description?.[0]?.detail || "Error al buscar vuelos",
        code: error.description?.[0]?.code,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
