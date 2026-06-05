import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { fmt, fmtN, COLORS } from "../utils/helpers";
import { movements } from "../data/mockData";

const TYPE_COLORS = {
  "Sale":          COLORS.emerald,
  "Sale Closed":   COLORS.emerald,
  "Tenant Move-In":COLORS.sky,
  "Maintenance":   COLORS.rose,
  "New Listing":   COLORS.indigo,
};

export default function Movement() {
  const counters = [
    { label: "Total Events",      value: fmtN(movements.length),                                        color: COLORS.indigo },
    { label: "Completed",         value: fmtN(movements.filter((m) => m.status === "Completed").length), color: COLORS.emerald },
    { label: "In Motion",         value: fmtN(movements.filter((m) => m.status === "Moving").length),    color: COLORS.amber },
    { label: "Active Processes",  value: fmtN(movements.filter((m) => m.status === "Active").length),    color: COLORS.rose },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>
        Movement Tracker
      </h2>
      <p style={{ color: "var(--text-muted)", margin: "0 0 24px", fontSize: 14 }}>
        Track the status and flow of all assets and transactions
      </p>

      {/* Counters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {counters.map((c) => (
          <Card key={c.label} style={{ textAlign: "center", padding: "1rem" }}>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: c.color }}>{c.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{c.label}</p>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <Card>
        <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
          Asset Movement Timeline
        </h3>
        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 9, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />

          {movements.map((m) => (
            <div key={m.id} style={{ position: "relative", marginBottom: 24, paddingLeft: 20 }}>
              {/* Dot */}
              <div
                style={{
                  position: "absolute", left: -20, top: 6,
                  width: 12, height: 12, borderRadius: 99,
                  background: TYPE_COLORS[m.type] || COLORS.slate,
                  border: "2px solid var(--card-bg)",
                  zIndex: 1,
                }}
              />
              <div style={{ background: "var(--bg-subtle)", borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: TYPE_COLORS[m.type] || COLORS.slate, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {m.type}
                    </span>
                    <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{m.item}</p>
                  </div>
                  <Badge status={m.status} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)" }}>
                  <span style={{ background: "var(--border)", padding: "2px 8px", borderRadius: 6 }}>{m.from}</span>
                  <i className="ti ti-arrow-right" style={{ fontSize: 13 }} />
                  <span style={{ background: "var(--border)", padding: "2px 8px", borderRadius: 6 }}>{m.to}</span>
                  <span style={{ marginLeft: "auto" }}>{m.date}</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{fmt(m.amount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}