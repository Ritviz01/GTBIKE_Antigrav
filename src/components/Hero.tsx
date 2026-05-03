"use client";

import { useState } from "react";
import Spline from '@splinetool/react-spline/next';
import styles from "./Hero.module.css";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className={styles.hero}>
      {!isLoaded && (
        <div className={styles.loader}>
          <p>LOADING EXPERIENCE...</p>
        </div>
      )}
      
      <div className={styles.splineContainer} style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
        <Spline 
          scene="https://prod.spline.design/VQn3c6YNIQlWFqv8/scene.splinecode" 
          onLoad={() => setIsLoaded(true)}
        />
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
