// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custombg: '#f5e0c5',
        logobg: '#283e50',
        navtext: '#b5ecdf',
        borderbg: '#4d2e19',
      },
      // colors: {
      //   'custom-primary': '#FF5733',
      //   'bgcolor': '#F9E7D2',
      //   'begcol': '#f05a28',
      //   'midcol': '#e14a21',
      //   'endcol': '#d1411f'
      // }
    },
  },
  plugins: [],
}