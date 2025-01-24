/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  "darkMode": "class",
  theme: {
    extend: {
      boxShadow: {
        myShadow1: "4.1px -5px 0 0 #fff",
        myShadow2: "-4.1px -5px 0 0 #fff",
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('daisyui'),
  ],
}

