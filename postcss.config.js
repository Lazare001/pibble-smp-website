<<<<<<< HEAD
// postcss.config.js for Tailwind 3.x and CRA
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
=======
// postcss.config.js ✅ 100% correct for Tailwind 4.x and CRA
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss(), autoprefixer()],
>>>>>>> d5c765b9e879bf9532a8fe58c3fba3433bf146be
};
