import { useState, useMemo } from 'react';
import { Users, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Calculator() {
  const [surface, setSurface] = useState(120);
  const [hasPets, setPets] = useState(false);
  const [isWeekend, setWeekend] = useState(false);
  const [scent, setScent] = useState('Nordic Pine Essence');

  const calculation = useMemo(() => {
    // Pricing Logic: $30 up to 120m2. $1.5 per additional m2.
    let baseRate = 30;
    if (surface > 120) {
      baseRate += (surface - 120) * 1.5;
    }

    // Talent Logic
    let specialists = 1;
    if (surface > 240) specialists = 3;
    else if (surface > 120) specialists = 2;
    
    let petFee = hasPets ? 30 : 0;
    let finalSpecialists = specialists + (hasPets ? 1 : 0);
    
    // Weekend Fee: $6 multiplied by the number of specialists
    let weekendFee = isWeekend ? (6 * finalSpecialists) : 0; 
    
    const total = baseRate + petFee + weekendFee;

    return {
      baseRate,
      extraFees: petFee + weekendFee,
      total,
      specialists: finalSpecialists
    };
  }, [surface, hasPets, isWeekend]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card-linen backdrop-blur-md p-6 md:p-10 rounded-xl soft-shadow border border-white/40 h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-xl uppercase tracking-wider text-sahara-charcoal">Cotizador</h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-sahara-charcoal">{surface}</span>
            <span className="text-sahara-charcoal/60 ml-1">m²</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-gutter items-start">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-sahara-charcoal/60 block">Superficie</label>
              <input 
                className="w-full h-1 bg-sahara-charcoal/20 appearance-none rounded-full cursor-pointer accent-sahara-charcoal" 
                type="range" 
                min="40" 
                max="300" 
                value={surface}
                onChange={(e) => setSurface(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-sahara-charcoal/40 font-bold">
                <span>40m²</span>
                <span>300m²</span>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between border border-sahara-charcoal/10">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-sahara-charcoal" />
                <div>
                  <p className="text-sm font-bold text-sahara-charcoal">{calculation.specialists} Especialista(s)</p>
                  <p className="text-[11px] text-sahara-charcoal/60 leading-tight">Talento KORA certificado</p>
                </div>
              </div>
              <div className="relative group">
                <Info className="w-4 h-4 text-sahara-charcoal/40 cursor-help" />
                <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 w-48 bg-sahara-charcoal text-white text-[10px] p-2 rounded shadow-xl z-20 leading-normal">
                  Incluye: productos de limpieza, uniforme, traslado y alimentación del talento.
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-gutter">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-sahara-charcoal/60 block">Firma Sensorial</label>
              <select 
                className="w-full bg-white/60 border border-sahara-charcoal/20 rounded p-3 text-sm focus:ring-1 focus:ring-sahara-greige outline-none text-sahara-charcoal"
                value={scent}
                onChange={(e) => setScent(e.target.value)}
              >
                <option>Nordic Pine Essence</option>
                <option>Pure Marine Breeze</option>
                <option>Cherry Blossom</option>
              </select>
              <p className="text-[10px] text-sahara-charcoal/50 italic leading-relaxed">
                Nuestras bases desinfectantes de alta gama eliminan patógenos dejando una estela de pureza.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={hasPets} 
                  onChange={(e) => setPets(e.target.checked)} 
                  className="mt-1 rounded border-sahara-charcoal/30 text-sahara-charcoal focus:ring-sahara-charcoal h-4 w-4"
                />
                <div>
                  <span className="text-sm font-medium text-sahara-charcoal group-hover:text-sahara-charcoal transition-colors">Mascotas (+$30)</span>
                  <p className="text-[10px] text-sahara-charcoal/50">Productos especiales y +1 talento.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded border-sahara-charcoal/30 text-sahara-charcoal focus:ring-sahara-charcoal h-4 w-4" />
                <div className="flex items-center gap-2 relative group/art">
                  <span className="text-sm font-medium text-sahara-charcoal">Objetos de Arte</span>
                  <Info className="w-4 h-4 text-sahara-charcoal/40" />
                  <div className="invisible group-hover/art:visible absolute bottom-full left-0 mb-2 w-64 bg-sahara-charcoal text-white text-[10px] p-3 rounded shadow-xl z-20 leading-relaxed">
                    Incluye esculturas, cuadros, figuras de porcelana, antigüedades o piezas decorativas de alto valor. Nuestro personal tiene instrucciones estrictas de no manipular ni mover estos elementos.
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isWeekend} 
                  onChange={(e) => setWeekend(e.target.checked)}
                  className="rounded border-sahara-charcoal/30 text-sahara-charcoal focus:ring-sahara-charcoal h-4 w-4" 
                />
                <span className="text-sm font-medium text-sahara-charcoal">Fin de semana/feriado</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-sahara-charcoal/10">
        <div className="flex gap-6 mb-6">
          <div className="text-[11px] text-sahara-charcoal/60">
            <span className="block opacity-70">Inversión Base / Mts</span>
            <span className="text-sahara-charcoal font-semibold">${calculation.baseRate.toFixed(2)}</span>
          </div>
          <div className="text-[11px] text-sahara-charcoal/60">
            <span className="block opacity-70">Cargos Adicionales</span>
            <span className="text-sahara-charcoal font-semibold">${calculation.extraFees.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sahara-charcoal/40 mb-1">Inversión Estimada</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-sahara-charcoal tracking-tight">${calculation.total.toFixed(2)}</span>
              <span className="text-xs text-sahara-charcoal/40 font-bold tracking-widest">USD</span>
            </div>
          </div>
          <div className="flex-1 md:max-w-[240px] w-full">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/584122126159" 
              target="_blank" 
              className="block w-full bg-emerald-green text-white py-4 rounded-lg font-bold text-xs uppercase tracking-[0.2em] shadow-lg text-center"
            >
              RESERVAR
            </motion.a>
            <p className="text-center text-[9px] text-sahara-charcoal/40 mt-2 uppercase tracking-widest font-bold">
              Respuesta inmediata vía WhatsApp
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
