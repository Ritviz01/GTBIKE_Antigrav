import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>GT.</h2>
            <p className={styles.tagline}>Pure Motorcycling Exhilaration.</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Motorcycles</h4>
              <a href="#">Continental GT</a>
              <a href="#">Interceptor</a>
              <a href="#">Classic</a>
              <a href="#">Bullet</a>
            </div>
            <div className={styles.column}>
              <h4>Company</h4>
              <a href="#">Our Story</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
            <div className={styles.column}>
              <h4>Support</h4>
              <a href="#">Contact Us</a>
              <a href="#">Locate a Dealer</a>
              <a href="#">Owner's Manual</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} GT Motorcycles. All rights reserved.</p>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
