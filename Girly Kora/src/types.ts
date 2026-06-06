/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MembershipPlan {
  id: string;
  name: string;
  frequency: string;
  price: number;
  description: string;
  features: string[];
  vibeText: string;
  isPopular?: boolean;
}

export interface BookingState {
  name: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  instagram: string;
  phone: string;
  planId: string;
  rooms: string;
  vibeLevel: string;
  aroma: string;
  notes: string;
  bestieCode: string;
  confirmed: boolean;
}

export interface InteractiveBubble {
  id: number;
  x: number; // percentage width
  y: number; // position from bottom
  size: number; // width/height in px
  speed: number; // speed factor
  colorType: 'rainbow' | 'pink' | 'clear' | 'iridescent';
  swayArg: number; // parameter for sine wave swaying
  swaySpeed: number;
}

export interface AestheticReview {
  id: string;
  author: string;
  age: number;
  handle: string;
  occupation: string;
  comment: string;
  avatarUrl: string;
  stars: number;
}
