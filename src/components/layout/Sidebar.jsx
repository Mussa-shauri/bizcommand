import { NAV } from "../../data/mockData";

export default function Sidebar({ page, setPage, sidebarOpen, setSidebarOpen, dark, setDark }) {
  return (
    <div
      style={{
        width: sidebarOpen ? 240 : 64,
        background: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        transition: "width .25s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Logo row */}
      <div
        style={{
          padding: sidebarOpen ? "24px 20px 20px" : "24px 14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        {sidebarOpen && (
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
              BizCommand
            </p>
            <p
              style={{
                margin: "1px 0 0",
                fontSize: 10,
                color: "rgba(255,255,255,.4)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Management Suite
            </p>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          style={{
            background: "rgba(255,255,255,.06)",
            border: "none",
            borderRadius: 8,
            padding: 8,
            cursor: "pointer",
            color: "rgba(255,255,255,.6)",
            display: "flex",
            flexShrink: 0,
          }}
        >
          <i
            className={`ti ${sidebarOpen ? "ti-layout-sidebar-left-collapse" : "ti-layout-sidebar-left-expand"}`}
            style={{ fontSize: 18 }}
          />
        </button>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {NAV.map((n) => {
          const active = page === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              title={!sidebarOpen ? n.label : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: sidebarOpen ? "10px 12px" : "10px",
                borderRadius: 10,
                border: "none",
                background: active ? "rgba(99,102,241,.25)" : "transparent",
                color: active ? "#a5b4fc" : "rgba(255,255,255,.45)",
                cursor: "pointer",
                marginBottom: 2,
                fontWeight: active ? 700 : 500,
                fontSize: 13,
                textAlign: "left",
                transition: "all .15s",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <i
                className={`ti ${n.icon}`}
                style={{
                  fontSize: 18,
                  flexShrink: 0,
                  color: active ? "#818cf8" : "rgba(255,255,255,.35)",
                }}
              />
              {sidebarOpen && n.label}
            </button>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <button
          onClick={() => setDark((d) => !d)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: sidebarOpen ? "9px 12px" : "9px",
            borderRadius: 10,
            border: "none",
            background: "rgba(255,255,255,.05)",
            color: "rgba(255,255,255,.5)",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <i
            className={`ti ${dark ? "ti-sun" : "ti-moon"}`}
            style={{ fontSize: 17, flexShrink: 0 }}
          />
          {sidebarOpen && (dark ? "Light Mode" : "Dark Mode")}
        </button>
      </div>
    </div>
  );
}