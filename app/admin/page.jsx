"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetchTokens();
  }, []);

  async function fetchTokens() {
    const res = await fetch("/api/tokens");
    const data = await res.json();
    if (data.ok) setTokens(data.tokens);
  }

  async function handleAddToken(e) {
    e.preventDefault();
    if (!name || !token) return;

    const res = await fetch("/api/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, token }),
    });

    const data = await res.json();
    if (data.ok) {
      setName("");
      setToken("");
      fetchTokens();
    } else {
      alert("Error adding token: " + data.error);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Admin: Telegram Tokens</h1>
      <form onSubmit={handleAddToken}>
        <input
          type="text"
          placeholder="Bot Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bot Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit">Add Token</button>
      </form>

      <div className={styles.tokenList}>
        {tokens.map((t) => (
          <div key={t._id} className={styles.tokenItem}>
            <span>{t.name}</span>
            <span>{t.token}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
