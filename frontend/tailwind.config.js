/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        react: {
          DEFAULT: "#282c34",
        },
      },
    },
  },
  plugins: [],
};
