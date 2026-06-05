export const COLORS = {
  emerald: "#10b981",
  amber:   "#f59e0b",
  rose:    "#f43f5e",
  indigo:  "#6366f1",
  sky:     "#0ea5e9",
  slate:   "#64748b",
};

export const fmt  = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const fmtN = (n) =>
  new Intl.NumberFormat("en-US").format(n);