/**
 * Premium Minimal Skincare eCommerce - Design System & Theme Constants
 * Central repository for colors, animations, and design tokens
 */

/* Color Palette - Clean, Minimal, Premium */
export const colors = {
  // Primary Colors
  white: '#FFFFFF',
  beige: '#F8F6F3',
  pink: '#F6D9E2',
  sage: '#DDE7DF',
  charcoal: '#222222',
  black: '#000000',
  
  // Neutrals
  gray: '#EAEAEA',
  lightGray: '#F5F5F5',
  darkGray: '#888888',
  
  // Semantic
  primary: '#222222',
  secondary: '#F6D9E2',
  accent: '#DDE7DF',
  background: '#FFFFFF',
  surface: '#F8F6F3',
  border: '#EAEAEA',
  text: '#222222',
  textMuted: 'rgba(34, 34, 34, 0.6)',
  textLight: 'rgba(34, 34, 34, 0.4)',
}

/* Typography System */
export const typography = {
  fontFamily: {
    serif: "'Playfair Display', serif",
    sans: "'Inter', sans-serif",
    accent: "'Poppins', sans-serif",
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.875',
  },
}

/* Framer Motion Animation Variants */
export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },

  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },

  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },

  hoverScale: {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  },

  hoverLift: {
    whileHover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  },

  tap: {
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  },
}

/* Spacing Scale */
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
}

/* Shadows */
export const shadows = {
  sm: '0 1px 3px rgba(34, 34, 34, 0.08)',
  md: '0 4px 12px rgba(34, 34, 34, 0.1)',
  lg: '0 12px 24px rgba(34, 34, 34, 0.12)',
  xl: '0 16px 32px rgba(34, 34, 34, 0.15)',
  hover: '0 20px 40px rgba(34, 34, 34, 0.18)',
}

/* Transitions */
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out',
}

/* Layout Constants */
export const layout = {
  maxWidth: '1280px',
  containerPadding: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
  headerHeight: '72px',
}
