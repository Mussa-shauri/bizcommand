export default function ProgressBar({ value, color = "#10b981" }) {
  return (
    <div
      style={{
        background: "#e2e8f0",
        borderRadius: 99,
        height: 6,
        overflow: "hidden",
        minWidth: 80,
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: color,
          borderRadius: 99,
          transition: "width .4s ease",
        }}
      />
    </div>
  );
}