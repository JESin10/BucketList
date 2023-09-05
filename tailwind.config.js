// const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkmode: "class",
  // main color setting 가능
  theme: {
    screens: {
      sm: { max: "640px" },
      smd: { min: "641px", max: "819px" }, // => @media (min-width: 390px)
      md: { min: "820px", max: "1023px" }, // => @media (min-width: 640px)
      lg: { min: "1024px", max: "1279" }, // => @media (min-width: 1024px)
      xl: { min: "1280", max: "1449" }, // => @media (min-width: 1280px)
      xxl: "1450px", // => @media (min-width: 1280px)
      stom: { min: "375px", max: "1023px" },
      tolg: { min: "1024px" },
    },
    extend: {
      colors: {
        Blue_No1: "#b3cde0",
        Blue_No2: "#6497b1",
        Blue_No3: "#005b96",
        Blue_No4: "#03396c",
        Blue_No5: "#011f4b",
        Yellow_Light: "#ffdf7f",
        Yellow_Bright: "#ffbf00",
      },
      spacing: {},
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
    },
  },
};
