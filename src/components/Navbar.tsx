"use client";

import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          GT.
        </Link>
        <div className={styles.links}>
          <Link href="#lineup" className={styles.link}>Lineup</Link>
          <Link href="#vintage" className={styles.link}>Heritage</Link>
          <Link href="#store" className={styles.link}>Shop</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconBtn}>
            <ShoppingBag size={20} />
          </button>
          <button className={styles.menuBtn}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
