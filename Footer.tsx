import { Mail, MapPin, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <section className="bg-sahara-white px-4 md:px-margin-desktop py-20 border-t border-sahara-charcoal/5">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          {/* Vertical Divider (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-sahara-charcoal/10"></div>
          
          {/* Left Column */}
          <div className="flex flex-col gap-12">
            <div className="text-4xl tracking-[0.3em] font-['Montserrat'] font-medium uppercase text-sahara-charcoal">KORA</div>
            <div className="flex flex-col gap-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sahara-charcoal/60">CANALES DE ATENCIÓN:</h3>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4 group">
                  <Mail className="w-5 h-5 text-sahara-greige group-hover:text-sahara-charcoal transition-colors" />
                  <a className="text-sm uppercase tracking-wider text-sahara-charcoal hover:opacity-70 transition-opacity font-medium" href="mailto:contacto@kora.com">contacto@kora.com</a>
                </li>
                <li className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-sahara-greige" />
                  <span className="text-sm uppercase tracking-wider text-sahara-charcoal font-medium">Caracas, Venezuela</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <Smartphone className="w-5 h-5 text-sahara-greige group-hover:text-sahara-charcoal transition-colors" />
                  <a className="text-sm uppercase tracking-wider text-sahara-charcoal hover:opacity-70 transition-opacity font-medium" href="https://wa.me/584122126159" target="_blank" rel="noopener noreferrer">+584122126159</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sahara-charcoal/60">ENLACES RÁPIDOS:</h3>
              <nav className="flex flex-col gap-4">
                <a className="text-sm uppercase tracking-wider text-sahara-charcoal hover:opacity-70 transition-opacity font-medium" href="#servicios">Servicios</a>
                <a className="text-sm uppercase tracking-wider text-sahara-charcoal hover:opacity-70 transition-opacity font-medium" href="#metodo">MÉTODO KORA</a>
                <a className="text-sm uppercase tracking-wider text-sahara-charcoal hover:opacity-70 transition-opacity font-medium" href="#">QUIERO TRABAJAR EN KORA</a>
              </nav>
            </div>
            
            <div className="pt-8 border-t border-sahara-charcoal/10">
              <p className="text-[10px] leading-relaxed text-sahara-charcoal/50 text-justify uppercase font-medium">
                Corporación Kora Global, C.A. garantiza que el tratamiento de los datos personales de nuestros clientes se realiza bajo estricto cumplimiento del <strong>Artículo 60 de la Constitución de la República</strong>. Dada la naturaleza de inmersión técnica en hogares, aplicamos un protocolo de <strong>Secreto Profesional</strong> sobre toda información, ubicación o detalle operativo del inmueble. Los datos recolectados a través de nuestro cotizador tienen como único fin la gestión logística del servicio y no serán compartidos, vendidos ni transferidos a terceros.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-footer-bg text-sahara-charcoal px-4 md:px-margin-desktop border-t border-sahara-charcoal/5">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl tracking-[0.2em] uppercase font-['Montserrat'] font-medium">KORA</span>
          <p className="text-[10px] opacity-60 text-center uppercase tracking-widest font-bold">
            2019 KORA™ Premium Residential Cleaning. Servicio de limpieza en Caracas.
          </p>
        </div>
      </footer>
    </>
  );
}
