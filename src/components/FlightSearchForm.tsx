import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import FlightOffer from "./FlightOffer";

export default function FlightSearchForm() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  const searchFlights = async () => {
    try {

      setError(null); // Reinicia el estado de error
      console.log("Iniciando busqueda de vuelos...");

      // Obtiene la fecha de manana
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      const params = new URLSearchParams({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: formattedDate, // Asegúrate de que esta fecha sea futura
        adults: '2',
      });
  
      const response = await fetch('/api/searchFlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      console.log("Respuesta recibida, status:", response.status);

      const data = await response.json();
      console.log("Respuesta procesada:", data);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al buscar vuelos');
      }
  
  
      setFlights(data);
      console.log("Vuelos establecidos en el estado");
    } catch (error: any) {
      setError(error.message);
      console.error("Error detallado:", error);
    }
  };
  return (
    <div>
      <Button
        onClick={searchFlights}
        className={cn(
          buttonVariants(),
          "hover:bg-blue-700 hover:text-yellow-300"
        )}
      >
        Buscar Vuelos
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