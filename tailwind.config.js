const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', "./src/**/*.jsx", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "middle-100": "#fabb05",
        "more-100": "#593fffd6",
        "more-200": "#593fff",
        "black-100": "#333333",
        "black-200": "#5c5c5c",
        "black-300": "#b3b3b3",
        "white-200": "#f2f2f2",
        "white-300": "#e5e5e5",
        "red-a": "#BF0006",
        "red-b": "#BF0006",
        "bg-transparent": "#ffffff6a"
      },
      boxShadow: {
        "100": "0px 13px 27px -5px rgba(50, 50, 93, 0.25), 0px 8px 16px -8px rgba(0, 0, 0, 0.3)",
        "200": "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
