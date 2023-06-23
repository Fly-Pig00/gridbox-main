/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      objectPosition: {
        "slight-right": "69% 50%",
      },
    },
  },
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    themes: [
      {
        gridbox: {
          primary: "#EEEEEE",
          secondary: "#FFFFFF",
          accent: "#00AEEF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
