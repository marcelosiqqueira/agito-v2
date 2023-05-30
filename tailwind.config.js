/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      orange: "#FF7600",
      yellow: "#FFA900",
      gray: "#555555",
      purple: "#52006A",
      pink: "#CD113B",
      "dark-gray": "#1A1A1A",
    },
    fontFamily: {
      'title': '"Playfair Display", serif',
    },
    extend: {
      backgroundImage: {
        'first-page': "url('/first-page.svg')",
        'previous-page': "url('/previous-page.svg')",
        'next-page': "url('/next-page.svg')",
        'last-page': "url('/last-page.svg')",
        'arrow': "url('/arrow.svg')",
        'close': "url('/close.svg')",
        'dots-design': "url('/dots-design.svg')"
      },
      dropShadow: {
        'under': '4px 5px 0px rgba(205, 17, 59, 1)',
        'default': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      backgroundPosition: {
        'righttop': 'right top 1rem',
        'lefttop': 'left top 1rem',
      },
    },
  },
  plugins: [],
};
