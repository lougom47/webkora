import { motion } from 'motion/react';
import Calculator from './Calculator';

export default function Hero() {
  return (
    <section className="bg-sahara-white pt-32 pb-24 px-4 md:px-margin-desktop overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-md p-6 md:p-12 rounded-2xl border border-white/30 bg-[#e8e3e0]/60"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Brand Message */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-sahara-charcoal/50 mb-4">LIMPIEZA PROFESIONAL</p>
                <h1 className="text-display-lg font-accent text-sahara-charcoal leading-tight mb-8">
                  No solo limpiamos casas, le ayudamos a recuperar el control de su tiempo.
                </h1>
                <p className="text-body-lg text-sahara-charcoal/70 leading-relaxed max-w-md">
                  Hemos estructurado cada movimiento de nuestro protocolo. Nos encargamos de todo el personal e insumos por usted. Sin gestiones externas, sin interrupciones. Solo eficiencia técnica y discreción absoluta.
                </p>
              </motion.div>
              
              <div className="relative rounded-xl overflow-hidden soft-shadow bg-sahara-sandstone aspect-[4/5] max-w-[400px]">
                <img 
                  alt="Professional Staff" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRhUCOLTTK69nVfNW-TMtFHMS2yl_ZgIOH8v3C2C1RCLbpW2a-UbTNHWKLxLVAgzuC8fbbrancXcAeLxhhlxY9atsFjc_244s7US6TzfxtfpA8azNC_5tuMpMFLZOrMC-7k-PEKoxzXZa2iiujHrQw35u81xFp7V3mBGh_eXPoIJ7S2ZMw-ypiaul-2A4P2JDqClG6JylA_HoEVnVG-MLLyf8jcaWGDJbhrRYZ17Y_6b8kMyMuCKezn6g1Pn9R4cb1_T_4R2mKYmDcRw"
                />
              </div>
            </div>

            {/* Calculator Section */}
            <div className="lg:col-span-7 h-full">
              <div id="calculadora" className="h-full">
                <Calculator />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
