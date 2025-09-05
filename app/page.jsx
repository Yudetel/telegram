"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [rules, setRules] = useState([]);
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("/api/rules")
      .then((res) => res.json())
      .then(setRules);
  }, []);

  async function addRule() {
    if (!trigger || !response) return;
    await fetch("/api/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trigger, response }),
    });
    setTrigger("");
    setResponse("");
    const updated = await fetch("/api/rules").then((r) => r.json());
    setRules(updated);
  }

  return (
    <main className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>🤖 Bot Builder</div>
      </div>

      {/* Add rule form */}
      <div className={styles.addForm}>
        <input
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          placeholder="Команда (/start)"
          className={styles.input}
        />
        <input
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Відповідь"
          className={styles.input}
        />
        <button onClick={addRule} className={styles.button}>
          Додати
        </button>
      </div>

      {/* Rules list */}
      <div className={styles.rulesList}>
        {rules.length > 0 ? (
          rules.map((rule) => (
            <div key={rule._id} className={styles.ruleCard}>
              <div className={styles.ruleTrigger}>{rule.trigger}</div>
              <div className={styles.ruleResponse}>{rule.response}</div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Правил ще немає — додай перше 👆</div>
        )}
      </div>
      <img src="/robot.jpg" alt="" />
    </main>
  );
}
