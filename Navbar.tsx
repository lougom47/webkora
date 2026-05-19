import { Menu } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full backdrop-blur-md z-50 flex justify-between items-center px-4 md:px-margin-desktop py-6 bg-[#e8e3e0]/80 border-b border-white/20"
    >
      <div className="flex items-center gap-2">
        <Menu className="text-sahara-charcoal cursor-pointer w-6 h-6" />
        <span className="text-2xl tracking-[0.2em] text-sahara-charcoal uppercase font-['Montserrat'] font-normal">KORA</span>
      </div>
      <nav className="hidden md:flex gap-8 items-center">
        <a className="font-medium hover:text-sahara-charcoal transition-colors uppercase text-sm tracking-widest border-b-2 border-sahara-charcoal text-sahara-charcoal" href="#servicios">Servicios</a>
        <a className="text-sahara-charcoal/70 font-medium hover:text-sahara-charcoal transition-colors uppercase text-sm tracking-widest" href="#metodo">Método Kora</a>
        <a className="text-sahara-charcoal/70 font-medium hover:text-sahara-charcoal transition-colors uppercase text-sm tracking-widest" href="#faq">Preguntas Frecuentes</a>
      </nav>
    </motion.header>
  );
}
