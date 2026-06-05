export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "1.25rem 1.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}