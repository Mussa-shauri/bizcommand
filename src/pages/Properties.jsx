import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import Modal, { FormField, inputStyle, selectStyle } from "../components/ui/Modal";
import { fmt, COLORS } from "../utils/helpers";

export default function Properties({ properties, setProperties }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "Residential", location: "",
    value: "", units: "", occupied: "", income: "", status: "Active",
  });

  const handleAdd = () => {
    if (!form.name || !form.value) return;
    setProperties((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        value:    +form.value,
        units:    +form.units    || 1,
        occupied: +form.occupied || 0,
        income:   +form.income   || 0,
      },
    ]);
    setModal(false);
    setForm({ name: "", type: "Residential", location: "", value: "", units: "", occupied: "", income: "", status: "Active" });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>
            Properties
          </h2>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 14 }}>
            {properties.length} properties · {fmt(properties.reduce((a, p) => a + p.value, 0))} total value
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 18px", background: COLORS.indigo, color: "#fff",
            border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 14,
          }}
        >
          <i className="ti ti-plus" /> Add Property
        </button>
      </div>

      {/* Property Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {properties.map((p) => (
          <Card key={p.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</p>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
                  <i className="ti ti-map-pin" style={{ fontSize: 12, marginRight: 3 }} />
                  {p.location}
                </p>
              </div>
              <Badge status={p.status} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { l: "Value",          v: fmt(p.value),   icon: "ti-coin" },
                { l: "Monthly Income", v: fmt(p.income),  icon: "ti-chart-bar" },
                { l: "Units",          v: `${p.occupied}/${p.units}`, icon: "ti-building" },
                { l: "Type",           v: p.type,         icon: "ti-category" },
              ].map((item) => (
                <div key={item.l} style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: "10px 12px" }}>
                  <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{item.l}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{item.v}</p>
                </div>
              ))}
            </div>

            <ProgressBar value={(p.occupied / p.units) * 100} color={COLORS.emerald} />
            <p style={{ margin: "6px 0 0", fontSize: 11, color: "var(--text-muted)", textAlign: "right" }}>
              {Math.round((p.occupied / p.units) * 100)}% occupied
            </p>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      {modal && (
        <Modal title="Add New Property" onClose={() => setModal(false)}>
          <FormField label="Property Name">
            <input style={inputStyle} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Riverside Tower" />
          </FormField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Type">
              <select style={selectStyle} value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                {["Residential", "Commercial", "Industrial", "Retail"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select style={selectStyle} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                {["Active", "Maintenance", "Inactive"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Location">
            <input style={inputStyle} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="City, State" />
          </FormField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Value ($)">
              <input style={inputStyle} type="number" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} placeholder="2500000" />
            </FormField>
            <FormField label="Monthly Income ($)">
              <input style={inputStyle} type="number" value={form.income} onChange={(e) => setForm((f) => ({ ...f, income: e.target.value }))} placeholder="25000" />
            </FormField>
            <FormField label="Total Units">
              <input style={inputStyle} type="number" value={form.units} onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))} placeholder="12" />
            </FormField>
            <FormField label="Occupied Units">
              <input style={inputStyle} type="number" value={form.occupied} onChange={(e) => setForm((f) => ({ ...f, occupied: e.target.value }))} placeholder="10" />
            </FormField>
          </div>
          <button
            onClick={handleAdd}
            style={{ width: "100%", padding: 12, background: COLORS.indigo, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15, marginTop: 8 }}
          >
            Add Property
          </button>
        </Modal>
      )}
    </div>
  );
}