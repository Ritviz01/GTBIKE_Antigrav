import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ModernLineup from "@/components/ModernLineup";
import VintageHistory from "@/components/VintageHistory";
import Store from "@/components/Store";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ModernLineup />
      <VintageHistory />
      <Store />
      <Footer />
    </main>
  );
}
