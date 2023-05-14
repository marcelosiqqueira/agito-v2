/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
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
        'first-page': "url('/first-page.svg')",
        'previous-page': "url('/previous-page.svg')",
        'next-page': "url('/next-page.svg')",
        'last-page': "url('/last-page.svg')",
        'arrow-left': "url('/arrow-left.svg')",
        'arrow-right': "url('/arrow-right.svg')",
        'close': "url('/close.svg')",
      },
    },
  },
  plugins: [],
};
