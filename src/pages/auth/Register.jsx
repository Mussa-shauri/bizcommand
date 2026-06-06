import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const INDIGO = "#6366f1";

function Field({ label, error, hint, children }) {
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
      {hint && !error && (
        <p style={{ margin: "5px 0 0", fontSize: 12, color: "#94a3b8" }}>{hint}</p>
      )}
      {error && (
        <p style={{ margin: "5px 0 0", fontSize: 12, color: "#f43f5e" }}>{error}</p>
      )}
    </div>
  );
}

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px 11px 38px",
  borderRadius: 10,
  border: "1.5px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  fontSize: 14,
  outline: "none",
};

function InputIcon({ icon }) {
  return (
    <i
      className={`ti ${icon}`}
      style={{
        position: "absolute", left: 12, top: "50%",
        transform: "translateY(-50%)",
        fontSize: 16, color: "#94a3b8",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Register({ onGoToLogin }) {
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess]         = useState(false);
  const [loading, setLoading]         = useState(false);
  const [showPass, setShowPass]       = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};

    if (!form.fullName.trim()) {
      e.fullName = "Full name is required.";
    } else if (form.fullName.trim().split(" ").length < 2) {
      e.fullName = "Please enter your first and last name.";
    }

    if (!form.username.trim()) {
      e.username = "Username is required.";
    } else if (form.username.trim().length < 3) {
      e.username = "Username must be at least 3 characters.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username.trim())) {
      e.username = "Username can only contain letters, numbers, and underscores.";
    }

    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }

    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      e.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Passwords do not match.";
    }

    return e;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
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
      const result = register({
        fullName: form.fullName,
        username: form.username,
        email:    form.email,
        password: form.password,
      });

      setLoading(false);

      if (!result.success) {
        setServerError(result.error);
      } else {
        setSuccess(true);
      }
    }, 600);
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "#d1fae5",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <i className="ti ti-check" style={{ fontSize: 30, color: "#10b981" }} />
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
              Account Created!
            </h2>
            <p style={{ margin: "0 0 6px", fontSize: 14, color: "#64748b" }}>
              Your account has been registered successfully.
            </p>
            <p style={{ margin: "0 0 28px", fontSize: 13, color: "#94a3b8" }}>
              You can now sign in with your username <strong style={{ color: "#0f172a" }}>@{form.username.toLowerCase()}</strong> or your email.
            </p>
            <button onClick={onGoToLogin} style={primaryBtn}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Register form ───────────────────────────────────────────────────────────
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
            Create your account
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
            Register to access BizCommand
          </p>
        </div>

        {/* Server-level error */}
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

        {/* Full Name */}
        <Field label="Full Name" error={errors.fullName}>
          <div style={{ position: "relative" }}>
            <InputIcon icon="ti-id-badge" />
            <input
              style={{ ...inputBase, borderColor: errors.fullName ? "#f43f5e" : "#e2e8f0" }}
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={set("fullName")}
              autoComplete="name"
            />
          </div>
        </Field>

        {/* Username */}
        <Field
          label="Username"
          error={errors.username}
          hint="Letters, numbers and underscores only. Used to sign in."
        >
          <div style={{ position: "relative" }}>
            <InputIcon icon="ti-at" />
            <input
              style={{ ...inputBase, borderColor: errors.username ? "#f43f5e" : "#e2e8f0" }}
              type="text"
              placeholder="e.g. john_doe"
              value={form.username}
              onChange={set("username")}
              autoComplete="username"
            />
          </div>
        </Field>

        {/* Email */}
        <Field label="Email Address" error={errors.email}>
          <div style={{ position: "relative" }}>
            <InputIcon icon="ti-mail" />
            <input
              style={{ ...inputBase, borderColor: errors.email ? "#f43f5e" : "#e2e8f0" }}
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </div>
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password}>
          <div style={{ position: "relative" }}>
            <InputIcon icon="ti-lock" />
            <input
              style={{
                ...inputBase,
                paddingRight: 44,
                borderColor: errors.password ? "#f43f5e" : "#e2e8f0",
              }}
              type={showPass ? "text" : "password"}
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={set("password")}
              autoComplete="new-password"
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

        {/* Confirm Password */}
        <Field label="Confirm Password" error={errors.confirmPassword}>
          <div style={{ position: "relative" }}>
            <InputIcon icon="ti-lock-check" />
            <input
              style={{ ...inputBase, borderColor: errors.confirmPassword ? "#f43f5e" : "#e2e8f0" }}
              type={showPass ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              autoComplete="new-password"
            />
          </div>
        </Field>

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
              <i className="ti ti-loader-2" style={{ fontSize: 16 }} /> Creating account…
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Link to login */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748b" }}>
          Already have an account?{" "}
          <button
            onClick={onGoToLogin}
            style={{
              background: "none", border: "none",
              color: INDIGO, fontWeight: 600,
              cursor: "pointer", fontSize: 13,
            }}
          >
            Sign in
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