/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chillax: ['Chillax', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        'site-bg': '#222222',
      },
      animation: {
        'glow': 'glow 1s ease-in-out infinite alternate',
        'fade-blink': 'fadeInOut 1.5s infinite alternate',
        'text-pulse': 'textPulse 1.5s infinite ease-in-out',
      },
      keyframes: {
        glow: {
          from: { textShadow: '0 0 10px #fff, 0 0 20px #fff' },
          to: { textShadow: '0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff' },
        },
        fadeInOut: { '0%': { opacity: '0.4' }, '100%': { opacity: '1' } },
        textPulse: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } },
      },
    },
  },
  plugins: [],
}
