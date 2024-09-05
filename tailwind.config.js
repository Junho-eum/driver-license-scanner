/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gw-primary-blue':"#033C5A",
        'gw-primary-disabled':"#A9A9A9",
        'gw-primary-text-disabled':"#808080",
        'gw-primary-gold':"#AA9868",
        'gw-accent-blue':"#0190DB",
        'gw-accent-gold':"#F9E08E",
      }
    },
  },
  plugins: [],
}

