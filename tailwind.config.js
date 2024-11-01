/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust this to match your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'), // ensure this line is present
  ],
};
