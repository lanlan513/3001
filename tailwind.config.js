/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        museum: {
          black: '#1A1A1A',
          ivory: '#F5F1EB',
          gold: '#D4AF8A',
          'gold-light': '#E8D4B8',
          'gold-dark': '#B8956A',
          burgundy: '#722F37',
          'burgundy-light': '#8B3E47',
          gray: '#C9C4BB',
          'gray-dark': '#8A8680',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Lato"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'character-move': 'characterMove 1.5s ease-in-out forwards',
        'bounce-soft': 'bounceSoft 1s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'coin-spin': 'coinSpin 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 138, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 138, 0.6)' },
        },
        characterMove: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2) translateY(-5px)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        coinSpin: {
          '0%': { transform: 'rotateY(0deg) scale(0)', opacity: '0' },
          '50%': { transform: 'rotateY(180deg) scale(1.2)', opacity: '1' },
          '100%': { transform: 'rotateY(360deg) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
