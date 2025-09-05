"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePageAnimated() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200); // затримка перед появою
  }, []);

  return (
    <div className={styles.centerContainer}>
      <img
        src="https://yudee-telegram.vercel.app/robot.jpg"
        alt="Робот"
        className={styles.robotImage}
      />
      <div className={`${styles.overlay} ${animate ? styles.active : ""}`}>
        <h1>Створи свого Telegram-бота за хвилини</h1>
        <p>
          Легко, швидко та без зайвого коду. Почни прямо зараз і керуй своїми
          ботами онлайн.
        </p>
        <div className={styles.buttons}>
          <Link href="/register" className={styles.registerBtn}>
            Зареєструватися
          </Link>
          <Link href="/login" className={styles.loginBtn}>
            Увійти
          </Link>
        </div>
      </div>
    </div>
  );
}
