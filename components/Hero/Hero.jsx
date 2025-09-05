"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import Button from "../Button/Button";

export default function Hero() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const overlay = wrapper.querySelector(`.${styles.overlay}`);
    const letters = overlay.querySelectorAll(`.${styles.letter}`);
    const buttons = overlay.querySelectorAll(`.${styles.button}`);

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width;
      const yNorm = (e.clientY - rect.top) / rect.height;

      const rotateY = (xNorm - 0.5) * 30;
      const rotateX = (0.5 - yNorm) * 30;

      overlay.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const centerX = 0.5;
      const centerY = 0.5;
      const distX = xNorm - centerX;
      const distY = yNorm - centerY;
      const distance = Math.hypot(distX, distY);

      letters.forEach((letter) => {
        letter.style.transform = `translateZ(${distance * 15}px)`;
      });

      buttons.forEach((btn) => {
        btn.style.transform = `rotateX(${rotateX * 0.5}deg) rotateY(${
          rotateY * 0.5
        }deg)`;
      });
    };

    const handleMouseLeave = () => {
      overlay.style.transform = "rotateX(0deg) rotateY(0deg)";
      letters.forEach((letter) => (letter.style.transform = "translateZ(0)"));
      buttons.forEach(
        (btn) => (btn.style.transform = "rotateX(0deg) rotateY(0deg)")
      );
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.container}>
      <img
        src="/robot1.jpg"
        alt="Background"
        className={styles.backgroundImage}
      />

      <div className={styles.textSide}>
        <div ref={wrapperRef} className={styles.hoverWrapper}>
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
              {"Створюй і керуй сучасними ботами без кодування. Легко додавай команди, управляй діалогами, інтегруй з іншими сервісами і роби ботів по-справжньому розумними"
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
              <Button href="/register" accent glow>
                Розпочати роботу
              </Button>
              <Button href="/login" accent>
                Увійти
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
