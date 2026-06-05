import Card from "./Card";
import Sparkline from "./Sparkline";

export default function StatCard({ label, value, sub, icon, color, spark }) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              margin: 0,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: 26,
              fontWeight: 700,
              margin: "4px 0 0",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {value}
          </p>
          {sub && (
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>{sub}</p>
          )}
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: color + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i className={`ti ${icon}`} style={{ fontSize: 20, color }} />
        </div>
      </div>
      {spark && <Sparkline data={spark} color={color} />}
    </Card>
  );
}