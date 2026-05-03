import Image from "next/image";
import styles from "./VintageHistory.module.css";

export default function VintageHistory() {
  return (
    <section id="vintage" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
             <Image 
              src="/vintage_motorcycle.png" 
              alt="Vintage Motorcycle" 
              className={styles.image}
              width={800}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.accentSquare}></div>
          </div>
          
          <div className={styles.content}>
            <span className={styles.year}>1965</span>
            <h2 className="title-medium">THE CAFE RACER<br/>CULTURE.</h2>
            <p className="text-body">
              Born in the swinging sixties, the original cafe racers were modified by enthusiasts for speed and handling rather than comfort. Stripped down, tuned up, and raced from cafe to cafe.
            </p>
            <p className="text-body">
              Our heritage models pay homage to this era, retaining the classic lines, clip-on handlebars, and rear-set footpegs, while integrating modern reliability and performance.
            </p>
            <button className="btn btn-outline" style={{ marginTop: '2rem' }}>Read the History</button>
          </div>
        </div>
      </div>
    </section>
  );
}
