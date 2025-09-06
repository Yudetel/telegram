// app/components/Dividers/WaveDivider.jsx
"use client";
import styles from "./Dividers.module.css";

export default function WaveDivider({ flip }) {
  return (
    <div className={styles.wave + " " + (flip ? styles.flip : "")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          fill="#FD6B23"
          fillOpacity="0.2"
          d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32V200H0Z"
        ></path>
      </svg>
    </div>
  );
}
