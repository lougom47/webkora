/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Check, X, ArrowRight, Instagram, Phone, Mail, 
  Calendar, CheckCircle2, ChevronRight, Heart, 
  Sliders, Smile, Star, Volume2, VolumeX, Menu, Clock, HelpCircle, Eye, Info
} from 'lucide-react';
import { MEMBERSHIPS, COMPARISONS, AROMAS, REVIEWS } from './data';
import { MembershipPlan, BookingState, InteractiveBubble } from './types';
import cozyMotherAndChildImg from './assets/images/cozy_mother_and_child_1780778271477.png';
import pinkCleaningHeroImg from './assets/images/pink_cleaning_hero_1780778480877.png';

export default function App() {
  // Bubbles state
  const [bubbles, setBubbles] = useState<InteractiveBubble[]>([]);
  const [bubbleCount, setBubbleCount] = useState<number>(18);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [bubblesPopped, setBubblesPopped] = useState<number>(0);
  
  // Interactive Booking drawer
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingFormData, setBookingFormData] = useState<BookingState>({
    name: '',
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    email: '',
    instagram: '',
    phone: '',
    planId: 'main-character',
    rooms: '',
    vibeLevel: '',
    aroma: 'ocean',
    notes: '',
    bestieCode: '',
    confirmed: false
  });
  
  const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>({});
  
  // Custom interactive features
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number>(0);
  const [filterType, setFilterType] = useState<'all' | 'included' | 'not-included'>('all');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Monitor scroll for glass navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio API Synthesizer pop sound
  const playPopSound = () => {
    if (isAudioMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1300, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.09);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Browser blocked or unsupported
    }
  };

  // Seed and animate interactive bubbles
  useEffect(() => {
    const initialBubbles: InteractiveBubble[] = Array.from({ length: bubbleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      y: Math.random() * 100, // randomized vertical starting points
      size: Math.random() * 80 + 35, // size ranges 35px to 115px
      speed: Math.random() * 0.4 + 0.15,
      colorType: 'clear',
      swayArg: Math.random() * 100,
      swaySpeed: Math.random() * 0.05 + 0.01
    }));
    setBubbles(initialBubbles);
  }, [bubbleCount]);

  // Bubble animation loop using lightweight timer
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let newY = bubble.y + bubble.speed;
          let newSwayArg = bubble.swayArg + bubble.swaySpeed;
          let newX = bubble.x + Math.sin(newSwayArg) * 0.15;

          // Wrap around if floated off top limit
          if (newY > 105) {
            newY = -12;
            newX = Math.random() * 95;
          }

          return {
            ...bubble,
            y: newY,
            x: Math.min(Math.max(newX, 1), 99),
            swayArg: newSwayArg
          };
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Pop handler
  const handlePopBubble = (id: number) => {
    playPopSound();
    setBubblesPopped(prev => prev + 1);
    setBubbles((prevBubbles) =>
      prevBubbles.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            y: -15, // fly index to reset positioning
            x: Math.random() * 95,
            size: Math.random() * 80 + 35,
            speed: Math.random() * 0.4 + 0.15
          };
        }
        return b;
      })
    );
  };

  // Quick manual spawn bubble
  const handleAddNewBubble = () => {
    setBubbles((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: Math.random() * 95,
        y: -5,
        size: Math.random() * 70 + 40,
        speed: Math.random() * 0.4 + 0.2,
        colorType: 'clear',
        swayArg: Math.random() * 10,
        swaySpeed: 0.03
      }
    ]);
  };

  // Form Submission
  const handleOpenBooking = (planId: string) => {
    setBookingFormData(prev => ({ ...prev, planId }));
    setIsBookingOpen(true);
  };

  const handleQuizLevelSelect = (level: 'basico' | 'fresh' | 'main-character') => {
    setQuizAnswer(level);
    setTimeout(() => {
      const element = document.getElementById(`plan-${level}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, boolean> = {};
    if (!bookingFormData.firstName.trim()) errors.firstName = true;
    if (!bookingFormData.lastName.trim()) errors.lastName = true;
    if (!bookingFormData.secondLastName.trim()) errors.secondLastName = true;
    if (!bookingFormData.email.trim()) errors.email = true;
    if (!bookingFormData.phone.trim()) errors.phone = true;
    if (!bookingFormData.rooms.trim()) errors.rooms = true;
    if (!bookingFormData.vibeLevel.trim()) errors.vibeLevel = true;

    setInvalidFields(errors);

    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      // Find the first invalid element and scroll it into view, focusing on it
      const firstErrorField = errorFields[0];
      const elementId = 
        firstErrorField === 'rooms' 
          ? 'booking-rooms-container' 
          : firstErrorField === 'vibeLevel'
            ? 'booking-vibe-container'
            : `booking-${firstErrorField}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (firstErrorField !== 'rooms' && firstErrorField !== 'vibeLevel') {
          element.focus();
        }
      }
      return;
    }

    // Combine names for bookingFormData.name to keep components compatible
    const fullName = [
      bookingFormData.firstName.trim(),
      bookingFormData.secondName.trim(),
      bookingFormData.lastName.trim(),
      bookingFormData.secondLastName.trim()
    ].filter(Boolean).join(' ');

    setBookingFormData(prev => ({ 
      ...prev, 
      name: fullName,
      confirmed: true 
    }));
    
    // Smoothly redirect to WhatsApp in a new tab
    setTimeout(() => {
      const url = getWhatsappLink(fullName);
      window.open(url, '_blank', 'noreferrer,noopener');
    }, 50);
  };

  // Get current plan info for helper
  const selectedPlanInfo = MEMBERSHIPS.find(m => m.id === bookingFormData.planId) || MEMBERSHIPS[2];

  // Predicate filtering comparisons list
  const filteredComparisons = COMPARISONS.filter(item => {
    if (filterType === 'all') return true;
    if (filterType === 'included') return item.included === true;
    return item.included === false;
  });

  // Prefilled message helper for Whatsapp integration
  const getWhatsappLink = (computedName?: string) => {
    const selectedPlan = MEMBERSHIPS.find(m => m.id === bookingFormData.planId);
    const chosenAroma = AROMAS.find(a => a.id === bookingFormData.aroma)?.name || 'Fresh Cotton 🧺';
    
    const displayName = computedName || [
      bookingFormData.firstName.trim(),
      bookingFormData.secondName.trim(),
      bookingFormData.lastName.trim(),
      bookingFormData.secondLastName.trim()
    ].filter(Boolean).join(' ') || bookingFormData.name;

    const text = encodeURIComponent(
      `¡Hola KORA! ✨\n\n` +
      `Me encantaría reservar mi servicio de limpieza recurrente. Aquí tienes los detalles de mi reserva:\n\n` +
      `📝 *DATOS DEL CLIENTE*\n` +
      `• *Nombre Completo:* ${displayName}\n` +
      `• *Correo Electrónico:* ${bookingFormData.email}\n` +
      `• *WhatsApp:* ${bookingFormData.phone}\n` +
      `• *Instagram:* ${bookingFormData.instagram || 'No especificado'}\n\n` +
      `🏠 *DETALLES DEL SERVICIO*\n` +
      `• *Membresía:* ${selectedPlan?.name || 'Main Character'} (Desde $${selectedPlan?.price || 28} x sesión)\n` +
      `• *Tamaño de la Casa:* ${bookingFormData.rooms}\n` +
      `• *Nivel de Vibe:* ${bookingFormData.vibeLevel}\n` +
      `• *Aroma para Trapeado:* ${chosenAroma}\n` +
      `• *Instrucciones Especiales:* ${bookingFormData.notes || 'Ninguna'}\n` +
      (bookingFormData.bestieCode ? `• *Código de Descuento:* ${bookingFormData.bestieCode}\n` : '') +
      `\n¿Tienen disponibilidad para agendar? ¡Muchas gracias! 🌸`
    );
    return `https://wa.me/584122126159?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-kora-bg text-kora-dark transition-colors duration-300 font-sans antialiased overflow-x-hidden selection:bg-primary-container selection:text-accent">
      
      {/* Sparkles Ambient Background Elements */}
      <div className="absolute top-48 right-12 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-6 w-80 h-80 bg-soft-pink/15 rounded-full blur-[80px] pointer-events-none" />

      {/* FIXED GLASS NAVIGATION BAR */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 55 
          ? 'top-3 max-w-[94%] md:max-w-[1080px] mx-auto rounded-2xl md:rounded-full bg-white/25 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(158,24,43,0.05),_inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/40 py-2' 
          : 'top-0 max-w-full bg-white/10 backdrop-blur-md border-b border-white/20 py-4'
      }`} id="top_nav">
        <div className="max-w-[1140px] mx-auto px-6 flex justify-between items-center w-full">
          {/* Logo Brand Montserrat - Normal weight, NOT bold as requested */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="font-display font-light text-[32px] tracking-[0.2em] text-[#9e182b] transition-transform duration-300 hover:scale-105">
              KORA
            </span>
            <span className="font-display text-[8px] tracking-[0.45em] text-[#9e182b] uppercase ml-[4px]">
              clean wellness
            </span>
          </div>

          {/* Desktop Nav Controls */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#inicio" className="text-sm font-medium tracking-wider text-accent border-b border-accent/40 pb-1 transition-all">Inicio</a>
            <a href="#servicio" className="text-sm font-medium tracking-wider text-kora-dark/80 hover:text-accent transition-colors duration-300">Servicio de Mantenimiento</a>
            <a href="#membresias" className="text-sm font-medium tracking-wider text-kora-dark/80 hover:text-accent transition-colors duration-300">Membresías Kora</a>
            <a href="#testimonios" className="text-sm font-medium tracking-wider text-kora-dark/80 hover:text-accent transition-colors duration-300">Bestie Reviews</a>
            
            <button 
              onClick={() => handleOpenBooking('main-character')}
              id="nav_booking_btn"
              className="bg-accent text-white hover:bg-[#b01e33] active:scale-95 px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md shadow-accent/10"
            >
              RESERVAR
            </button>
          </div>

          {/* Mobile controllers */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsAudioMuted(!isAudioMuted)} 
              className="p-1 px-2.5 rounded-full border border-primary-container/40 text-accent hover:bg-white transition-colors"
              title={isAudioMuted ? "Activar pop sónico" : "Silenciar pop"}
            >
              {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-accent focus:outline-none"
              id="mobile_menu_trigger"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu sheet */}
        {mobileMenuOpen && (
          <div className={`absolute left-0 right-0 p-6 shadow-2xl flex flex-col gap-4 md:hidden z-40 transition-all duration-300 animate-fade-in ${
            scrollPosition > 55
              ? 'top-[56px] bg-white/75 backdrop-blur-xl border border-white/50 rounded-2xl mx-1 shadow-[0_12px_40px_-5px_rgba(158,24,43,0.06)]'
              : 'top-16 bg-white/75 backdrop-blur-xl border-b border-white/30'
          }`}>
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-accent border-b border-primary-container/20"
            >
              Inicio
            </a>
            <a 
              href="#servicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-kora-dark/90 hover:text-accent border-b border-primary-container/20"
            >
              Servicio de Mantenimiento
            </a>
            <a 
              href="#membresias" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-kora-dark/90 hover:text-accent border-b border-primary-container/20"
            >
              Membresías Kora
            </a>
            <a 
              href="#testimonios" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-kora-dark/90 hover:text-accent border-b border-primary-container/20"
            >
              Bestie Reviews
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking('main-character');
              }}
              className="w-full bg-accent text-white py-3 rounded-full text-sm font-semibold uppercase tracking-widest mt-2"
            >
              RESERVAR AHORA 💖
            </button>
          </div>
        )}
      </nav>

      {/* SECTION 1: HERO - SOPIER BUBBLE ANIMATION WITH SPLENDID BRAND CONTRAST */}
      <section 
        className="relative min-h-[96vh] flex items-center pt-28 overflow-hidden bg-primary-container" 
        id="inicio"
      >
        {/* Soap bubble dynamic physics layer - Elevado a z-30 para que sean clicables sobre todo el contenido sin bloquear texto */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden" id="soap_canvas">
          {bubbles.map((b) => (
            <div
              key={b.id}
              onClick={(e) => {
                e.stopPropagation();
                handlePopBubble(b.id);
              }}
              className="soap-bubble"
              style={{
                left: `${b.x}%`,
                bottom: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                filter: 'none',
                opacity: 0.75,
                transition: 'left 0.1s ease-out, bottom 0.1s ease-out'
              }}
            />
          ))}
        </div>

        {/* INTEGRACIÓN DE FOTOGRAFÍA AL FONDO Y A LA IZQUIERDA EN ESPACIO COMPLETO */}
        {/* Left background absolute block, gradient fades into #f9cbd6 background smoothly */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full md:w-3/5 h-full opacity-35 md:opacity-90">
            <img 
              src={pinkCleaningHeroImg} 
              alt="Estilo de limpieza elegante con productos rosas" 
              className="w-full h-full object-cover object-left md:object-center"
              style={{ mixBlendMode: 'multiply' }}
              referrerPolicy="no-referrer"
            />
            {/* Soft pink visual gradients for extreme aesthetics refinement */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/20 via-primary-container/50 to-[#f9cbd6] hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f9cbd6] via-transparent to-transparent md:hidden" />
          </div>
          {/* Outer pink backdrop */}
          <div className="absolute top-0 right-0 w-full md:w-2/5 h-full bg-[#f9cbd6]" />
        </div>

        {/* HERO CONTENT: ELEGANT CONTRAST IN ACCENT RED (#9e182b) OVER BACKGROUND PINK (#f9cbd6) */}
        <div className="max-w-[1140px] mx-auto px-6 w-full z-20 grid grid-cols-1 md:grid-cols-12 relative animate-fade-in">
          <div className="md:col-start-6 md:col-span-7 lg:col-start-7 lg:col-span-6 flex flex-col text-left py-12 md:pb-20 md:pt-8 md:-translate-y-10 transition-transform duration-300">
            
            {/* Top brand accent flag */}
            <div className="inline-flex items-center gap-2 mb-4 bg-white/45 backdrop-blur-md px-4.5 py-1.5 rounded-full border border-white/40 self-start">
              <Sparkles size={13} className="text-accent animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase font-display">
                Mantenimiento de Alto Estándar
              </span>
            </div>

            {/* Brand Title: Montserrat, Prominent font size, NOT in bold (no negritas), color #9e182b */}
            <h1 className="font-display font-light text-[64px] sm:text-[80px] lg:text-[100px] leading-none text-accent tracking-[0.1em] mb-4 drop-shadow-sm select-none">
              KORA
            </h1>

            {/* Subheading: color #9e182b */}
            <p className="font-display font-light text-lg sm:text-xl lg:text-2xl text-[#9e182b] max-w-xl leading-relaxed italic mb-4">
              Mantenimiento recurrente para tu casita. Nos encargamos de todo: desde el personal hasta los insumos, para que tu espacio siempre esté impecable.
            </p>

            <p className="font-sans text-sm text-[#9e182b]/80 max-w-md leading-relaxed mb-8">
              Cero estrés, cero complicaciones. Solo el vibe de orden y frescura que mereces disfrutar.
            </p>

            {/* Premium action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button 
                onClick={() => handleOpenBooking('main-character')}
                id="hero_cta_booking"
                className="bg-accent text-white hover:bg-[#801322] hover:shadow-xl active:scale-98 px-9 py-4 rounded-full font-display text-xs font-semibold uppercase tracking-widest transition-all text-center shadow-lg shadow-accent/20"
              >
                QUIERO AGENDAR
              </button>
              <a 
                href="#membresias"
                className="border border-[#9e182b]/40 text-[#9e182b] bg-white/20 backdrop-blur-sm hover:bg-white/40 active:scale-98 px-9 py-4 rounded-full font-display text-xs font-semibold uppercase tracking-widest transition-all text-center"
              >
                VER MEMBRESÍAS
              </a>
            </div>

            {/* Pure aesthetic interactive panel for bubble play */}
            <div className="mt-14 p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 max-w-sm flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="block text-[10px] font-bold text-accent font-display uppercase tracking-wider">¿Relajada, Bestie? ✨</span>
                <span className="text-[12px] text-[#9e182b]/80">Popped: <b className="font-bold">{bubblesPopped}</b> burbujitas</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleAddNewBubble}
                  className="px-3.5 py-1.5 bg-white/60 hover:bg-white text-accent rounded-full text-[11px] font-bold font-display uppercase tracking-wider transition-all"
                  title="Añadir más burbujas al flujo"
                >
                  + burbujas 🧴
                </button>
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="p-2 bg-white/40 text-accent rounded-full hover:bg-white/75 transition-all text-sm"
                  title={isAudioMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isAudioMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: RITUAL DE MANTENIMIENTO - DESIGNED FOR FANCY, INFLUENCER, PINTEREST-ADDICT BUYER PERSONA */}
      <section className="py-24 sm:py-32 relative bg-kora-bg" id="servicio">
        
        {/* Floating background decorative cards */}
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.3em] text-accent font-display uppercase mb-4">
              WELLNESS CLEAN
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-accent tracking-wide uppercase">
              Limpieza de Mantenimiento
            </h2>
            <div className="w-24 h-[1.5px] bg-[#f2afbc] mt-5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Description Text Column inside interactive glassmorphic card */}
            <div className="lg:col-span-7">
              <div className="bg-white/40 border border-primary-container/30 backdrop-blur-md p-8 sm:p-12 rounded-[40px] shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                
                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                  <span className="text-6xl text-accent font-display font-light">💡</span>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-1.5 text-accent text-xs tracking-widest font-semibold font-display uppercase bg-accent/5 px-3 py-1 rounded-full w-max">
                    <Heart size={12} className="fill-accent text-accent" />
                    DISEÑADO PARA TU PAZ MENTAL
                  </div>

                  <p className="font-sans text-base sm:text-lg text-kora-dark/90 leading-relaxed">
                    Diseñado para la mujer que valora su tiempo y la estética de su hogar. Nos especializamos exclusivamente en limpieza de mantenimiento. Hemos creado este servicio pensando en ti: que amas tener tu espacio limpio y fresco, pero no necesitas ni quieres pagar por limpiezas profundas o de mudanza.
                  </p>

                  <div className="bg-[#fdebdc]/50 p-6 rounded-2xl border border-[#f2e0d2] text-xs space-y-3">
                    <span className="font-display font-bold text-[#b01e33] uppercase tracking-wider block">💌 ESTE SERVICIO ES PARA TI SI ERES...</span>
                    <p className="text-kora-dark/80 italic leading-relaxed">
                      La CEO de tu propio emprendimiento, trabajas mientras haces malabares con el tiempo que te queda y/o tienes la energía inagotable de un toddler en casa. Amas tener un espacio armónico, pero entre los correos, las llamadas o la maternidad, lo que menos quieres es pasar tu preciado fin de semana limpiando. Tu mayor deseo es un viernes encontrar tu casita impecable, fresca y lista para descansar. KORA es esa ayudita profesional que te devuelve tu tiempo y alivia tu carga mental.
                    </p>
                  </div>

                  {/* Bullet points mapping */}
                  <ul className="space-y-4 pt-2">
                    <li className="flex items-start gap-4">
                      <span className="w-9 h-9 rounded-full bg-[#fdebdc] flex items-center justify-center text-accent shrink-0 border border-primary-container/40">
                        <Check size={14} className="stroke-[3]" />
                      </span>
                      <div>
                        <span className="font-display font-bold text-sm block">El Descanso que Mereces</span>
                        <span className="font-sans text-xs text-kora-dark/70">Delega el mantenimiento de tu hogar sin agobios. Ahorra tiempo y esfuerzo con una solución práctica y confiable desde solo $30. Tu fin de semana es para ti, no para trapear.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-9 h-9 rounded-full bg-[#febac7]/50 flex items-center justify-center text-accent shrink-0 border border-primary-container/40">
                        <Check size={14} className="stroke-[3]" />
                      </span>
                      <div>
                        <span className="font-display font-bold text-sm block">Armonía en tu Caos Diario</span>
                        <span className="font-sans text-xs text-kora-dark/70">Para que, entre juguetes o el trabajo, tu espacio mantenga siempre ese orden visual que necesitas para pensar con claridad y fluir en tu rutina.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-9 h-9 rounded-full bg-primary-container/40 flex items-center justify-center text-accent shrink-0 border border-primary-container/40">
                        <Check size={14} className="stroke-[3]" />
                      </span>
                      <div>
                        <span className="font-display font-bold text-sm block">Cero Carga Mental</span>
                        <span className="font-sans text-xs text-kora-dark/70">Nosotras ponemos el talento y las herramientas. Llevamos todo incluyendo los insumos de limpieza. Tu única tarea es abrir la puerta, soltar el estrés y relajarte.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="pt-6 border-t border-primary-container/30">
                    <p className="italic text-accent/90 font-display font-light text-xs leading-relaxed mb-6">
                      *Proveemos el transporte, las herramientas, los insumos y la alimentación de nuestro talento. Nos encargamos de todo el proceso para que tú no tengas que preocuparte por absolutamente nada.
                    </p>
                    <button
                      onClick={() => handleOpenBooking('main-character')}
                      className="inline-flex items-center gap-2 text-accent font-display text-xs font-semibold uppercase tracking-widest border-b-2 border-accent pb-1 hover:gap-4 transition-all duration-300"
                    >
                      AGENDA TU RESPIRO DESDE $30 <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Visual Column / Gallery Board - Pinterest Inspired */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              <div className="space-y-4">
                {/* Image 1: Aesthetic workspace with Macbook, Coffee, Pink Notes - TU SANTUARIO */}
                <div 
                  className="rounded-[30px] overflow-hidden aspect-[3/4] border border-[#f2afbc]/30 relative group shadow-sm transition-transform duration-500 hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredCard('workspace')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600&h=800" 
                    alt="Aesthetic workspace desk MacBook and coffee" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] tracking-widest uppercase font-display text-white">TU SANTUARIO ✨</span>
                  </div>
                </div>

                <div className="rounded-full bg-warm-neutral/80 backdrop-blur-sm border border-[#f2e0d2] p-4 text-center text-accent font-display text-xs font-semibold uppercase tracking-widest hover:scale-105 transition-transform">
                  TU SANTUARIO ✨
                </div>
              </div>

              <div className="space-y-4 pt-10">
                <div className="rounded-full bg-[#febac7]/50 backdrop-blur-sm border border-[#febac7]/30 p-4 text-center text-accent font-display text-xs font-semibold uppercase tracking-widest hover:scale-105 transition-transform">
                  PAZ MENTAL ☁️
                </div>

                {/* Image 2: Young chic mother hugging child on a clean sofa - PAZ MENTAL */}
                <div 
                  className="rounded-[30px] overflow-hidden aspect-[3/4] border border-[#f2afbc]/30 relative group shadow-sm transition-transform duration-500 hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredCard('relaxing')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    src={cozyMotherAndChildImg} 
                    alt="Cozy chic mother and child cuddle on sofa seen from behind" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] tracking-widest uppercase font-display text-white">PAZ MENTAL ☁️</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* INTERACTIVE COMPONENT: "Pinterest Comparison Game & Do's / Don'ts" */}
          <div className="mt-20 sm:mt-28 bg-white/30 rounded-3xl p-6 sm:p-10 border border-primary-container/25">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#9e182b] font-display uppercase block mb-1">El checklist de tu paz mental</span>
              <h3 className="font-display font-light text-xl sm:text-2xl text-accent">¿Qué incluye nuestro servicio Kora? 🧼</h3>
              <p className="text-xs text-kora-dark/70 mt-2">
                Para que la experiencia quede súper transparente, aquí te explicamos minuciosamente qué tocamos con amor de mantenimiento versus las tareas pesadas y las tareas que no realizamos.
                <span className="block mt-2 font-medium">Mantenlo cute, mantenlo Kora.</span>
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex justify-center gap-2 mb-8">
              <button 
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                  filterType === 'all' 
                    ? 'bg-accent text-white' 
                    : 'bg-white text-kora-dark/80 hover:bg-white/70 border border-primary-container/20'
                }`}
              >
                Todos los puntos 🔍
              </button>
              <button 
                onClick={() => setFilterType('included')}
                className={`px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                  filterType === 'included' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white text-kora-dark/80 hover:bg-white/70 border border-primary-container/20'
                }`}
              >
                Lo que SÍ hacemos ✨
              </button>
              <button 
                onClick={() => setFilterType('not-included')}
                className={`px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                  filterType === 'not-included' 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-white text-kora-dark/80 hover:bg-white/70 border border-primary-container/20'
                }`}
              >
                Lo que NO hacemos, sorry 💅
              </button>
            </div>

            {/* Interactive Grid of Activities comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComparisons.map((item) => (
                <div 
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    item.included 
                      ? 'bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50/70' 
                      : 'bg-rose-50/40 border-rose-100 hover:bg-rose-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {item.included ? (
                      <span className="px-2.5 py-1 text-[9px] font-bold font-display uppercase bg-emerald-100 text-emerald-800 rounded-full">
                        Lo que SÍ un amor
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[9px] font-bold font-display uppercase bg-rose-100 text-rose-800 rounded-full">
                        No incluido, xoxo
                      </span>
                    )}
                    <h4 className="font-display font-bold text-sm tracking-tight text-kora-dark leading-tight">{item.activity}</h4>
                  </div>
                  <p className="text-xs text-kora-dark/70 pl-2 border-l border-kora-dark/10 leading-relaxed italic">
                    "{item.explanation}"
                  </p>
                </div>
              ))}
            </div>

            {/* Extra call to action helper */}
            <div className="mt-8 text-center">
              <span className="text-xs text-kora-dark/60 block mb-2">¿Tienes una duda bien específica, Bestie?</span>
              <a 
                href="https://wa.me/584122126159" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline"
              >
                Pregúntanos por WhatsApp directo de confianza 📲
              </a>
            </div>
          </div>

          {/* INTERACTIVE QUIZ INTEGRATION FOR BESTIES */}
          <div className="mt-16 bg-[#fdebdc]/40 rounded-3xl p-6 sm:p-10 border border-[#f2e0d2]">
            <h4 className="font-display text-accent text-lg font-light text-center mb-4">🔮 Encuentra tu Frecuencia Kora Ideal (Quick Quiz)</h4>
            <p className="text-xs text-center text-kora-dark/80 max-w-lg mx-auto mb-8">
              Responde con total sinceridad sobre tu nivel de obsesión con la pulcritud y te calculamos el plan predilecto.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => handleQuizLevelSelect('basico')}
                className={`p-5 rounded-2xl bg-white border text-left transition-all hover:border-[#9e182b]/50 ${
                  quizAnswer === 'basico' ? 'border-[#9e182b] ring-2 ring-[#9e182b]/10 bg-[#fdebdc]/20 shadow-md' : 'border-primary-container/20'
                }`}
              >
                <span className="block text-xl mb-2">☕</span>
                <span className="font-display font-bold text-xs uppercase text-accent tracking-wider block mb-1">Nivel 1: Relajada Casual</span>
                <p className="text-xs text-kora-dark/70">"La verdad limpio yo un poquito los fines de semana, solo quiero que venga alguien pro una vez al mes para resetear."</p>
              </button>

              <button 
                onClick={() => handleQuizLevelSelect('fresh')}
                className={`p-5 rounded-2xl bg-white border text-left transition-all hover:border-[#9e182b]/50 ${
                  quizAnswer === 'fresh' ? 'border-[#9e182b] ring-2 ring-[#9e182b]/10 bg-[#fdebdc]/20 shadow-md' : 'border-primary-container/20'
                }`}
              >
                <span className="block text-xl mb-2">🛋️</span>
                <span className="font-display font-bold text-xs uppercase text-accent tracking-wider block mb-1">Nivel 2: Pinterest Standard</span>
                <p className="text-xs text-kora-dark/70">"Amo vivir bonito pero no tengo tiempo. Los fines de semana salgo a desayunar matcha y leer libros. Cada 15 días me viene genial."</p>
              </button>

              <button 
                onClick={() => handleQuizLevelSelect('main-character')}
                className={`p-5 rounded-2xl bg-white border text-left transition-all hover:border-[#9e182b]/50 ${
                  quizAnswer === 'main-character' ? 'border-[#9e182b] ring-2 ring-[#9e182b]/10 bg-[#fdebdc]/20 shadow-md' : 'border-primary-container/20'
                }`}
              >
                <span className="block text-xl mb-2">🕯️</span>
                <span className="font-display font-bold text-xs uppercase text-accent tracking-wider block mb-1">Nivel 3: Obsessive Vibe-Check</span>
                <p className="text-xs text-kora-dark/70">"Quiero que mi cuarto luzca impecable los 7 días. Si hay polvo me estreso. Membresía semanal o dos veces por semana, por fa."</p>
              </button>
            </div>

            {quizAnswer && (
              <div className="mt-8 bg-white p-6 rounded-2xl border border-primary-container text-center animate-fade-in">
                <span className="font-display text-xs font-bold text-[#9e182b] tracking-widest uppercase block mb-1">¡Resultado de tu Quiz Místico! ✨</span>
                {quizAnswer === 'basico' && (
                  <div>
                    <h5 className="font-display font-bold text-lg text-accent">Sugerimos el plan: Básico Recurrente</h5>
                    <p className="text-xs text-kora-dark/80 mt-2 max-w-md mx-auto">Justo para resetear tu casita 1 vez al mes por tan solo $30 por sesión. Te mantiene libre para tus quehaceres habituales.</p>
                  </div>
                )}
                {quizAnswer === 'fresh' && (
                  <div>
                    <h5 className="font-display font-bold text-lg text-accent">Sugerimos el plan: Fresh Home</h5>
                    <p className="text-xs text-kora-dark/80 mt-2 max-w-md mx-auto">Cada 15 días es la frecuencia perfecta para departamentos medianos donde vive 1 o 2 personas activas. ¡Tu mejor aliada de quincena!</p>
                  </div>
                )}
                {quizAnswer === 'main-character' && (
                  <div>
                    <h5 className="font-display font-bold text-lg text-[#9e182b]">Sugerimos el plan: Main Character 🔥</h5>
                    <p className="text-xs text-kora-dark/80 mt-2 max-w-md mx-auto">Como vives bajo la luz de los reflectores, mereces el estándar semanal de $28 por sesión. Olvídate del aseo y luce tu espacio en Instagram Stories diario.</p>
                  </div>
                )}
                <button
                  onClick={() => handleOpenBooking(quizAnswer)}
                  className="mt-4 px-6 py-2 bg-accent text-white text-xs font-display uppercase tracking-widest rounded-full hover:bg-accent/80 transition-all font-bold"
                >
                  Agendar este Plan Sugerido 🛍️
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 3: BENTO GRID MEMBRESÍAS KORA */}
      <section className="py-24 sm:py-32 relative bg-surface-container-low" id="membresias">
        <div className="max-w-[1140px] mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.3em] text-accent font-display uppercase mb-4">
              LIFESTYLE SUBSCRIPTION
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-accent tracking-wide uppercase">
              Membresías Kora
            </h2>
            <div className="w-24 h-[1.5px] bg-[#f2afbc] mt-5" />
            <p className="font-sans text-sm text-kora-dark/85 text-center mt-8 max-w-2xl leading-relaxed">
              Eleva tu estándar de vida con un hogar siempre impecable. Nuestras suscripciones están diseñadas para que el bienestar sea tu estado natural, no una tarea pendiente.
            </p>
          </div>

          {/* Interactive Pricing/Feature Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {MEMBERSHIPS.map((plan) => (
              <div 
                key={plan.id}
                id={`plan-${plan.id}`}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-white/50 backdrop-blur-md rounded-[30px] p-8 flex flex-col h-full border transition-all duration-500 ease-in-out ${
                  plan.id === 'main-character'
                    ? 'border-[#9e182b] bg-white/85 shadow-2xl z-10 animate-glow-pulse'
                    : plan.isPopular 
                    ? 'border-[#9e182b] ring-2 ring-[#9e182b]/10 bg-white/70 shadow-xl lg:scale-[1.04] z-10' 
                    : 'border-primary-container/30 hover:border-accent/40 shadow-sm hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Popular label flag */}
                {plan.isPopular && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse font-display flex items-center gap-1">
                    Most Popular <Sparkles size={10} className="animate-spin text-white duration-1000" />
                  </div>
                )}

                {plan.id === 'main-character' && (
                  <div className="absolute -top-3 left-6 bg-amber-400 text-kora-dark text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-display flex items-center gap-1 shadow-md animate-bounce">
                    <Sparkles size={10} className="text-kora-dark fill-kora-dark" /> VIBE SUPREMA 🔥
                  </div>
                )}

                {/* Card Title info */}
                <h3 className="font-display font-light text-2xl text-accent mb-1 tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-[11px] font-semibold tracking-[0.15em] text-kora-dark/60 font-display uppercase mb-4">
                  {plan.frequency}
                </p>

                {/* Price block */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-[11px] font-bold font-display uppercase text-kora-dark/40 tracking-wider mr-1">Desde</span>
                  <span className="font-display font-light text-4xl text-[#9e182b]">${plan.price}</span>
                  <span className="text-xs text-kora-dark/60 font-sans">/ por sesión</span>
                </div>

                {/* Vibe statement tagline */}
                <p className="text-xs text-accent italic mb-6 font-display font-light">
                  "{plan.vibeText}"
                </p>

                {/* Description */}
                <p className="font-sans text-xs text-kora-dark/80 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features Checklist */}
                <div className="flex-grow pt-4 border-t border-primary-container/20 mb-8">
                  <span className="text-[10px] font-bold font-display uppercase text-kora-dark/40 tracking-widest block mb-3">Qué incluye, Bestie:</span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-kora-dark/80">
                        <Check size={12} className="text-accent mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleOpenBooking(plan.id)}
                  className={`w-full py-3 text-center rounded-full font-display text-xs font-semibold uppercase tracking-widest transition-all ${
                    plan.isPopular 
                      ? 'bg-accent text-white hover:bg-accent/90 shadow-md shadow-accent/20' 
                      : 'bg-[#fff8f5] text-accent border border-[#9e182b]/30 hover:bg-white'
                  }`}
                >
                  SELECCIONAR ✨
                </button>
              </div>
            ))}
          </div>

          {/* Inspirational quote */}
          <div className="mt-20 text-center space-y-3">
            <p className="font-display font-light text-xl text-accent italic animate-pulse">
              "Bestie, mereces un espacio que te inspire..."
            </p>
            <p className="font-sans text-xs text-kora-dark/75 max-w-xl mx-auto leading-relaxed">
              Actualiza tu estilo de vida hoy mismo. Todas nuestras suscripciones incluyen insumos seleccionados, alimentación y transporte del personal. Cero molestias administrativas, 100% de paz estética.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: TESTIMONIOS - SOCIAL AESTHETIC PROOF */}
      <section className="py-24 sm:py-32 relative bg-kora-bg" id="testimonios">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.3em] text-accent font-display uppercase mb-4">
              AESTHETIC HAPPINESS
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-accent tracking-wide uppercase">
              Bestie Reviews
            </h2>
            <div className="w-24 h-[1.5px] bg-[#f2afbc] mt-5" />
          </div>

          {/* Review Slider Layout */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/40 border border-primary-container/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm relative">
              <span className="absolute top-6 left-6 text-6xl text-primary-container/30 pointer-events-none select-none">“</span>
              
              <div className="relative z-10 space-y-6">
                
                {/* Stars */}
                <div className="flex gap-1 justify-center sm:justify-start">
                  {Array.from({ length: REVIEWS[selectedReviewIndex].stars }).map((_, i) => (
                    <Star key={i} size={15} className="fill-[#9e182b] text-[#9e182b]" strokeWidth={0} />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-sans text-base sm:text-lg text-kora-dark/90 leading-relaxed italic text-center sm:text-left">
                  "{REVIEWS[selectedReviewIndex].comment}"
                </p>

                {/* Author profile */}
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 pt-4 border-t border-primary-container/25">
                  <div className="text-center sm:text-left">
                    <span className="font-display font-medium text-sm text-accent block">{REVIEWS[selectedReviewIndex].author}</span>
                    <span className="text-xs text-kora-dark/65 block">{REVIEWS[selectedReviewIndex].occupation}, {REVIEWS[selectedReviewIndex].age} años</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Manual Navigation Bubbles under slider */}
            <div className="flex justify-center gap-3 mt-8">
              {REVIEWS.map((review, idx) => (
                <button
                  key={review.id}
                  onClick={() => setSelectedReviewIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    idx === selectedReviewIndex 
                      ? 'bg-accent w-8' 
                      : 'bg-primary-container/60 hover:bg-primary-container'
                  }`}
                  title={`Ver reseña de ${review.author}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT: INTERACTIVE BESTIE BOOKING DRAWER / MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end animate-fade-in" id="booking_overlay">
          {/* Backdrop Click Closes */}
          <div className="absolute inset-0" onClick={() => setIsBookingOpen(false)} />

          {/* Sliding panel */}
          <div className="relative bg-kora-bg w-full max-w-lg h-full shadow-2xl flex flex-col p-6 sm:p-10 z-10 overflow-y-auto border-l border-primary-container animate-slide-left">
            
            {/* Header close */}
            <div className="flex justify-between items-center pb-6 border-b border-primary-container/25 mb-6">
              <div className="flex flex-col">
                <span className="font-display font-light text-2xl tracking-widest text-[#9e182b]">KORA CLEAN</span>
                <span className="text-[10px] text-kora-dark/60 font-mono tracking-widest uppercase mt-0.5">Bestie Booking Assistant ✨</span>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="p-2 text-accent hover:bg-white rounded-full transition-all"
                title="Cerrar"
                id="close_booking_btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success state display */}
            {bookingFormData.confirmed ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-16 h-16 bg-[#ffd9e1] rounded-full flex items-center justify-center text-accent animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                
                <h4 className="font-display font-medium text-2xl text-accent">¡Ay qué emoción, Bestie! 🎉</h4>
                
                <div className="bg-white/60 border border-primary-container/40 p-6 rounded-2xl text-xs space-y-4 max-w-sm">
                  <span className="font-display font-bold text-accent uppercase tracking-wider block">Ticket de Bienestar Residencial</span>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div>
                      <span className="block text-kora-dark/40">Cliente:</span>
                      <span className="font-semibold text-kora-dark break-words">{bookingFormData.name}</span>
                    </div>
                    <div>
                      <span className="block text-kora-dark/40">Correo:</span>
                      <span className="font-semibold text-kora-dark break-all">{bookingFormData.email}</span>
                    </div>
                    <div>
                      <span className="block text-kora-dark/40">Instagram:</span>
                      <span className="font-semibold text-kora-dark break-words">{bookingFormData.instagram || 'No especificado'}</span>
                    </div>
                    <div>
                      <span className="block text-kora-dark/40">Membresía:</span>
                      <span className="font-semibold text-accent">{selectedPlanInfo.name}</span>
                    </div>
                    <div>
                      <span className="block text-kora-dark/40">Costo Estimado:</span>
                      <span className="font-semibold text-accent">Desde ${selectedPlanInfo.price} / sesión</span>
                    </div>
                    <div>
                      <span className="block text-kora-dark/40">Aromaterapia:</span>
                      <span className="font-semibold text-kora-dark">
                        {AROMAS.find(a => a.id === bookingFormData.aroma)?.name || 'Fresh Cotton'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-kora-dark/40">Tamaño Santuario:</span>
                      <span className="font-semibold text-kora-dark">{bookingFormData.rooms}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-kora-dark/40">Nivel de Vibe:</span>
                      <span className="font-semibold text-kora-dark">{bookingFormData.vibeLevel}</span>
                    </div>
                  </div>
                  {bookingFormData.notes && (
                    <div className="text-left pt-2 border-t border-primary-container/20">
                      <span className="block text-kora-dark/40">Instrucciones Especiales:</span>
                      <p className="italic text-kora-dark/80">"{bookingFormData.notes}"</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-kora-dark/75 leading-relaxed max-w-xs">
                  Para proceder con la asignación segura del horario y personal de la Corporación KORA, haz clic abajo para mandarnos el ticket prellenado por WhatsApp directo. ¡Te contestaremos súper fancy! 💖
                </p>

                <div className="flex flex-col gap-2 w-full">
                  <a 
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    id="finish_whatsapp_btn"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-full font-display text-xs font-bold uppercase tracking-widest text-center shadow-lg hover:scale-101 transition-all flex items-center justify-center gap-2"
                  >
                    MANDAR POR WHATSAPP 📲
                  </a>
                  <button 
                    onClick={() => setBookingFormData(prev => ({ ...prev, confirmed: false }))}
                    className="text-xs text-accent hover:underline font-display py-2"
                  >
                    Corregir datos de mi reserva
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="bg-primary-container/35 p-4 rounded-2xl border border-primary-container/20 text-xs text-accent">
                    ✨ <b>Bestie Note:</b> Como Kora es una corporación exclusiva, reservamos con anticipación extrema de seguridad. Tu limpieza incluye transporte, alimentos del personal e insumos selectos.
                  </div>

                  {/* Name fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Tu nombre */}
                      <div className="flex flex-col gap-1">
                        <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.firstName ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                          Tu Nombre *
                        </label>
                        <input 
                          id="booking-firstName"
                          type="text" 
                          required
                          placeholder="Ej. Sofía"
                          value={bookingFormData.firstName}
                          onChange={(e) => {
                            setBookingFormData(prev => ({ ...prev, firstName: e.target.value }));
                            if (invalidFields.firstName) setInvalidFields(prev => ({ ...prev, firstName: false }));
                          }}
                          className={`w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 focus:outline-none rounded-t-xl text-sm transition-all ${
                            invalidFields.firstName 
                              ? 'border-red-500 ring-2 ring-red-500/10 bg-red-50/10' 
                              : 'border-primary-container focus:border-[#9e182b]'
                          }`}
                        />
                        {invalidFields.firstName && (
                          <span className="text-[10px] text-red-500 font-medium">Este campo es obligatorio *</span>
                        )}
                      </div>

                      {/* Segundo nombre */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-display font-bold text-accent uppercase tracking-wider">
                          Segundo Nombre (Opcional)
                        </label>
                        <input 
                          id="booking-secondName"
                          type="text" 
                          placeholder="Ej. Elena"
                          value={bookingFormData.secondName}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, secondName: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 border-primary-container focus:border-[#9e182b] focus:outline-none rounded-t-xl text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Tu apellido */}
                      <div className="flex flex-col gap-1">
                        <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.lastName ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                          Tu Apellido *
                        </label>
                        <input 
                          id="booking-lastName"
                          type="text" 
                          required
                          placeholder="Ej. Garza"
                          value={bookingFormData.lastName}
                          onChange={(e) => {
                            setBookingFormData(prev => ({ ...prev, lastName: e.target.value }));
                            if (invalidFields.lastName) setInvalidFields(prev => ({ ...prev, lastName: false }));
                          }}
                          className={`w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 focus:outline-none rounded-t-xl text-sm transition-all ${
                            invalidFields.lastName 
                              ? 'border-red-500 ring-2 ring-red-500/10 bg-red-50/10' 
                              : 'border-primary-container focus:border-[#9e182b]'
                          }`}
                        />
                        {invalidFields.lastName && (
                          <span className="text-[10px] text-red-500 font-medium">Este campo es obligatorio *</span>
                        )}
                      </div>

                      {/* Segundo Apellido */}
                      <div className="flex flex-col gap-1">
                        <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.secondLastName ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                          Segundo Apellido *
                        </label>
                        <input 
                          id="booking-secondLastName"
                          type="text" 
                          required
                          placeholder="Ej. Ortiz"
                          value={bookingFormData.secondLastName}
                          onChange={(e) => {
                            setBookingFormData(prev => ({ ...prev, secondLastName: e.target.value }));
                            if (invalidFields.secondLastName) setInvalidFields(prev => ({ ...prev, secondLastName: false }));
                          }}
                          className={`w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 focus:outline-none rounded-t-xl text-sm transition-all ${
                            invalidFields.secondLastName 
                              ? 'border-red-500 ring-2 ring-red-500/10 bg-red-50/10' 
                              : 'border-primary-container focus:border-[#9e182b]'
                          }`}
                        />
                        {invalidFields.secondLastName && (
                          <span className="text-[10px] text-red-500 font-medium">Este campo es obligatorio *</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1">
                    <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.email ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                      Tu Correo *
                    </label>
                    <input 
                      id="booking-email"
                      type="email" 
                      required
                      placeholder="Ej. sofia.garza@gmail.com"
                      value={bookingFormData.email}
                      onChange={(e) => {
                        setBookingFormData(prev => ({ ...prev, email: e.target.value }));
                        if (invalidFields.email) setInvalidFields(prev => ({ ...prev, email: false }));
                      }}
                      className={`w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 focus:outline-none rounded-t-xl text-sm transition-all ${
                        invalidFields.email 
                          ? 'border-red-500 ring-2 ring-red-500/10 bg-red-50/10' 
                          : 'border-primary-container focus:border-[#9e182b]'
                      }`}
                    />
                    {invalidFields.email && (
                      <span className="text-[10px] text-red-500 font-medium">Este campo es obligatorio *</span>
                    )}
                  </div>

                  {/* Instagram handle for influencer feel */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-display font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                      <Instagram size={10} /> Instagram Handle (Opcional, Ej. @metodokora)
                    </label>
                    <input 
                      id="booking-instagram"
                      type="text" 
                      placeholder="Ej. @metodokora"
                      value={bookingFormData.instagram}
                      onChange={(e) => setBookingFormData(prev => ({ ...prev, instagram: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 border-primary-container focus:border-[#9e182b] focus:outline-none rounded-t-xl text-sm transition-all"
                    />
                  </div>

                  {/* Contact phone */}
                  <div className="flex flex-col gap-1">
                    <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.phone ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                      Número de WhatsApp *
                    </label>
                    <input 
                      id="booking-phone"
                      type="tel" 
                      required
                      placeholder="Ej. +58 412 1234567"
                      value={bookingFormData.phone}
                      onChange={(e) => {
                        setBookingFormData(prev => ({ ...prev, phone: e.target.value }));
                        if (invalidFields.phone) setInvalidFields(prev => ({ ...prev, phone: false }));
                      }}
                      className={`w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 focus:outline-none rounded-t-xl text-sm transition-all ${
                        invalidFields.phone 
                          ? 'border-red-500 ring-2 ring-red-500/10 bg-red-50/10' 
                          : 'border-primary-container focus:border-[#9e182b]'
                      }`}
                    />
                    {invalidFields.phone && (
                      <span className="text-[10px] text-red-500 font-medium">Este campo es obligatorio *</span>
                    )}
                  </div>

                  {/* Plan Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-display font-bold text-accent uppercase tracking-wider">Membresía Elegida</label>
                    <select 
                      value={bookingFormData.planId}
                      onChange={(e) => setBookingFormData(prev => ({ ...prev, planId: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border-b-2 border-primary-container focus:border-[#9e182b] focus:outline-none rounded-t-xl text-sm"
                    >
                      {MEMBERSHIPS.map(m => (
                        <option key={m.id} value={m.id}>{m.name} - Desde ${m.price} x sesión</option>
                      ))}
                    </select>
                  </div>

                  {/* Size selector */}
                  <div className="flex flex-col gap-2" id="booking-rooms-container">
                    <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.rooms ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                      ¿De qué tamaño es tu casita / depa? *
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'Tiny & Chic: Hasta 60 m2',
                        'Standard Living: 61 - 100 m2',
                        'Family Size: 101 - 150m2',
                        'Grand Estate: +151 m2'
                      ].map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => {
                            setBookingFormData(prev => ({ ...prev, rooms: item }));
                            if (invalidFields.rooms) setInvalidFields(prev => ({ ...prev, rooms: false }));
                          }}
                          className={`p-1 px-3 py-3 rounded-xl text-left border transition-all cursor-pointer ${
                            bookingFormData.rooms === item 
                              ? 'border-[#9e182b] bg-[#ffd9e1]/20 font-semibold text-accent' 
                              : invalidFields.rooms
                                ? 'border-red-500 bg-red-50/10 hover:bg-red-50/20'
                                : 'border-primary-container/20 bg-white/40 hover:bg-white/70'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    {invalidFields.rooms && (
                      <span className="text-[10px] text-red-500 font-medium">Por favor selecciona el tamaño de tu casita *</span>
                    )}
                  </div>

                  {/* Vibe selector */}
                  <div className="flex flex-col gap-2" id="booking-vibe-container">
                    <label className={`text-xs font-display font-bold uppercase tracking-wider ${invalidFields.vibeLevel ? 'text-[#9e182b] animate-pulse' : 'text-accent'}`}>
                      Nivel de vibe *
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'Minimalista', title: 'Minimalista', desc: 'Pocos muebles, superficies despejadas.' },
                        { id: 'Con mucha vida', title: 'Con mucha vida', desc: 'Muchos objetos, adornos, libros, juguetes.' }
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            setBookingFormData(prev => ({ ...prev, vibeLevel: item.id }));
                            if (invalidFields.vibeLevel) setInvalidFields(prev => ({ ...prev, vibeLevel: false }));
                          }}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col ${
                            bookingFormData.vibeLevel === item.id 
                              ? 'border-[#9e182b] bg-[#ffd9e1]/20' 
                              : invalidFields.vibeLevel
                                ? 'border-red-500 bg-red-50/10 hover:bg-red-50/20'
                                : 'border-primary-container/20 bg-white/40 hover:bg-white/70'
                          }`}
                        >
                          <span className="font-display font-bold text-xs text-accent">{item.title}</span>
                          <span className="text-[10px] text-kora-dark/70 mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                    {invalidFields.vibeLevel && (
                      <span className="text-[10px] text-red-500 font-medium">Por favor selecciona la vibra de tu casita *</span>
                    )}
                  </div>

                  {/* Aroma Selection Menu */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-display font-bold text-accent uppercase tracking-wider">
                      Elige el Aroma de tu Trapeado 🧺
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {AROMAS.map((aroma) => (
                        <button
                          type="button"
                          key={aroma.id}
                          onClick={() => setBookingFormData(prev => ({ ...prev, aroma: aroma.id }))}
                          className={`p-3 rounded-xl text-left border flex flex-col ${
                            bookingFormData.aroma === aroma.id 
                              ? 'border-[#9e182b] bg-[#ffd9e1]/20' 
                              : 'border-primary-container/20 bg-white/40'
                          }`}
                        >
                          <span className="font-display font-bold text-xs text-accent">{aroma.name}</span>
                          <span className="text-[10px] text-kora-dark/70 mt-0.5">{aroma.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special instruction notes */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-display font-bold text-accent uppercase tracking-wider">Instrucciones especiales para nuestro staff</label>
                    <textarea 
                      placeholder="Escribe aquí si tienes mascotitas cariñosas, copas delicadas de cristal, o si amas que dejen tus almohadas en pico..."
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 border-primary-container focus:border-[#9e182b] focus:outline-none rounded-t-xl text-sm h-24 resize-none transition-all"
                    />
                  </div>

                  {/* Promo Bestie Code */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-display font-bold text-accent uppercase tracking-wider">¿Tienes Código de Descuento Club Besties?</label>
                    <input 
                      type="text" 
                      placeholder="Ej. FRESITA_GLOW"
                      value={bookingFormData.bestieCode}
                      onChange={(e) => setBookingFormData(prev => ({ ...prev, bestieCode: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 hover:bg-white border-b-2 border-primary-container focus:border-[#9e182b] focus:outline-none rounded-t-xl text-xs uppercase tracking-widest"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-primary-container/25 mt-8 space-y-4">
                  {/* Real-time Subtotal Preview */}
                  <div className="flex justify-between items-center bg-white/60 p-4 rounded-xl border border-primary-container/30">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-kora-dark/60 block font-display">Resumen Recurrente</span>
                      <span className="text-sm font-semibold text-accent">{selectedPlanInfo.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm block text-kora-dark/65 font-mono">Total Estimado</span>
                      <span className="text-lg font-bold text-[#9e182b]">Desde ${selectedPlanInfo.price} / sesion</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-accent hover:bg-[#851323] text-white py-4 rounded-full font-display text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-accent/15 cursor-pointer"
                  >
                    Confirmar mi Reserva 🌸
                  </button>

                  <p className="text-[11px] text-kora-dark/50 leading-relaxed text-center mt-2 font-sans px-2">
                    Este es el monto base estimado. Tu cotización final personalizada será enviada vía WhatsApp tras evaluar el estado actual de tu hogar.
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-kora-bg border-t border-primary-container/25">
        <div className="max-w-[1140px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-4">
            {/* Logo in Montserrat - normal weight, prominent size, NO bold */}
            <div className="flex flex-col">
              <span className="font-display font-light text-[36px] tracking-[0.25em] text-[#9e182b]">
                KORA
              </span>
              <span className="font-display text-[9px] tracking-[0.5em] text-[#9e182b] uppercase ml-[4px]">
                clean wellness
              </span>
            </div>
            <p className="font-sans text-xs text-kora-dark/65 leading-relaxed max-w-sm">
              Servicio de mantenimiento exclusivo para el hogar de alta gama. No hacemos limpiezas profundas, solo preservamos con esmero el santuario que tanto amas vivir.
            </p>
            <p className="font-sans text-[11px] text-kora-dark/50">
              © 2026 CORPORACION KORA GLOBAL. Todos los derechos reservados.
            </p>
          </div>

          {/* Contact Details Column */}
          <div className="bg-white/20 border border-primary-container/20 p-8 rounded-3xl space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-accent">
              CANALES DE ATENCIÓN DIRECTA
            </h4>
            <div className="space-y-3.5">
              <a 
                href="mailto:corporacionkoraglobal@gmail.com" 
                className="flex items-center gap-2.5 text-xs text-kora-dark/85 hover:text-accent transition-colors"
              >
                <Mail size={16} className="text-accent" />
                <span>corporacionkoraglobal@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/584122126159" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-xs text-kora-dark/85 hover:text-accent transition-colors"
              >
                <Phone size={16} className="text-accent animate-pulse" />
                <span>+58 412 212 6159 (WhatsApp Oficial)</span>
              </a>
              <div className="flex items-center gap-2.5 text-xs text-kora-dark/80">
                <Clock size={16} className="text-accent" />
                <span>Lunes a Sábado: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-primary-container/15 flex items-center gap-2">
              <span className="text-[10px] font-bold font-display uppercase text-kora-dark/40 tracking-wider">Social Feed:</span>
              <a href="#" className="p-1 px-2 pb-1.5 rounded-full bg-[#fdebdc] hover:bg-[#febac7] text-[#9e182b] text-[10px] items-center inline-flex gap-1 transition-all">
                <Instagram size={10} /> @corporacionkoraglobal
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
