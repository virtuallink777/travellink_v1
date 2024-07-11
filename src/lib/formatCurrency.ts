export function formatCurrency(amount: number | string): string {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(Number(amount));
}
