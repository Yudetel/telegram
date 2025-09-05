import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  onClick,
  className,
  accent,
  glow,
}) {
  const buttonClass = [
    styles.button,
    accent ? styles.accent : "",
    glow ? styles.glow : "",
    className || "",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
