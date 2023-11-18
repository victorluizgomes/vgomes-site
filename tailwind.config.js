/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
