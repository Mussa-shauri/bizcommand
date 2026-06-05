import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import Modal, { FormField, inputStyle, selectStyle } from "../components/ui/Modal";
import { fmt, fmtN, COLORS } from "../utils/helpers";

export default function Sales({ sales, setSales }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    client: "", item: "", amount: "", date: "",
    category: "Commercial", status: "Pending", progress: 5,
  });

  const handleAdd = () => {
    if (!form.client || !form.amount) return;
    setSales((prev) => [
      ...prev,
      { id: Date.now(), ...form, amount: +form.amount, progress: +form.progress },
    ]);
    setModal(false);
    setForm({ client: "", item: "", amount: "", date: "", category: "Commercial", status: "Pending", progress: 5 });
  };

  const totalClosed  = sales.filter((s) => s.status === "Completed").reduce((a, s) => a + s.amount, 0);
  const pipeline     = sales.filter((s) => s.status !== "Completed").reduce((a, s) => a + s.amount, 0);

  const counters = [
    { label: "Total Deals",  value: fmtN(sales.length),                                          color: COLORS.indigo },
    { label: "Closed",       value: fmtN(sales.filter((s) => s.status === "Completed").length),  color: COLORS.emerald },
    { label: "In Progress",  value: fmtN(sales.filter((s) => s.status === "In Progress").length),color: COLORS.amber },
    { label: "Pending",      value: fmtN(sales.filter((s) => s.status === "Pending").length),    color: COLORS.slate },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>Sales</h2>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 14 }}>
            {fmt(totalClosed)} closed · {fmt(pipeline)} in pipeline
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: COLORS.emerald, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 14 }}
        >
          <i className="ti ti-plus" /> New Sale
        </button>
      </div>

      {/* Counters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {counters.map((c) => (
          <Card key={c.label} style={{ textAlign: "center", padding: "1rem" }}>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: c.color }}>{c.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{c.label}</p>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Client", "Item", "Amount", "Progress", "Date", "Status"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < sales.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{s.client}</td>
                  <td style={{ padding: "12px 12px", fontSize: 13, color: "var(--text-muted)" }}>{s.item}</td>
                  <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{fmt(s.amount)}</td>
                  <td style={{ padding: "12px 12px", minWidth: 100 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <ProgressBar value={s.progress} color={s.progress === 100 ? COLORS.emerald : COLORS.sky} />
                      <span style={{ fontSize: 11, color: "var(--text-muted)", flexShrink: 0 }}>{s.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 12px", fontSize: 12, color: "var(--text-muted)" }}>{s.date}</td>
                  <td style={{ padding: "12px 12px" }}><Badge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {modal && (
        <Modal title="New Sale Record" onClose={() => setModal(false)}>
          <FormField label="Client Name">
            <input style={inputStyle} value={form.client} onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} placeholder="Client or Company" />
          </FormField>
          <FormField label="Item / Property">
            <input style={inputStyle} value={form.item} onChange={(e) => setForm((f) => ({ ...f, item: e.target.value }))} placeholder="e.g. Unit 5, Oakwood" />
          </FormField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Amount ($)">
              <input style={inputStyle} type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="250000" />
            </FormField>
            <FormField label="Date">
              <input style={inputStyle} type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </FormField>
            <FormField label="Category">
              <select style={selectStyle} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {["Commercial", "Residential", "Industrial", "Retail"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select style={selectStyle} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                {["Pending", "In Progress", "Completed"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label={`Deal Progress: ${form.progress}%`}>
            <input type="range" min="0" max="100" step="5" value={form.progress} onChange={(e) => setForm((f) => ({ ...f, progress: +e.target.value }))} style={{ width: "100%" }} />
          </FormField>
          <button
            onClick={handleAdd}
            style={{ width: "100%", padding: 12, background: COLORS.emerald, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15, marginTop: 8 }}
          >
            Add Sale
          </button>
        </Modal>
      )}
    </div>
  );
}