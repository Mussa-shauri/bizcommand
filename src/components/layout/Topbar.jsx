import { NAV } from "../../data/mockData";
import { COLORS } from "../../utils/helpers";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ page }) {
  const current = NAV.find((n) => n.id === page);
  const { currentUser, logout } = useAuth();

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
      {/* Page title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>
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

        {/* User avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: COLORS.indigo,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
              {currentUser?.initials || "?"}
            </span>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-primary)",
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {currentUser?.fullName || ""}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          title="Sign out"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--bg-subtle)",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fee2e2";
            e.currentTarget.style.color = "#f43f5e";
            e.currentTarget.style.borderColor = "#fca5a5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-subtle)";
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <i className="ti ti-logout" style={{ fontSize: 16 }} />
          Logout
        </button>
      </div>
    </div>
  );
}