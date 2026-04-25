"use client";

import Spline from '@splinetool/react-spline/next';
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.splineContainer}>
        <Spline scene="https://prod.spline.design/VQn3c6YNIQlWFqv8/scene.splinecode" />
      </div>

      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.subtitle}>EST. 1960 — CAFE RACER HERITAGE</p>
            <h1 className={styles.title}>
              GT.<br />
              MOTORS.
            </h1>
            <div className={styles.accentBlock}>
              <div className={styles.accentText}>
                <span>001</span>
                <p>THE CONTINENTAL GT. <br/>PURE MOTORCYCLING EXHILARATION.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
