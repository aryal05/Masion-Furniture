import { Variants, Transition } from 'framer-motion';

// Motion tokens per spec
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const spring = { type: 'spring', stiffness: 300, damping: 25 } as const;
export const durations = {
  fast: 0.2,
  base: 0.3,
  slow: 0.5
} as const;

// Viewport options for useInView
export const viewportOptions = {
  once: true,
  margin: '-80px'
} as const;

// Shared animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

// Stagger container helper
export const staggerContainer = (stagger = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger
    }
  }
});

// Stagger children variant
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: durations.base, ease: easeOut }
  }
};

// Card hover effect
export const cardHover = {
  whileHover: { 
    y: -4, 
    transition: { duration: durations.fast, ease: easeOut } 
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: durations.fast }
  }
};

// Button press effect
export const buttonPress = {
  whileHover: { 
    scale: 1.02,
    transition: { duration: durations.fast }
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: durations.fast }
  }
};

// Shake animation for form errors
export const shake: Variants = {
  hidden: { x: 0 },
  visible: {
    x: [0, -4, 4, -2, 0],
    transition: { duration: 0.4 }
  }
};

// Marquee animation for infinite scroll
export const marquee: Variants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 20,
        ease: "linear"
      }
    }
  }
};

// Modal/sheet animations
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: durations.base } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: durations.base } 
  }
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: durations.base, ease: easeOut } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20, 
    transition: { duration: durations.base } 
  }
};

// Bottom sheet specific
export const bottomSheet: Variants = {
  hidden: { y: '100%' },
  visible: { 
    y: 0, 
    transition: { type: 'spring', damping: 25, stiffness: 300 } 
  },
  exit: { 
    y: '100%', 
    transition: { type: 'spring', damping: 25, stiffness: 300 } 
  }
};

// Accordion animations
export const accordionContent: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: 'auto', 
    opacity: 1, 
    transition: { duration: durations.base } 
  },
  exit: { 
    height: 0, 
    opacity: 0, 
    transition: { duration: durations.base } 
  }
};

// Skeleton shimmer animation
export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 1.5,
        ease: "linear"
      }
    }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: durations.slow, ease: easeOut } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: durations.base } 
  }
};

// Image load animation
export const imageLoad: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: durations.slow, ease: easeOut } 
  }
};

// Badge pop animation
export const badgePop: Variants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1, 
    transition: { type: 'spring', stiffness: 400, damping: 20 } 
  }
};

// Notification slide in
export const notificationSlide: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 300, damping: 25 } 
  },
  exit: { 
    x: '100%', 
    opacity: 0, 
    transition: { duration: durations.base } 
  }
};

// Dropdown menu animation
export const dropdownMenu: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: durations.fast, ease: easeOut } 
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95, 
    transition: { duration: durations.fast } 
  }
};

// Tab content animation
export const tabContent: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: durations.base, ease: easeOut } 
  }
};

// Progress bar animation
export const progressFill: Variants = {
  hidden: { width: 0 },
  visible: { 
    width: '100%', 
    transition: { duration: durations.slow, ease: easeOut } 
  }
};

// Tooltip animation
export const tooltip: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: durations.fast, ease: easeOut } 
  }
};
