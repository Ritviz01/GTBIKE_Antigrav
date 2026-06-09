"use client";

import { ArrowRight, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./Store.module.css";

interface Bike {
  id?: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const FALLBACK_BIKES: Bike[] = [
  { id: 1, name: "CONTINENTAL GT 650", price: "$6,199", image: "/modern_motorcycle.png", category: "Modern" },
  { id: 2, name: "INTERCEPTOR 650", price: "$6,149", image: "/modern_motorcycle.png", category: "Modern" },
  { id: 3, name: "CLASSIC 350", price: "$4,699", image: "/vintage_motorcycle.png", category: "Vintage Heritage" },
  { id: 4, name: "BULLET 350", price: "$4,499", image: "/vintage_motorcycle.png", category: "Vintage Heritage" },
];

export default function Store() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Modern");
  const [image, setImage] = useState("/modern_motorcycle.png");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const fetchBikes = async () => {
    try {
      const res = await fetch("/api/bikes");
      if (!res.ok) throw new Error("Failed to fetch bikes");
      const data = await res.json();
      setBikes(data);
    } catch (err) {
      console.warn("Backend API not reachable, using mock fallback data:", err);
      setBikes(FALLBACK_BIKES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage("");
    
    try {
      const res = await fetch("/api/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, category, image }),
      });
      
      if (!res.ok) throw new Error("Failed to save bike");
      const result = await res.json();
      
      setFormMessage(`Success: ${result.message || "Bike added!"}`);
      setName("");
      setPrice("");
      fetchBikes();
    } catch (err) {
      console.error(err);
      setFormMessage("Error connecting to backend database. Added locally to preview.");
      // Fallback: Add locally to UI
      const tempId = bikes.length > 0 ? Math.max(...bikes.map(b => b.id || 0)) + 1 : 1;
      setBikes(prev => [...prev, { id: tempId, name, price, category, image }]);
      setName("");
      setPrice("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="store" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="title-medium">THE SHOP.</h2>
          <button 
            className="btn btn-outline" 
            onClick={() => setShowForm(!showForm)}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {showForm ? (
              <>
                Close <X size={16} />
              </>
            ) : (
              <>
                Add Custom Bike <Plus size={16} />
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Add Custom Motorcycle</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Bike Model Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. METEOR 350" 
                    required 
                    className={styles.input} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Price</label>
                  <input 
                    type="text" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="e.g. $4,599" 
                    required 
                    className={styles.input} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={styles.select}
                  >
                    <option value="Modern">Modern</option>
                    <option value="Vintage Heritage">Vintage Heritage</option>
                    <option value="Cruiser">Cruiser</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Select Design/Image</label>
                  <select 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    className={styles.select}
                  >
                    <option value="/modern_motorcycle.png">Modern Motorcycle (Dark)</option>
                    <option value="/modern_bike.png">Modern Bike (Red/White)</option>
                    <option value="/vintage_motorcycle.png">Vintage Motorcycle (Dark)</option>
                    <option value="/vintage_bike.png">Vintage Bike (Red/White)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn" disabled={submitting}>
                {submitting ? "Saving..." : "Add to Showroom"}
              </button>
              {formMessage && <p className={styles.formMessage}>{formMessage}</p>}
            </form>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p>Loading bikes from showroom...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {bikes.map((bike) => (
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
        )}
      </div>
    </section>
  );
}
