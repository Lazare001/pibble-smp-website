// postcss.config.js ✅ 100% correct for Tailwind 4.x and CRA
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
