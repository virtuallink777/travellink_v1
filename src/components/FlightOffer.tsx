import React, { useEffect, useState } from "react";
import formatDuration from "@/lib/parseDuration";
import { convertEURtoCOP, getExchangeRate } from "@/lib/getExchangeRate";
import { formatCurrency } from "@/lib/formatCurrency";

interface FlightOfferProps {
  offer: any;
}

const FlightOffer: React.FC<FlightOfferProps> = ({ offer }) => {
  const [copPrice, setCopPrice] = useState("");

  useEffect(() => {
    async function convertPrice() {
      const rate = await getExchangeRate();
      const convertedPrice = convertEURtoCOP(offer.price.total, rate);
      setCopPrice(convertedPrice);
    }
    convertPrice();
  }, [offer.price.total]);

  if (!offer.itineraries || offer.itineraries.length === 0) {
    return <div>Información de vuelo no disponible</div>;
  }

  const renderItinerary = (itinerary: any, index: number) => {
    const departure = itinerary.segments[0].departure;
    const arrival = itinerary.segments[itinerary.segments.length - 1].arrival;

    return (
      <div key={index} className="mb-4">
        <h4 className="font-semibold">
          {index === 0 ? "Vuelo de ida" : "Vuelo de vuelta"}
        </h4>
        <p>
          {departure.iataCode} → {arrival.iataCode}
        </p>
        <p>Salida: {new Date(departure.at).toLocaleString()}</p>
        <p>Llegada: {new Date(arrival.at).toLocaleString()}</p>
        <p>Duración: {formatDuration(itinerary.duration)}</p>
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-4 shadow-md h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          {offer.itineraries[0].segments[0].departure.iataCode} ↔{" "}
          {
            offer.itineraries[0].segments[
              offer.itineraries[0].segments.length - 1
            ].arrival.iataCode
          }
        </h3>
        <span className="text-xl font-bold">
          {copPrice
            ? `${formatCurrency(copPrice)} COP`
            : `${formatCurrency(offer.price.total)} ${offer.price.currency}`}
        </span>
      </div>
      {offer.itineraries.map(renderItinerary)}
      <div className="text-sm text-gray-600">
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
