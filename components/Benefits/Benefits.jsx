// app/components/Benefits/Benefits.jsx
"use client";
import styles from "./Benefits.module.css";
import { Shield, Zap, Workflow, Globe, Cpu, MessageCircle } from "lucide-react";

export default function Benefits() {
  const items = [
    {
      icon: <Zap size={28} />,
      title: "Швидкий старт",
      desc: "Запусти свого Telegram-бота за кілька хвилин без коду.",
    },
    {
      icon: <Shield size={28} />,
      title: "Безпека",
      desc: "Твої токени зберігаються у захищеній базі даних.",
    },
    {
      icon: <Workflow size={28} />,
      title: "Автоматизація",
      desc: "Підключай API та налаштовуй логіку ботів за допомогою конструктора.",
    },
    {
      icon: <Globe size={28} />,
      title: "Глобальний доступ",
      desc: "Працює у будь-якій країні без обмежень.",
    },
    {
      icon: <Cpu size={28} />,
      title: "Розумна інтеграція",
      desc: "Сумісність з AI, CRM і зовнішніми сервісами.",
    },
    {
      icon: <MessageCircle size={28} />,
      title: "24/7 підтримка",
      desc: "Твої боти завжди онлайн і готові відповідати.",
    },
  ];

  return (
    <section className={styles.benefitsWrapper}>
      <div
        className={styles.benefitsHoverArea}
        onMouseMove={(e) => {
          const overlay = e.currentTarget.querySelector(`.${styles.overlay}`);
          const rect = overlay.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * 10;
          const rotateY = ((x - centerX) / centerX) * 10;
          overlay.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
          overlay.style.transition = "transform 0.1s ease-out";
        }}
        onMouseLeave={(e) => {
          const overlay = e.currentTarget.querySelector(`.${styles.overlay}`);
          overlay.style.transition = "transform 0.6s ease-out";
          overlay.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg)";
        }}
      >
        <div className={styles.benefits}>
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <h2 className={styles.title}>Чому саме ми?</h2>
              <div className={styles.grid}>
                {items.map((item, i) => (
                  <div key={i} className={styles.card}>
                    <div className={styles.icon}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
