import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import FlightOffer from "./FlightOffer";
import { convertToIATACode } from "@/lib/utils";
import { cityColMap } from "@/lib/utils";

export default function FlightSearchForm() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (origin) {
      const filteredCities = Object.keys(cityColMap)
        .filter((city) => city.toLowerCase().includes(origin.toLowerCase()))
        .slice(0, 5);
      setOriginSuggestions(filteredCities);
    } else {
      setOriginSuggestions([]);
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      const filteredCities = Object.keys(cityColMap)
        .filter((city) =>
          city.toLowerCase().includes(destination.toLowerCase())
        )
        .slice(0, 5);
      setDestinationSuggestions(filteredCities);
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        originRef.current &&
        !originRef.current.contains(event.target as Node)
      ) {
        setOriginSuggestions([]);
      }
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target as Node)
      ) {
        setDestinationSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectCity = (city: string, type: "origin" | "destination") => {
    if (type === "origin") {
      setOrigin(city);
      setOriginSuggestions([]);
    } else {
      setDestination(city);
      setDestinationSuggestions([]);
    }
  };

  const searchFlights = async () => {
    try {
      setError(null);
      setIsLoading(true);
      console.log("Iniciando búsqueda de vuelos...");

      if (!origin || !destination || !departureDate || !adults) {
        throw new Error("Por favor, complete todos los campos");
      }

      if (origin === destination) {
        throw new Error("El origen y el destino no pueden ser iguales");
      }

      const originCode = convertToIATACode(origin);
      const destinationCode = convertToIATACode(destination);

      const params = new URLSearchParams({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: departureDate,
        adults: adults.toString(),
        kids: kids.toString(),
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
      <div className="mb-4 relative" ref={originRef}>
        <input
          type="text"
          placeholder="Ciudad de Origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {originSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
            {originSuggestions.map((city) => (
              <li
                key={city}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => selectCity(city, "origin")}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 relative" ref={destinationRef}>
        <input
          type="text"
          placeholder="Ciudad de Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {destinationSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
            {destinationSuggestions.map((city) => (
              <li
                key={city}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => selectCity(city, "destination")}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 mr-4">
        <div className="mr-4">Cantidad de Adultos:</div>
        <input
          type="number"
          placeholder="Adultos"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          min={1}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4 mr-4">
        <div className="mr-4">Cantidad de Niños:</div>
        <input
          type="number"
          placeholder="Niños"
          value={kids}
          onChange={(e) => setKids(Number(e.target.value))}
          min={0}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-full p-2 border rounded"
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
