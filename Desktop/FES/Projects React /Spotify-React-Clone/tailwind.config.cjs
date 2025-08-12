/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        vintageCream: "#F2E9DC",
        coffeeInk: "#2B2A28",
        noir: "#0B0B0B",
        panel: "#121212",
        deepEspresso: "#3B2F2F",
        burntAmber: "#CE8147",
        goldenHoney: "#F4C95D",
        oliveBronze: "#8C7A5B",
        antiqueCream: "#F9F5EF",
        charcoalBlack: "#1E1E1E",
      },
      fontFamily: {
  heading: ["Cinzel", "serif"],   // más profesional
  subheading: ["Merriweather", "serif"],
  body: ["Lato", "sans-serif"],
  alt: ["Montserrat", "sans-serif"],
},

    },
  },
  plugins: [],
};
