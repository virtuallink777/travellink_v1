import React from "react";

interface FlightOfferProps {
  offer: any;
}

const FlightOffer: React.FC<FlightOfferProps> = ({ offer }) => {
  // Verificamos si los datos necesarios existen antes de acceder a ellos
  if (
    !offer.itineraries ||
    !offer.itineraries[0] ||
    !offer.itineraries[0].segments
  ) {
    return <div>Información de vuelo no disponible</div>;
  }

  const departure = offer.itineraries[0].segments[0].departure;
  const arrival =
    offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1]
      .arrival;

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          {departure.iataCode} → {arrival.iataCode}
        </h3>
        <span className="text-xl font-bold">
          {offer.price.total} {offer.price.currency}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        <p>Salida: {new Date(departure.at).toLocaleString()}</p>
        <p>Llegada: {new Date(arrival.at).toLocaleString()}</p>
        <p>Duración: {offer.itineraries[0].duration}</p>
        <p>Aerolínea: {offer.validatingAirlineCodes.join(", ")}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm">
          Asientos disponibles: {offer.numberOfBookableSeats}
        </p>
        <p className="text-sm">
          Última fecha para comprar: {offer.lastTicketingDate}
        </p>
      </div>
    </div>
  );
};

export default FlightOffer;
