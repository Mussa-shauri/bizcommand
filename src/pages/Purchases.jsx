import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import Modal, { FormField, inputStyle, selectStyle } from "../components/ui/Modal";
import { fmt, COLORS } from "../utils/helpers";

export default function Purchases({ purchases, setPurchases }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    vendor: "", item: "", amount: "", date: "",
    category: "Maintenance", status: "Pending",
  });

  const handleAdd = () => {
    if (!form.vendor || !form.amount) return;
    setPurchases((prev) => [...prev, { id: Date.now(), ...form, amount: +form.amount }]);
    setModal(false);
    setForm({ vendor: "", item: "", amount: "", date: "", category: "Maintenance", status: "Pending" });
  };

  const total       = purchases.reduce((a, p) => a + p.amount, 0);
  const byCategory  = purchases.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.amount;
    return acc;
  }, {});

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>Purchases</h2>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 14 }}>
            {purchases.length} records · {fmt(total)} total spend
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: COLORS.rose, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 14 }}
        >
          <i className="ti ti-plus" /> Add Purchase
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Records list */}
        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
            Purchase Records
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {purchases.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < purchases.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: COLORS.rose + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className="ti ti-receipt" style={{ fontSize: 17, color: COLORS.rose }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.item}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-muted)" }}>{p.vendor} · {p.date}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{fmt(p.amount)}</span>
                  <Badge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
              Spend by Category
            </h3>
            {Object.entries(byCategory).map(([cat, val]) => (
              <div key={cat} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{cat}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{fmt(val)}</span>
                </div>
                <ProgressBar value={(val / total) * 100} color={COLORS.rose} />
              </div>
            ))}
          </Card>
          <Card style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Spend</p>
            <p style={{ margin: "6px 0 4px", fontSize: 28, fontWeight: 800, color: COLORS.rose }}>{fmt(total)}</p>
            <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>
              {purchases.filter((p) => p.status === "Pending").length} pending payments
            </p>
          </Card>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <Modal title="Add Purchase Record" onClose={() => setModal(false)}>
          <FormField label="Vendor / Supplier">
            <input style={inputStyle} value={form.vendor} onChange={(e) => setForm((f) => ({ ...f, vendor: e.target.value }))} placeholder="Vendor name" />
          </FormField>
          <FormField label="Description / Item">
            <input style={inputStyle} value={form.item} onChange={(e) => setForm((f) => ({ ...f, item: e.target.value }))} placeholder="What was purchased" />
          </FormField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Amount ($)">
              <input style={inputStyle} type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="15000" />
            </FormField>
            <FormField label="Date">
              <input style={inputStyle} type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </FormField>
            <FormField label="Category">
              <select style={selectStyle} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {["Maintenance", "Capital", "Services", "Insurance", "Other"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select style={selectStyle} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                {["Pending", "Paid"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <button
            onClick={handleAdd}
            style={{ width: "100%", padding: 12, background: COLORS.rose, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15, marginTop: 8 }}
          >
            Add Purchase
          </button>
        </Modal>
      )}
    </div>
  );
}