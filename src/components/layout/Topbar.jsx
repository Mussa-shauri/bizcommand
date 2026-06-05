import { NAV } from "../../data/mockData";
import { COLORS } from "../../utils/helpers";

export default function Topbar({ page }) {
  const current = NAV.find((n) => n.id === page);

  return (
    <div
      style={{
        padding: "16px 28px",
        borderBottom: "1px solid var(--border)",
        background: "var(--card-bg)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexShrink: 0,
      }}
    >
      <div style={{ flex: 1 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {current?.label}
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div
          style={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <i className="ti ti-search" style={{ fontSize: 14, color: "var(--text-muted)" }} />
          <input
            placeholder="Quick search…"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "var(--text-primary)",
              width: 140,
            }}
          />
        </div>

        {/* Bell */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: COLORS.indigo + "22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="ti ti-bell" style={{ fontSize: 17, color: COLORS.indigo }} />
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: COLORS.indigo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>JD</span>
        </div>
      </div>
    </div>
  );
}