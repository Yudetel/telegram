"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./HeaderMenu.module.scss";

export default function HeaderMenu() {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" />
          MyBotApp
        </Link>
        <div className={styles.links}>
          <Link href="/">Головна</Link>
          <Link href="/admin">Адмінка</Link>

          {!session ? (
            <>
              <Link href="/login">Увійти</Link>
              <Link href="/register">Реєстрація</Link>
            </>
          ) : (
            <>
              <span className={styles.user}>👤 {session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={styles.logoutBtn}
              >
                Вийти
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
