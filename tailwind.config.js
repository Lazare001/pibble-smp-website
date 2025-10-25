/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'gold': '#FFD700',
        'emerald': '#4CAF50',
        'magenta': '#E91E63',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(76, 175, 80, 0.8)' },
        },
        shimmer: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
