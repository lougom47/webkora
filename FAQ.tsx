import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "¿Cuál es la diferencia entre contratar a KORA y el sector informal?",
    answer: "A diferencia del sector informal, nosotros asumimos directamente la logística del transporte privado, alimentación y supervisión del talento. Operamos con suministros premium propios. Usted no actúa como empleador; simplemente activa el protocolo y recibe resultados."
  },
  {
    question: "¿Debo suministrar insumos o comida al personal?",
    answer: "NO. Nosotros proveemos todos los insumos químicos, herramientas y la alimentación de nuestras especialistas. Su única responsabilidad es permitir el acceso a la residencia en el horario pautado; nosotros nos encargamos del resto."
  },
  {
    question: "¿Cómo garantizan la privacidad de mi casa?",
    answer: "La confidencialidad es nuestro estándar más estricto. Está estrictamente prohibido tomar fotografías, videos o registros digitales del interior de tu residencia, fachadas u objetos personales."
  },
  {
    question: "¿Por qué no manipulan objetos de valor o piezas de arte?",
    answer: "Estos activos requieren expertos en conservación técnica que exceden el ámbito de la limpieza profesional. Esta política evita malentendidos y protege la integridad de su patrimonio. El cliente debe resguardar sus activos críticos antes de la visita."
  },
  {
    question: "¿Cómo sé si debo escoger entre Sinfonía de Orden o Restauración Vital?",
    answer: "Sinfonía de Orden es ideal para mantenimiento recurrente de espacios ya controlados. Restauración Vital es una intervención técnica profunda, recomendada para mudanzas o rescate de superficies (juntas, sarro, grasa acumulada)."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default second open like in screen

  return (
    <section id="faq" className="bg-sahara-sandstone py-24 px-4 md:px-margin-desktop">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-display-lg font-bold text-sahara-charcoal uppercase tracking-[0.2em] mb-16 text-center">
          PREGUNTAS FRECUENTES
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-[#f5f5f2] rounded-[32px] overflow-hidden px-8 border border-white/40 shadow-sm transition-all duration-300 ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="w-full flex justify-between items-center py-8 text-left group cursor-pointer"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-xl md:text-2xl font-bold text-sahara-charcoal">{faq.question}</span>
                <ChevronDown className={`w-8 h-8 text-sahara-charcoal shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="text-lg md:text-xl text-sahara-charcoal/70 leading-relaxed pb-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
