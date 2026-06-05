const STATUS_MAP = {
  Active:       { bg: "#d1fae5", color: "#065f46" },
  Completed:    { bg: "#d1fae5", color: "#065f46" },
  Resolved:     { bg: "#d1fae5", color: "#065f46" },
  Paid:         { bg: "#d1fae5", color: "#065f46" },
  Low:          { bg: "#d1fae5", color: "#065f46" },
  "In Progress":{ bg: "#fef3c7", color: "#92400e" },
  Moving:       { bg: "#fef3c7", color: "#92400e" },
  Monitored:    { bg: "#fef3c7", color: "#92400e" },
  Medium:       { bg: "#fef3c7", color: "#92400e" },
  Pending:      { bg: "#e0e7ff", color: "#3730a3" },
  Maintenance:  { bg: "#fee2e2", color: "#991b1b" },
  High:         { bg: "#fee2e2", color: "#991b1b" },
};

export default function Badge({ status }) {
  const s = STATUS_MAP[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 20,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}