"use client";
import { useState } from "react";
import styles from "./register.module.scss";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.ok) {
      setMessage("✅ Реєстрація успішна! Тепер увійди.");
    } else {
      setMessage("❌ " + data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Реєстрація</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
