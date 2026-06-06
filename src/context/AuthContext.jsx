import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("bizcommand_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("bizcommand_users");
    return saved ? JSON.parse(saved) : [];
  });

  // ── REGISTER ──────────────────────────────────────────────────────────────
  const register = ({ fullName, username, email, password }) => {
    // Check email already taken
    const emailTaken = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailTaken) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Check username already taken
    const usernameTaken = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );
    if (usernameTaken) {
      return { success: false, error: "That username is already taken. Please choose another." };
    }

    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
      initials: fullName
        .trim()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("bizcommand_users", JSON.stringify(updatedUsers));

    return { success: true };
  };

  // ── LOGIN — accepts email OR username ─────────────────────────────────────
  const login = ({ identifier, password }) => {
    const input = identifier.trim().toLowerCase();

    // Match against either email or username
    const user = users.find(
      (u) =>
        (u.email === input || u.username === input) &&
        u.password === password
    );

    if (!user) {
      return { success: false, error: "Incorrect username/email or password." };
    }

    setCurrentUser(user);
    localStorage.setItem("bizcommand_current_user", JSON.stringify(user));
    return { success: true };
  };

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("bizcommand_current_user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}