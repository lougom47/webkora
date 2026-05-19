import { motion } from 'motion/react';
import { Truck, Home, Sparkles } from 'lucide-react';

export default function MethodKora() {
  return (
    <section id="metodo" className="bg-[#e8e3e0] py-24 px-4 md:px-margin-desktop overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <div className="border-t border-sahara-charcoal/10 mb-12"></div>
          <h2 className="text-display-lg font-accent text-sahara-charcoal text-center tracking-tight">+7 AÑOS DE EXPERIENCIA</h2>
          <div className="border-b border-sahara-charcoal/10 mt-12"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-lino-blanco p-12 md:p-20 rounded-xl soft-shadow flex flex-col items-center text-center max-w-4xl mx-auto border border-white/50"
        >
          <h3 className="text-display-lg font-bold text-sahara-charcoal mb-16 tracking-tight">METODO KORA</h3>
          
          <div className="grid md:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-sahara-sandstone/30 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-sahara-greige" />
              </div>
              <p className="text-body-lg text-sahara-charcoal/80 font-medium leading-snug">
                Nuestro personal llega, opera y se retira con logística propia.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-sahara-sandstone/30 flex items-center justify-center">
                <Truck className="w-8 h-8 text-sahara-greige" />
              </div>
              <p className="text-body-lg text-sahara-charcoal/80 font-medium leading-snug">
                Proveemos el transporte, insumos y la alimentación de nuestro talento.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-sahara-sandstone/30 flex items-center justify-center">
                <Home className="w-8 h-8 text-sahara-greige" />
              </div>
              <p className="text-body-lg text-sahara-charcoal/80 font-medium leading-snug">
                Su única tarea es abrir la puerta y, después, respirar la calma.
              </p>
            </div>
          </div>
        </motion.div>

        <p className="text-center mt-12 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-sahara-charcoal/50 max-w-2xl mx-auto leading-relaxed">
          A diferencia de la informalidad del servicio tradicional en Venezuela, <span className="text-sahara-charcoal">en KORA respetamos la intimidad de su patrimonio.</span>
        </p>

        <div className="flex justify-center mt-16">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#calculadora" 
            className="bg-emerald-green text-white px-12 md:px-24 py-6 md:py-10 text-xl md:text-2xl font-bold uppercase tracking-[0.3em] shadow-2xl transition-all text-center rounded"
          >
            RESERVAR DESDE $30
          </motion.a>
        </div>
      </div>
    </section>
  );
}
