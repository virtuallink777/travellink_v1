// obtener la tasa de cambio de EUR a COP
export async function getExchangeRate() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/EUR"
  );
  const data = await response.json();

  return data.rates.COP;
}

// CONVERTIDOS DE PRECIOS

export function convertEURtoCOP(
  eurAmount: number,
  exchangeRate: number
): string {
  return (eurAmount * exchangeRate).toFixed(2);
}
