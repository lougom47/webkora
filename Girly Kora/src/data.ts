/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MembershipPlan, AestheticReview } from './types';

export const MEMBERSHIPS: MembershipPlan[] = [
  {
    id: 'basico',
    name: 'Básico Recurrente',
    frequency: '1 VEZ AL MES',
    price: 30,
    description: 'Ayudita profesional para refrescar tu espacio y mantener la armonía básica de tu casita.',
    features: [
      'Aspirado total y trapeado fresco en pisos',
      'Mantenimiento de superficies libres de polvo',
      'Limpieza y desinfección en baños',
      'Acomodo estético de cojines y mantas',
      'Insumos, aspiradora y talento KORA incluidos'
    ],
    vibeText: 'Perfecto para darle un reset visual mensual a tu santuario.',
    isPopular: false
  },
  {
    id: 'fresh',
    name: 'Fresh Home',
    frequency: 'CADA 15 DÍAS',
    price: 30,
    description: 'Paz mental constante. El equilibrio ideal para quienes viven a su propio y relajado ritmo entre el trabajo y la casa.',
    features: [
      'Aspirado y trapeado quincenal a consciencia',
      'Eliminación de polvo en repisas y mesas',
      'Limpieza de espejos (¡cero huellas dactilares!)',
      'Brillo y desinfección en griferías de baño',
      'El toque aesthetic KORA en tu sala'
    ],
    vibeText: 'Mantén la frescura estable sin perder tu fin de semana en la limpieza.',
    isPopular: false
  },
  {
    id: 'main-character',
    name: 'Main Character',
    frequency: '1 VEZ A LA SEMANA',
    price: 28,
    description: 'Olvídate de la escoba por siempre. Vive la experiencia KORA completa y dedica tu tiempo libre exclusivamente a descansar.',
    features: [
      'Aspirado and trapeado semanal continuo',
      'Baños siempre impecables y listos para tu rutina',
      'Polvo off en todas las áreas comunes',
      'Reset visual continuo en encimeras y muebles',
      'Prioridad de agenda y horario fijo garantizado'
    ],
    vibeText: 'Best seller. Para la CEO de la casa que busca cero preocupaciones.',
    isPopular: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate KORA',
    frequency: '2 VECES POR SEMANA',
    price: 26,
    description: 'Exclusividad y paz mental total. Un estándar de limpieza constante en la comodidad de tu hogar para que siempre luzca de revista.',
    features: [
      'Dos visitas de mantenimiento continuo a la semana',
      'Retiro rápido de basura de cocina y baños',
      'Aspirado frecuente para espacios sin rastro de pelusas',
      'Limpieza meticulosa de espejos de cuerpo completo',
      'Descuento especial ya aplicado en tu tarifa'
    ],
    vibeText: 'Para aquellas que no toleran ver el desorden del día a día. Vivir bonito es ley.',
    isPopular: false
  }
];

export interface ComparisonItem {
  id: string;
  activity: string;
  included: boolean;
  explanation: string;
}

export const COMPARISONS: ComparisonItem[] = [
  {
    id: 'pisos',
    activity: 'Pisos impecables y con olor a frescura',
    included: true,
    explanation: 'Barremos cada rincón de tu casita y pasamos el trapeador a consciencia para eliminar la suciedad diaria. Nos aseguramos de que tus pisos queden súper limpios para que andes descalza feliz.'
  },
  {
    id: 'banos',
    activity: 'Mantenimiento y brillo en tus baños',
    included: true,
    explanation: 'Lavamos y desinfectamos lavamanos, duchas e inodoros para mantener a raya el uso del día a día. Dejamos tu baño 10/10, el escenario perfecto para tu rutina de skincare.'
  },
  {
    id: 'polvo',
    activity: 'Polvo off y espejos de selfie',
    included: true,
    explanation: 'Sacudimos el polvo de tus muebles y mesas, y limpiamos tus espejos para que queden cristalinos. Un mantenimiento rápido y efectivo para que todo luzca impecable.'
  },
  {
    id: 'aspirado',
    activity: 'Aspirado total',
    included: true,
    explanation: 'Llevamos nuestra propia aspiradora para asegurarnos de que tus pisos y tapetes queden sin rastro de polvo. A veces con el trapeador no es suficiente.'
  },
  {
    id: 'orden',
    activity: 'Organizar ropa, alacenas o encimeras',
    included: false,
    explanation: 'Amamos el orden, pero nuestro foco es limpiar las superficies. Doblar ropa, organizar el interior de gavetas, clósets, o despejar encimeras llenas de objetos consume un tiempo que no cubre nuestro servicio de mantenimiento.'
  },
  {
    id: 'grasa',
    activity: 'Remover sarro pegado de años o cochambre acumulado',
    included: false,
    explanation: 'No realizamos limpiezas profundas. KORA se enfoca en el mantenimiento estético y de rutinas continuas, no en la remoción de cochambre extremo, sarro petrificado o la restauración profunda de superficies.'
  },
  {
    id: 'mudanzas',
    activity: 'Empacar cajas para mudanza o subir colchones',
    included: false,
    explanation: 'Amamos cooperar, pero nuestro equipo está certificado exclusivamente en técnicas de mantenimiento estético de espacios.'
  }
];

export const AROMAS = [
  { id: 'ocean', name: 'Ocean Breeze 🌊', desc: 'Un soplo de aire puro. La sensación refrescante de una ventana abierta frente al mar, ideal para un ambiente despejado, luminoso y fresh.' },
  { id: 'cherry', name: 'Sweet Cherry 🍒', desc: 'Un toque juguetón y vibrante. Un aroma dulce, divertido y lleno de energía, como un treat irresistible para tu hogar.' },
  { id: 'pine', name: 'Forest Pine 🌲', desc: 'La esencia de un bosque nórdico. Sofisticado, natural y profundamente revitalizante; para sentir tu casita limpia, orgánica y con toda la vibra Japandi.' }
];

export const REVIEWS: AestheticReview[] = [
  {
    id: '1',
    author: 'Regina Ortiz',
    age: 29,
    handle: '@regina_ortiz',
    occupation: 'Content Creator & Pinterest Lover',
    comment: 'Literalmente mi depa huele a hotel boutique todos los viernes. Abro la puerta y todo está ordenado y fresco. No tengo que estresarme por limpiezas profundas, Kora hace justo el mantenimiento por un precio super accesible. De verdad es la mejor inversión del mes.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    stars: 5
  },
  {
    id: '2',
    author: 'Valeria Garza',
    age: 32,
    handle: '@val_garzastudio',
    occupation: 'Diseñadora de Interiores',
    comment: 'Como interiorista soy super obsesiva con la limpieza y estética de mi depa. Me preocupaba que usaran cloro abrasivo o cosas que dañaran los acabados. Las chicas llegaron con uniformes lindos, insumos biodegradables y dejaron todo impecable, brilloso y oliendo delicioso. Es mi secreto favorito para estar en paz.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    stars: 5
  },
  {
    id: '3',
    author: 'Camila de Alba',
    age: 30,
    handle: '@camila.dealba',
    occupation: 'Socia en Agencia Creativa',
    comment: 'Amo el plan Main Character, acomodan mis cosas super lindo. Ya no me preocupo por andar barriendo o trapeando a las carreras antes de mis reuniones de Zoom. Es un servicio de mantenimiento super práctico, seguro y con excelente vibra. Super recomendado.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200',
    stars: 5
  }
];
