import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CleaningServices from './components/CleaningServices';
import MethodKora from './components/MethodKora';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-sahara-white selection:bg-sahara-greige/30">
      <Navbar />
      
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>

        <CleaningServices />
        <MethodKora />
        <FAQ />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/584122126159"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-emerald-green text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
      >
        <img 
          alt="WhatsApp" 
          className="w-8 h-8 md:w-10 md:h-10 object-contain brightness-0 invert" 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        />
      </motion.a>
    </div>
  );
}
