import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import { fmt, fmtN, COLORS } from "../utils/helpers";
import { risks, plans } from "../data/mockData";

const TABS = [
  { id: "risks", label: "Risk Register",   icon: "ti-shield-check" },
  { id: "plans", label: "Strategic Plans", icon: "ti-clipboard-list" },
];

const SEVERITY_ORDER = { High: 3, Medium: 2, Low: 1 };

export default function RiskPlanning() {
  const [tab, setTab] = useState("risks");

  const sortedRisks = [...risks].sort(
    (a, b) => (SEVERITY_ORDER[b.severity] || 0) - (SEVERITY_ORDER[a.severity] || 0)
  );

  const riskCounters = [
    { label: "Total Risks",   value: fmtN(risks.length),                                        color: COLORS.slate },
    { label: "High Severity", value: fmtN(risks.filter((r) => r.severity === "High").length),   color: COLORS.rose },
    { label: "Monitored",     value: fmtN(risks.filter((r) => r.status === "Monitored").length), color: COLORS.amber },
    { label: "Resolved",      value: fmtN(risks.filter((r) => r.status === "Resolved").length),  color: COLORS.emerald },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>
        Risk & Planning
      </h2>
      <p style={{ color: "var(--text-muted)", margin: "0 0 20px", fontSize: 14 }}>
        Identify risks, track mitigation, and manage business plans
      </p>

      {/* Tab switcher */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 10,
              border: "1px solid var(--border)",
              background: tab === t.id ? COLORS.indigo : "var(--card-bg)",
              color:      tab === t.id ? "#fff"         : "var(--text-primary)",
              cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all .2s",
            }}
          >
            <i className={`ti ${t.icon}`} style={{ fontSize: 16 }} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── RISK REGISTER ── */}
      {tab === "risks" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
            {riskCounters.map((c) => (
              <Card key={c.label} style={{ textAlign: "center", padding: "1rem" }}>
                <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: c.color }}>{c.value}</p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{c.label}</p>
              </Card>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {sortedRisks.map((r) => (
              <Card
                key={r.id}
                style={{
                  borderLeft: `4px solid ${
                    r.severity === "High"   ? COLORS.rose   :
                    r.severity === "Medium" ? COLORS.amber  : COLORS.emerald
                  }`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {r.category}
                    </span>
                    <p style={{ margin: "3px 0 0", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{r.title}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <Badge status={r.severity} />
                    <Badge status={r.status} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
                  {[
                    { l: "Impact",     v: r.impact },
                    { l: "Likelihood", v: r.likelihood },
                    { l: "Risk Score", v: `${r.score}/10` },
                  ].map((item) => (
                    <div key={item.l} style={{ background: "var(--bg-subtle)", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                      <p style={{ margin: 0, fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>{item.l}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{item.v}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: COLORS.sky + "12", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "var(--text-primary)" }}>
                  <i className="ti ti-bulb" style={{ marginRight: 6, color: COLORS.sky }} />
                  {r.mitigation}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── STRATEGIC PLANS ── */}
      {tab === "plans" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {plans.map((p) => (
            <Card key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{p.title}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
                    <i className="ti ti-calendar" style={{ fontSize: 12, marginRight: 4 }} />{p.timeline}
                    <span style={{ margin: "0 8px" }}>·</span>
                    <i className="ti ti-user" style={{ fontSize: 12, marginRight: 4 }} />{p.owner}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Badge status={p.priority} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{fmt(p.budget)}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={p.progress} color={p.progress >= 80 ? COLORS.emerald : COLORS.indigo} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", flexShrink: 0 }}>{p.progress}%</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}