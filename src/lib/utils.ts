import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cityColMap: { [key: string]: string } = {
  ARMENIA: "AXM",
  BUCARAMANGA: "BGA",
  BOGOTA: "BOG",
  BARRANQUILLA: "BAQ",
  CARTAGENA: "CTG",
  CALI: "CLO",
  CUCUTA: "CUC",
  TUMACO: "TCO",
  COROZAL: "CZU",
  BARRANCABERMEJA: "EJA",
  FLORENCIA: "FLA",
  CARTAGO: "CRC",
  GUAPI: "GPI",
  GUAYMARAL: "GYM",
  IBAGUE: "IBE",
  IPIALES: "IPI",
  CAREPA: "APO",
  MANIZALES: "MZL",
  LETICIA: "LET",
  MEDELLIN: "MDE",
  MONTERIA: "MTR",
  MITU: "MVP",
  NEIVA: "NVA",
  PUERTOCARRENO: "PCR",
  PEREIRA: "PEI",
  PITALITO: "PTX",
  POPAYAN: "PPN",
  PASTO: "PSO",
  SANTANDER: "SNT",
  SANANDRES: "ADZ",
  VILLAVICENCIO: "VVC",
};

export function convertToIATACode(cityName: string): string {
  const normalizedCityName = cityName.trim().toUpperCase();
  for (const [city, code] of Object.entries(cityColMap)) {
    if (city.toUpperCase() === normalizedCityName) {
      return code;
    }
  }

  throw new Error(`City not found: ${cityName}`);

  return cityName.toUpperCase();
}
