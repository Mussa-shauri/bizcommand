import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const INDIGO = "#6366f1";

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "#64748b",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ margin: "5px 0 0", fontSize: 12, color: "#f43f5e" }}>{error}</p>
      )}
    </div>
  );
}

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  fontSize: 14,
  outline: "none",
};

export default function Login({ onGoToRegister }) {
  const { login } = useAuth();

  const [form, setForm]               = useState({ identifier: "", password: "" });
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]         = useState(false);
  const [showPass, setShowPass]       = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) e.identifier = "Username or email is required.";
    if (!form.password)          e.password   = "Password is required.";
    return e;
  };

  const handleSubmit = () => {
    setServerError("");
    const fieldErrors = validate();

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      const result = login({ identifier: form.identifier, password: form.password });
      setLoading(false);
      if (!result.success) {
        setServerError(result.error);
      }
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 52, height: 52, borderRadius: 14,
              background: INDIGO,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <i className="ti ti-building-estate" style={{ fontSize: 26, color: "#fff" }} />
          </div>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
            Welcome back
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
            Sign in to your BizCommand account
          </p>
        </div>

        {/* Server error */}
        {serverError && (
          <div
            style={{
              background: "#fee2e2", border: "1px solid #fca5a5",
              borderRadius: 10, padding: "10px 14px", marginBottom: 18,
              fontSize: 13, color: "#991b1b",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <i className="ti ti-alert-circle" style={{ fontSize: 16, flexShrink: 0 }} />
            {serverError}
          </div>
        )}

        {/* Username or Email */}
        <Field label="Username or Email" error={errors.identifier}>
          <div style={{ position: "relative" }}>
            <i
              className="ti ti-user"
              style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16, color: "#94a3b8",
              }}
            />
            <input
              style={{
                ...inputBase,
                paddingLeft: 38,
                borderColor: errors.identifier ? "#f43f5e" : "#e2e8f0",
              }}
              type="text"
              placeholder="Your username or email address"
              value={form.identifier}
              onChange={set("identifier")}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />
          </div>
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password}>
          <div style={{ position: "relative" }}>
            <i
              className="ti ti-lock"
              style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16, color: "#94a3b8",
              }}
            />
            <input
              style={{
                ...inputBase,
                paddingLeft: 38,
                paddingRight: 44,
                borderColor: errors.password ? "#f43f5e" : "#e2e8f0",
              }}
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              value={form.password}
              onChange={set("password")}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
            <button
              onClick={() => setShowPass((s) => !s)}
              style={{
                position: "absolute", right: 12, top: "50%",
                transform: "translateY(-50%)",
                background: "none", border: "none",
                cursor: "pointer", color: "#94a3b8", padding: 2,
              }}
            >
              <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 17 }} />
            </button>
          </div>
        </Field>

        {/* Hint */}
        <p style={{ margin: "-10px 0 18px", fontSize: 12, color: "#94a3b8" }}>
          You can sign in with either your username or email address.
        </p>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...primaryBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <i className="ti ti-loader-2" style={{ fontSize: 16 }} /> Signing in…
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Link to register */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748b" }}>
          Don't have an account?{" "}
          <button
            onClick={onGoToRegister}
            style={{
              background: "none", border: "none",
              color: INDIGO, fontWeight: 600,
              cursor: "pointer", fontSize: 13,
            }}
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  fontFamily: "'Inter','Segoe UI',sans-serif",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: 20,
  padding: "36px 40px",
  width: "100%",
  maxWidth: 440,
  boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
  border: "1px solid #e2e8f0",
};

const primaryBtn = {
  width: "100%",
  padding: "13px",
  background: INDIGO,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 4,
};