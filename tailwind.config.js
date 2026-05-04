/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rub: {
          deepBlue:    '#3A6EA5',
          royalBlue:   '#6FA3D2',
          lightBlue:   '#8BB8E8',
          gold:        '#C9A34E',
          goldHover:   '#D4AF37',
          darkText:    '#2C2C2C',
          lightGray:   '#F5F7FA',
          panelBg:     '#EFF4FB',
          borderLight: '#D1E3F5',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body:    ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'popup':   '0 8px 40px rgba(58,110,165,0.18), 0 2px 12px rgba(0,0,0,0.08)',
        'button':  '0 4px 20px rgba(58,110,165,0.35)',
        'message': '0 2px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-in-up':   'fadeInUp 0.3s ease-out',
        'fade-in':      'fadeIn 0.25s ease-out',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'bounce-dots':  'bounceDots 1.2s infinite ease-in-out',
        'pulse-ring':   'pulseRing 2s infinite',
        'slide-up':     'slideUp 0.35s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.85) translateY(16px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        bounceDots: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.3' },
          '40%':           { transform: 'scale(1)',   opacity: '1'   },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)',   opacity: '0.6' },
          '70%':  { transform: 'scale(1.4)', opacity: '0'   },
          '100%': { transform: 'scale(1.4)', opacity: '0'   },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}