---
name: Sahara Silent Luxury
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4c463f'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#7e766e'
  outline-variant: '#cfc5bc'
  surface-tint: '#655d54'
  primary: '#655d54'
  on-primary: '#ffffff'
  primary-container: '#bdb2a7'
  on-primary-container: '#4c443c'
  inverse-primary: '#d0c5b9'
  secondary: '#5d5f5b'
  on-secondary: '#ffffff'
  secondary-container: '#e0e0db'
  on-secondary-container: '#62635f'
  tertiary: '#635d58'
  on-tertiary: '#ffffff'
  tertiary-container: '#bab2ab'
  on-tertiary-container: '#4a453f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ede0d5'
  primary-fixed-dim: '#d0c5b9'
  on-primary-fixed: '#201b14'
  on-primary-fixed-variant: '#4d463d'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c6c7c2'
  on-secondary-fixed: '#1a1c19'
  on-secondary-fixed-variant: '#454744'
  tertiary-fixed: '#eae1da'
  tertiary-fixed-dim: '#cec5be'
  on-tertiary-fixed: '#1f1b17'
  on-tertiary-fixed-variant: '#4b4641'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h1:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is rooted in the "Silent Luxury" ethos, blending Japandi minimalism with a high-end editorial aesthetic. The core personality is serene, disciplined, and warm, avoiding loud visual noise in favor of intentional negative space and organic textures. 

The visual style is **Tactile Minimalism**. With the move toward a more monochromatic palette, it relies on the subtle interplay of light and desaturated earth tones—specifically evoking the grain of raw linen and the smoothness of sun-bleached sandstone. This design system targets an audience that values slow living, high craftsmanship, and mental clarity. Every interface element must feel curated, not merely placed, evoking an emotional response of organized tranquility.

## Colors

The "Sahara Palette" defines the atmosphere of the design system, now refined for a more tonal and cohesive look.

- **Fondo (Off-White):** (#F5F5F0) Used for primary canvases to maintain a sense of airy openness.
- **Principal (Sahara Greige):** (#BDB2A7) Used for structural elements and key brand moments. It provides a grounded, organic warmth.
- **Acento (Warm Sandstone):** (#E0D7D0) Used for subtle layering and secondary elements. This tone replaces the previous gold for a quieter, more integrated aesthetic.
- **Tipografía (Deep Charcoal):** (#333333) Provides a high-legibility contrast against the neutral tones, ensuring the minimalism remains functional and accessible.

## Typography

Typography in this design system follows a strict hierarchy to ensure a rhythmic reading experience, now unified under a single typeface.

- **Manrope** is utilized for all levels of the system. This brings a modern, geometric clarity and a unified voice to the design.
- **Headlines (H1, H2)** use lighter weights to maintain an editorial feel, while **Body** text uses regular weights for maximum readability.
- The "soul" of the system is now found in its whitespace and proportions rather than font mixing, emphasizing a sophisticated, utilitarian luxury.

Mobile scaling: Headlines should decrease by 20% on mobile devices, while body text remains consistent at 16px for maximum legibility.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy on desktop and a fluid model on mobile. A 12-column grid is standard, but the system emphasizes "Empty Space as Content." Large margins (64px+) are encouraged to prevent the UI from feeling cluttered.

Spacing follows an 8px rhythmic scale. However, for section transitions, exaggerated padding (up to 120px) is used to create a "breathable" flow, mimicking the experience of a high-end gallery or lifestyle magazine. Symmetry is preferred, but asymmetric placement of images against large text blocks is encouraged to evoke the Pinterest-Japandi influence.

## Elevation & Depth

In alignment with the Japandi style, depth is created through **Tonal Layering** rather than heavy shadows. 

- **Surface Tiers:** Use Warm Sandstone (#E0D7D0) against the Off-White canvas (#F5F5F0) to define card boundaries or sidebars.
- **Soft Diffusion:** When shadows are necessary (e.g., for elevated modals), use "Sandstone Shadows"—ultra-diffused, low-opacity (5-8%) shadows with a slight warm tint from the Sahara Greige, avoiding pure grays.
- **Background Texture:** A subtle, non-tiling noise overlay (2% opacity) may be applied to the background to simulate the tactile feel of fine-grain paper or natural linen.

## Shapes

The shape language is **Soft and Structural**. 

Sharp corners are avoided to maintain Zen-like serenity, but excessive roundedness is avoided to keep the design sophisticated. A 4px (0.25rem) radius is the standard for most components (buttons, input fields), while cards may use an 8px (0.5rem) radius. This creates a subtle "softening" of the grid without losing the architectural integrity of the layout.

## Components

- **Buttons:** Primary buttons use a solid Sahara Greige (#BDB2A7) fill with Deep Charcoal text. Hover states involve a subtle shift in brightness. Secondary buttons are ghost-style with a 1px Sahara Greige border.
- **Input Fields:** Use an Off-White background with a 1px border in Warm Sandstone. On focus, the border transitions to Sahara Greige. Labels should always be in Manrope (Label-sm) above the field.
- **Cards:** Cards should have no visible shadows, using tonal shifts (Warm Sandstone) or very faint Sahara Greige strokes to define boundaries.
- **Chips/Tags:** Small, pill-shaped elements using Warm Sandstone backgrounds with Deep Charcoal text, maintaining a low visual weight.
- **Dividers:** Horizontal rules should be thin (1px) and rendered in Sahara Greige at 30% opacity.
- **Images:** Should feature a slight desaturation and warm temperature to match the Sahara palette, often framed with generous padding.