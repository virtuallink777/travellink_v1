import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";

interface Flight {
  flightNumber: string;
  price: string;
}

const FlightSearchForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const searchFlightsMutation = trpc.searchFlights.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    searchFlightsMutation.mutate({
      origin,
      destination,
      departureDate,
      returnDate,
    });
  };

  return (
    <div className="container relative flex pt-20 flex-col lg:px-0">
      <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-2xl font-bold">Busqueda de Vuelos</h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <input
                  className="focus-visible:ring-red-500 bg-cyan-200"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Origen"
                />
                <input
                  className="focus-visible:ring-red-500 bg-cyan-200"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destino"
                />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  placeholder="Fecha de salida"
                />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  placeholder="Fecha de regreso"
                />
                <Button
                  className={cn(
                    buttonVariants(),
                    "hover:bg-blue-700 hover:text-yellow-300"
                  )}
                  type="submit"
                >
                  Buscar vuelos
                </Button>
              </div>
            </div>
          </form>
          {searchFlightsMutation.isLoading && (
            <p className="text-red-500">Buscando vuelos...</p>
          )}
          {searchFlightsMutation.isError && (
            <p className="text-red-500">
              Error al buscar vuelos: {searchFlightsMutation.error.message}
            </p>
          )}
          {searchFlightsMutation.isSuccess && (
            <ul>
              {searchFlightsMutation.data.map(
                (flight: Flight, index: number) => (
                  <li key={index}>
                    {flight.flightNumber} - {flight.price}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
