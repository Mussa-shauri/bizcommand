import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Movement from "./pages/Movement";
import RiskPlanning from "./pages/RiskPlanning";
import { initProperties, initSales, initPurchases } from "./data/mockData";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [properties, setProperties] = useState(initProperties);
  const [sales, setSales] = useState(initSales);
  const [purchases, setPurchases] = useState(initPurchases);
  const [dark, setDark] = useState(false);

  const theme = {
    "--card-bg":     dark ? "#1e2231" : "#ffffff",
    "--bg":          dark ? "#131722" : "#f1f5f9",
    "--bg-subtle":   dark ? "#252b3b" : "#f8fafc",
    "--border":      dark ? "#2d3348" : "#e2e8f0",
    "--text-primary":dark ? "#f1f5f9" : "#0f172a",
    "--text-muted":  dark ? "#8892a4" : "#64748b",
    "--input-bg":    dark ? "#252b3b" : "#f8fafc",
    "--sidebar-bg":  dark ? "#0f1320" : "#0f172a",
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", ...theme, background: "var(--bg)", overflow: "hidden" }}>
      <Sidebar
        page={page} setPage={setPage}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        dark={dark} setDark={setDark}
      />
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar page={page} />
        <div style={{ padding: "28px", flex: 1 }}>
          {page === "dashboard"   && <Dashboard   properties={properties} sales={sales} purchases={purchases} />}
          {page === "properties"  && <Properties  properties={properties} setProperties={setProperties} />}
          {page === "sales"       && <Sales        sales={sales} setSales={setSales} />}
          {page === "purchases"   && <Purchases    purchases={purchases} setPurchases={setPurchases} />}
          {page === "movement"    && <Movement />}
          {page === "risk"        && <RiskPlanning />}
        </div>
      </div>
    </div>
  );
}