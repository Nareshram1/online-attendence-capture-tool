/** @type {import('tailwindcss').Config} */
module.exports = {
  
   content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple":"#081A51",
        "light-white":"rgba(255,255,255,0.18)"
      }
    },
  },
  plugins: [
  ]
}
