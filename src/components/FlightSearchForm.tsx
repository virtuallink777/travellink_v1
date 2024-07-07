import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import FlightOffer from "./FlightOffer";
import { convertToIATACode } from "@/lib/utils";

export default function FlightSearchForm() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const searchFlights = async () => {
    try {
      setError(null);
      setIsLoading(true);
      console.log("Iniciando búsqueda de vuelos...");

      if (!origin || !destination || !departureDate || !adults) {
        throw new Error("Por favor, complete todos los campos");
      }

      const originCode = convertToIATACode(origin);
      const destinationCode = convertToIATACode(destination);

      const params = new URLSearchParams({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: departureDate,
        adults: adults.toString(),
      });

      const response = await fetch("/api/searchFlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      console.log("Respuesta recibida, status:", response.status);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al buscar vuelos");
      }

      console.log("Respuesta procesada:", data);
      setFlights(data);
    } catch (error) {
      setError(error.message);
      console.error("Error al buscar vuelos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ciudad de Origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Ciudad de Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="mb-4 mr-4">
        <div className="mr-4">Cantidad de Adultos:</div>
        <input
          type="number"
          placeholder="Adultos"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          min={1}
        />
      </div>

      <div className="mb-4">
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>

      <Button
        onClick={searchFlights}
        className={cn(
          buttonVariants(),
          "hover:bg-blue-700 hover:text-yellow-300"
        )}
        disabled={isLoading}
      >
        {isLoading ? "Buscando..." : "Buscar Vuelos"}
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {flights.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Resultados de la búsqueda</h2>
          {flights.map((flight: any, index: number) => (
            <FlightOffer key={index} offer={flight} />
          ))}
        </div>
      ) : (
        <p className="mt-4">No se encontraron vuelos</p>
      )}
    </div>
  );
}
