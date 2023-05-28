/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      orange: "#FF7600",
      yellow: "FFA900",
      gray: "#555555",
      purple: "#52006A",
      pink: "CD113B",
      "dark-gray": "#1A1A1A",
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
