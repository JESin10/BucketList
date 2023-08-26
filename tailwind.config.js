module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkmode: "class",
  // main color setting 가능
  theme: {
    screens: {},
    extend: {
      colors: {
        // GRAY: "#7d7d7d",
        // Dark_GRAY: "rgb(51, 51, 51)",
        // RED: "rgb(210, 47, 39)",
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
