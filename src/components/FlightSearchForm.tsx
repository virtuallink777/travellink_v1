import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import FlightOffer from "./FlightOffer";
import { convertToIATACode } from "@/lib/utils";
import { cityColMap } from "@/lib/utils";
import ButtonSpecial from "./ButtonSpecial";

export default function FlightSearchForm() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    string[]
  >([]);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<"go" | "goAndBack" | null>(
    null
  );
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const [hasSearched, setHasSearched] = useState(false);

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
      setHasSearched(true);
      console.log("Iniciando búsqueda de vuelos...");

      if (!origin || !destination || !departureDate || !adults) {
        throw new Error("Por favor, complete todos los campos");
      }

      if (origin === destination) {
        throw new Error("El origen y el destino no pueden ser iguales");
      }

      if (selectedType === "goAndBack") {
        if (!returnDate) {
          throw new Error("Por favor, complete la fecha de regreso");
        }
        const departureDateObj = new Date(departureDate);
        const returnDateObj = new Date(returnDate);
        if (departureDateObj > returnDateObj) {
          throw new Error(
            "La fecha de regreso debe ser posterior a la fecha de ida"
          );
        }
      }

      if (selectedType !== "goAndBack" && selectedType !== "go") {
        throw new Error(
          "Debe seleccionar el tipo de viaje (ida o ida y vuelta)"
        );
      }

      const originCode = convertToIATACode(origin);
      const destinationCode = convertToIATACode(destination);

      const params = new URLSearchParams({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: departureDate,
        adults: adults.toString(),
        children: children.toString(),
        infants: infants.toString(),
        travelClass: travelClass,
      });

      // incluir returnDate si el viaje es de ida y vuelta

      if (selectedType === "goAndBack" && returnDate) {
        params.append("returnDate", returnDate);
      }

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
    } catch (error: any) {
      setError(error.message);
      console.error("Error al buscar vuelos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="w-full mb-6 flex justify-center space-x-4">
          <div>
            <ButtonSpecial
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="mr-4 w-1/3">Clase:</label>
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-2/3 p-2 border rounded"
            >
              <option value="ECONOMY">ECONOMICA</option>
              <option value="PREMIUM_ECONOMY">PREMIUM ECONOMICA</option>
              <option value="BUSINESS">BUSINESS</option>
              <option value="FIRST">PRIMERA CLASE</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full mb-6">
          <div className="flex items-center mb-4 relative" ref={originRef}>
            <label className="mr-4 w-1/3">Ciudad de Origen:</label>
            <input
              type="text"
              placeholder="Ciudad de Origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-2/3 p-2 border rounded"
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

          <div className="flex items-center mb-4 relative" ref={destinationRef}>
            <label className="mr-4 w-1/3">Ciudad de Destino:</label>
            <input
              type="text"
              placeholder="Ciudad de Destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-2/3 p-2 border rounded"
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

          <div className="flex items-center mb-4">
            <label className="mr-4 w-1/3">Cantidad de Adultos:</label>
            <input
              type="number"
              placeholder="Adultos"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              min={1}
              className="w-2/3 p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="mr-4 w-1/3">Cantidad de Niños:</label>
            <input
              type="number"
              placeholder="Niños"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              min={0}
              className="w-2/3 p-2 border rounded"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="mr-4 w-1/3">
              Cantidad de Niños Menores de 2 años:
            </label>
            <input
              type="number"
              placeholder="Infantes"
              value={infants}
              onChange={(e) => setInfants(Number(e.target.value))}
              min={0}
              className="w-2/3 p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="mr-4 w-1/3">Fecha de Salida:</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-2/3 p-2 border rounded"
            />
          </div>

          {selectedType !== "go" ? (
            <div className="flex items-center mb-4">
              <label className="mr-4 w-1/3">Fecha de llegada:</label>

              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-2/3 p-2 border rounded"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-1">
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
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {hasSearched && flights.length > 0 ? (
          <div className="mt-4 w-full">
            <h2 className="text-2xl font-bold mb-4">
              Resultados de la búsqueda
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flights.map((flight, index) => (
                <FlightOffer key={index} offer={flight} />
              ))}
            </div>
          </div>
        ) : hasSearched && flights.length === 0 ? (
          <p className="mt-4">No se han encontraron vuelos aun</p>
        ) : null}
      </div>
    </>
  );
}
