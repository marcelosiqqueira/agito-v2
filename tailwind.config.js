/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      orange: "#FC6728",
      "light-orange": "#FFAA86",
      gray: "#D9D9D9",
      "dark-gray": "#B4B4B4",
      "ultra-light-purple": "#6102D5",
      "light-purple": "#2C0063",
      "medium-purple": "#1F0044",
      "dark-purple": "#16002D",
    },
    extend: {
      backgroundImage: {
        'first-page': "url('./src/assets/first-page.svg')",
        'previous-page': "url('./src/assets/previous-page.svg')",
        'next-page': "url('./src/assets/next-page.svg')",
        'last-page': "url('./src/assets/last-page.svg')",
        'arrow-left': "url('./src/assets/arrow-left.svg')",
        'arrow-right': "url('./src/assets/arrow-right.svg')",
        'close': "url('./src/assets/close.svg')",
        'clock': "url('./src/assets/clock.svg')",
        'location': "url('./src/assets/location.svg')",
      }
    },
  },
  plugins: [],
};
