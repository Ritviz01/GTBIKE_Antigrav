import { ArrowRight } from "lucide-react";
import styles from "./Store.module.css";

const BIKES = [
  { id: 1, name: "CONTINENTAL GT 650", price: "$6,199", image: "/modern_motorcycle.png", category: "Modern" },
  { id: 2, name: "INTERCEPTOR 650", price: "$6,149", image: "/modern_motorcycle.png", category: "Modern" },
  { id: 3, name: "CLASSIC 350", price: "$4,699", image: "/vintage_motorcycle.png", category: "Vintage Heritage" },
  { id: 4, name: "BULLET 350", price: "$4,499", image: "/vintage_motorcycle.png", category: "Vintage Heritage" },
];

export default function Store() {
  return (
    <section id="store" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="title-medium">THE SHOP.</h2>
          <button className="btn btn-outline">View All Models</button>
        </div>

        <div className={styles.grid}>
          {BIKES.map((bike) => (
            <div key={bike.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={bike.image} alt={bike.name} className={styles.image} />
                <div className={styles.overlay}>
                  <button className={styles.shopBtn}>
                    Build & Price <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.details}>
                <span className={styles.category}>{bike.category}</span>
                <h3 className={styles.name}>{bike.name}</h3>
                <span className={styles.price}>{bike.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
