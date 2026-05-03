"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ModernLineup.module.css";

export default function ModernLineup() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="lineup" className={styles.section} ref={containerRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="title-medium">MODERN<br/>CLASSICS.</h2>
          <p className="text-body">The essence of motorcycling, distilled. Clean lines, raw power, and an unmistakable silhouette. Built for those who ride.</p>
        </div>

        <div className={styles.showcase}>
          <motion.div 
            className={styles.imageWrapper}
            style={{ y: y1, opacity: opacity1 }}
          >
            <Image 
              src="/modern_motorcycle.png" 
              alt="Modern GT Cafe Racer" 
              className={styles.image}
              width={1000}
              height={700}
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          
          <div className={styles.details}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Engine</span>
              <span className={styles.statValue}>648cc Parallel Twin</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Power</span>
              <span className={styles.statValue}>47 bhp</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Weight</span>
              <span className={styles.statValue}>212 kg</span>
            </div>
            <button className="btn">Discover More</button>
          </div>
        </div>
      </div>
    </section>
  );
}
