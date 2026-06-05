import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import { fmt, fmtN, COLORS } from "../utils/helpers";
import { movements } from "../data/mockData";

export default function Dashboard({ properties, sales, purchases }) {
  const totalValue    = properties.reduce((a, p) => a + p.value, 0);
  const totalIncome   = properties.reduce((a, p) => a + p.income, 0);
  const totalSales    = sales.filter((s) => s.status === "Completed").reduce((a, s) => a + s.amount, 0);
  const pendingSales  = sales.filter((s) => s.status !== "Completed").reduce((a, s) => a + s.amount, 0);
  const occupied      = properties.reduce((a, p) => a + p.occupied, 0);
  const totalUnits    = properties.reduce((a, p) => a + p.units, 0);

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>
        Overview
      </h2>
      <p style={{ color: "var(--text-muted)", margin: "0 0 24px", fontSize: 14 }}>
        Real-time snapshot of your business portfolio
      </p>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard
          label="Portfolio Value"
          value={fmt(totalValue)}
          sub={`${properties.length} properties`}
          icon="ti-building-estate"
          color={COLORS.indigo}
          spark={[3.8, 3.9, 4.0, 4.2, 4.1, 4.3, 4.5, 4.6, 4.7, 5.0]}
        />
        <StatCard
          label="Monthly Income"
          value={fmt(totalIncome)}
          sub={`${Math.round((occupied / totalUnits) * 100)}% occupancy`}
          icon="ti-coin"
          color={COLORS.emerald}
          spark={[14, 15, 14.5, 16, 15.8, 17, 16.5, 17.8, 18, 18.4]}
        />
        <StatCard
          label="Closed Sales"
          value={fmt(totalSales)}
          sub="This period"
          icon="ti-trending-up"
          color={COLORS.sky}
          spark={[1.2, 1.8, 1.5, 2.0, 2.2, 1.9, 2.4, 2.6, 2.8, 3.1]}
        />
        <StatCard
          label="Pipeline"
          value={fmt(pendingSales)}
          sub={`${sales.filter((s) => s.status !== "Completed").length} active deals`}
          icon="ti-player-record"
          color={COLORS.amber}
          spark={[0.8, 0.9, 1.1, 0.9, 1.2, 1.3, 1.1, 1.4, 1.5, 1.6]}
        />
      </div>

      {/* Pipeline + Occupancy */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
            Sales Pipeline
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sales
              .filter((s) => s.status !== "Completed")
              .map((s) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: COLORS.sky + "18",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}
                  >
                    <i className="ti ti-user" style={{ fontSize: 16, color: COLORS.sky }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.client}
                    </p>
                    <p style={{ margin: "2px 0 5px", fontSize: 11, color: "var(--text-muted)" }}>{s.item}</p>
                    <ProgressBar
                      value={s.progress}
                      color={s.progress > 50 ? COLORS.emerald : COLORS.amber}
                    />
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                      {fmt(s.amount)}
                    </p>
                    <Badge status={s.status} />
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
            Occupancy by Property
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {properties.map((p) => (
              <div key={p.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                    {p.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {p.occupied}/{p.units}
                  </span>
                </div>
                <ProgressBar
                  value={(p.occupied / p.units) * 100}
                  color={p.occupied / p.units > 0.8 ? COLORS.emerald : COLORS.amber}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
          Recent Activity
        </h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {movements.slice(0, 4).map((m, i) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 0",
                borderBottom: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  width: 8, height: 8, borderRadius: 99,
                  background:
                    m.status === "Completed" ? COLORS.emerald :
                    m.status === "Moving"    ? COLORS.amber   : COLORS.sky,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                  {m.type} — {m.item}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-muted)" }}>
                  {m.from} → {m.to} · {m.date}
                </p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", flexShrink: 0 }}>
                {fmt(m.amount)}
              </span>
              <Badge status={m.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}