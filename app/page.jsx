"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  const [animate, setAnimate] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    const handleMouseMove = (e) => {
      const rect = block.getBoundingClientRect();
      const x = e.clientX - rect.left; // позиція миші по X відносно блока
      const y = e.clientY - rect.top; // позиція миші по Y відносно блока
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10; // максимум 10 градусів
      const rotateY = ((x - centerX) / centerX) * -10; // максимум -10 градусів
      block.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const handleMouseLeave = () => {
      block.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    block.addEventListener("mousemove", handleMouseMove);
    block.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      block.removeEventListener("mousemove", handleMouseMove);
      block.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.container}>
      <img
        src="https://raw.githubusercontent.com/Yudetel/telegram/refs/heads/main/public/robot1.jpg"
        alt="Робот"
        className={styles.backgroundImage}
      />
      <div
        ref={blockRef}
        className={`${styles.textSide} ${animate ? styles.active : ""}`}
      >
        <div className={styles.overlay}>
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
    </div>
  );
}
