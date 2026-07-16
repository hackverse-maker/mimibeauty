/**
 * Luxury Skincare Website - Design System & Theme Constants
 * Central repository for colors, animations, and design tokens
 */

/* Color Palette */
export const colors = {
  // Luxury palette
  cream: '#faf9f7',
  gold: '#d4a574',
  rose: '#e8d5d0',
  sage: '#a8b5a3',
  charcoal: '#2d2d2d',
  white: '#ffffff',
  black: '#000000',
  
  // Neutrals
  lightGray: '#f5f3f0',
  mediumGray: '#e0dcd8',
  darkGray: '#7a7a7a',
  
  // Semantic
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  info: '#3b82f6',
}

/* Typography Scale */
export const typography = {
  heading: {
    xl: 'text-4xl md:text-5xl font-bold',
    lg: 'text-3xl md:text-4xl font-bold',
    md: 'text-2xl md:text-3xl font-semibold',
    sm: 'text-xl md:text-2xl font-semibold',
    xs: 'text-lg font-semibold',
  },
  body: {
    lg: 'text-lg leading-relaxed',
    md: 'text-base leading-relaxed',
    sm: 'text-sm leading-relaxed',
    xs: 'text-xs leading-relaxed',
  },
}

/* Framer Motion Animation Variants */
export const animationVariants = {
  // Container animations
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

  // Item animations
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },

  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },

  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },

  // Hover effects
  hoverScale: {
    whileHover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  },

  hoverLift: {
    whileHover: {
      y: -8,
      shadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
      },
    },
  },

  // Tap effects
  tap: {
    whileTap: {
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  },

  // Floating animation
  floating: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // Rotate animation
  rotate: {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
}

/* Breakpoints */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
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

/* Box Shadows */
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  luxury: '0 20px 40px rgba(45, 45, 45, 0.08)',
  luxuryLg: '0 30px 60px rgba(45, 45, 45, 0.12)',
  hover: '0 15px 35px rgba(212, 165, 116, 0.15)',
}

/* Border Radius */
export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
}

/* Transition Durations */
export const transitions = {
  fast: '150ms',
  base: '300ms',
  slow: '500ms',
  slower: '700ms',
}

/* Easing Functions */
export const easing = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
}
