/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#F5D98B',
          400: '#E5C158',
          500: '#C9A84C',
          600: '#A8892A',
          700: '#826A1A',
          DEFAULT: '#C9A84C',
        },
        charcoal: {
          50:  '#F4F4F8',
          100: '#E0E0EE',
          200: '#B8B8D4',
          500: '#4A4A6A',
          600: '#3A3A58',
          700: '#2D2D44',
          800: '#1A1A2E',
          900: '#0D0D1A',
          DEFAULT: '#1A1A2E',
        },
        cream: {
          DEFAULT: '#F8F7F4',
          dark: '#EDE9E0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201,168,76,0.25)',
        'card': '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.16)',
        'glass': '0 8px 32px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
