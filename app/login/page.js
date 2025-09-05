"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <div className={styles.container}>
      <h1>Вхід</h1>
      <form onSubmit={handleCredentialsLogin} className={styles.form}>
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
        <button type="submit">Увійти</button>
      </form>

      <div className={styles.divider}>або</div>

      <button onClick={handleGoogleLogin} className={styles.googleBtn}>
        Увійти через Google
      </button>
    </div>
  );
}
