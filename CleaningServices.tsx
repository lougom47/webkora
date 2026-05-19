import { motion } from 'motion/react';
import { PenTool, Wind, Key, Construction, Diamond, Home } from 'lucide-react';

export default function CleaningServices() {
  return (
    <section id="servicios" className="bg-sahara-sandstone py-24 px-4 md:px-margin-desktop">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <div className="border-t border-sahara-charcoal/10 mb-12"></div>
          <h2 className="text-display-lg font-accent text-sahara-charcoal text-center tracking-tight">MODALIDADES DE LIMPIEZA</h2>
          <div className="border-b border-sahara-charcoal/10 mt-12"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Card 1: Sinfonía de Orden */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-lino-blanco p-8 md:p-10 rounded-xl soft-shadow transition-all duration-500 flex flex-col h-full"
          >
            <div className="mb-8 overflow-hidden rounded-lg aspect-video">
              <img 
                alt="Sinfonía de Orden" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGkXeyqdSCCqvedbqps05NKqhp5ZskJ7NfX0xNmpLB-XERCPK91-o2Gd0q5vmjeTzwVrwtPgv6J2Srxss60x2pUXhj7Z0U7gn3UY51NNXN7PcQEK4XVHOUdpSJ8NYRhctwKiJASdowUXUqE_yV6U3ngLHJ3MKI2BdFkI4IaJHIKMLe_gfREJzzfikjOMWUgFE95L8Da3PpSjC3LhTv64tAW21EvoTLfVg4nvzQUOXnmHARHlbxCKGc0avNJ0M-j71MAVw02FvfbEHqVA"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl text-sahara-charcoal font-bold tracking-tight mb-2">Sinfonía de Orden</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-sahara-charcoal/40 font-bold mb-8">(Mantenimiento Recurrente)</p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <PenTool className="text-sahara-greige shrink-0 w-5 h-5" />
                    <p className="text-sm leading-relaxed text-sahara-charcoal/80">
                      <strong className="font-bold text-sahara-charcoal">Incluye:</strong> Despolvado y limpieza superficial de mobiliario y repisas. Aspirado y limpieza de pisos en todas las áreas comunes.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <Wind className="text-sahara-greige shrink-0 w-5 h-5" />
                    <p className="text-sm leading-relaxed text-sahara-charcoal/80">
                      Higienización estándar de baños (losas, griferías y espejos). Limpieza externa de topes de cocina y superficies de trabajo. Cambio de bolsas de desechos.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <Key className="text-sahara-greige shrink-0 w-5 h-5" />
                    <p className="text-sm leading-relaxed text-sahara-charcoal/60 italic">
                      <strong className="font-bold text-sahara-charcoal not-italic whitespace-nowrap mr-1">No incluye:</strong> remoción de cal petrificada, grasa interna de electrodomésticos ni limpieza post-obra.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a href="#calculadora" className="block w-full border border-sahara-charcoal py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-sahara-charcoal hover:text-white transition-all text-center">
                  AGENDAR DESDE $30
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Restauración Vital */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-lino-blanco p-8 md:p-10 rounded-xl soft-shadow transition-all duration-500 flex flex-col h-full"
          >
            <div className="mb-8 overflow-hidden rounded-lg aspect-video">
              <img 
                alt="Restauración Vital" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx6jd2adpCRfYazbPAwpiEiIhh_S_G59sVYVwhNt3rkoVwYhUjA4Z3Au9jEZsd-scY4KkWT0ZeLjmhl3TC2tgqmOr-tnsPWm8g1fU4bOt12ZWkc_QfNUVpj5NreJEhpYxTd8yPuyf2a-OouSMEbMPFdvS1zdqqBQfSh9w1y7kQ-mZ-DTK4a6-XqYL4a3_P1VpY_IJX20WfDY27iQNXfFvoUC8NVesjQZN-NcuX1OD50Ax1HnW40CFVW26fZ__xRJsW7r6bOdWAn7JYMg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl text-sahara-charcoal font-bold tracking-tight mb-2">Restauración Vital</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-sahara-charcoal/40 font-bold mb-8">(Intervención Profunda)</p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <Construction className="text-sahara-greige shrink-0 w-5 h-5" />
                    <p className="text-sm leading-relaxed text-sahara-charcoal/80">
                      <strong className="font-bold text-sahara-charcoal">Incluye:</strong> Remoción mecánica de cal incrustada y manchas minerales en cristales de ducha. Desengrase profundo e interno de hornos, campanas y cocinas.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <Diamond className="text-sahara-greige shrink-0 w-5 h-5" />
                    <p className="text-sm leading-relaxed text-sahara-charcoal/80">
                      Desinfección detallada y lavado a fondo de baños. Limpieza profunda de perfiles de ventanas, rieles y marcos de puertas.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <Home className="text-sahara-greige shrink-0 w-5 h-5" />
                    <p className="text-sm leading-relaxed text-sahara-charcoal/80">
                      <strong className="font-bold text-sahara-charcoal mr-1">Renovación total:</strong> Ideal para mudanzas, post-obra, post-evento o periodos largos sin uso.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a href="https://wa.me/584122126159" target="_blank" className="block w-full bg-emerald-green text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-lg transition-all text-center">
                  COTIZAR POR WHATSAPP
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="text-center mt-16 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-sahara-charcoal/40">
          Ambos servicios incluyen transporte, insumos premium y gestión logística total
        </p>
      </div>
    </section>
  );
}
