import styles from "./HowItWorks.module.css";
import { CheckCircle, User, Key, Settings, PlayCircle } from "lucide-react";

const steps = [
  {
    icon: <User size={32} />,
    title: "Авторизація",
    desc: "Увійди через Google або Email.",
  },
  {
    icon: <Key size={32} />,
    title: "Додай токен",
    desc: "Підключи свого Telegram-бота за допомогою токена.",
  },
  {
    icon: <Settings size={32} />,
    title: "Налаштуй логіку",
    desc: "Використовуй конструктор для створення сценаріїв.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Збережи та активуй",
    desc: "Ми підключимо Webhook і збережемо конфіг.",
  },
  {
    icon: <PlayCircle size={32} />,
    title: "Запусти та тестуй",
    desc: "Перевір роботу й почни використовувати.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Як створити свого Telegram-бота за 5 кроків
        </h2>
        <div className={styles.timelineWrapper}>
          <div className={styles.glowLine}></div>
          <div className={styles.timeline}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.icon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
