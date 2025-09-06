// app/components/Dividers/DiagonalDivider.jsx
"use client";
import styles from "./Dividers.module.css";

export default function DiagonalDivider({ flip }) {
  return (
    <div className={styles.diagonal + " " + (flip ? styles.flip : "")}></div>
  );
}
