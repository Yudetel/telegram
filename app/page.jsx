"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const blockRef = useRef(null);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    const letters = block.querySelectorAll(`.${styles.letter}`);

    const handleMouseMove = (e) => {
      const { left, top, width, height } = block.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // поворот всього блоку
      block.style.transform = `rotateX(${y * 8}deg) rotateY(${x * 12}deg)`;

      // кожна буква відхиляється сильніше
      letters.forEach((letter, i) => {
        const offset = (i % 5) * 5; // більший відступ
        letter.style.transform = `translateZ(${(x + y) * 40 - offset}px)`;
      });
    };

    const handleMouseLeave = () => {
      block.style.transform = "rotateX(0deg) rotateY(0deg)";
      letters.forEach((letter) => {
        letter.style.transform = "translateZ(0)";
      });
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
        src="/robot1.jpg"
        alt="Background"
        className={styles.backgroundImage}
      />

      <div ref={blockRef} className={`${styles.textSide} ${styles.active}`}>
        <div className={styles.overlay}>
          <h1 className={styles.animatedText}>
            {"Конструктор Розумних Ботів".split(" ").map((word, wIndex) => (
              <span
                key={wIndex}
                className={styles.word}
                style={{ "--w": wIndex }}
              >
                {word.split("").map((letter, i) => (
                  <span
                    key={i}
                    className={`${styles.letter} ${styles.letterMove}`}
                    style={{ "--i": i }}
                  >
                    {letter}
                  </span>
                ))}
                &nbsp;
              </span>
            ))}
          </h1>

          <p className={styles.animatedTextP}>
            {"Створюй, налаштовуй та керуй своїми ботами без жодного рядка коду. Швидко, зручно і безкоштовно."
              .split(" ")
              .map((word, wIndex) => (
                <span
                  key={wIndex}
                  className={styles.word}
                  style={{ "--w": wIndex }}
                >
                  {word.split("").map((letter, i) => (
                    <span
                      key={i}
                      className={`${styles.letter} ${styles.letterMove}`}
                      style={{ "--i": i }}
                    >
                      {letter}
                    </span>
                  ))}
                  &nbsp;
                </span>
              ))}
          </p>

          <div className={styles.buttons}>
            <a
              href="/register"
              className={`${styles.registerBtn} ${styles.bubble1}`}
            >
              🚀 Почати зараз
            </a>
            <a href="/login" className={`${styles.loginBtn} ${styles.bubble2}`}>
              🔑 Увійти
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
