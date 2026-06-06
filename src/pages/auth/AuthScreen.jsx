import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthScreen() {
  // "login" or "register"
  const [screen, setScreen] = useState("login");

  if (screen === "register") {
    return <Register onGoToLogin={() => setScreen("login")} />;
  }

  return <Login onGoToRegister={() => setScreen("register")} />;
}