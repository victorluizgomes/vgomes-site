const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FCFCF8',
        'off-grey': '#E5E5E5',
        'smoky-black': '#1D0F0C',
        'gold-yellow': '#E8BA74',
        'mid-blue': '#88C4D3',
        'mid-red': '#E38671'
      }
    },
  },
  plugins: [],
};
