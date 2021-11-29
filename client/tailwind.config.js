module.exports = {
  mode: "jit",
  purge: [
    // ...
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  // add VechaiUI plugin
  plugins: [
    require("@tailwindcss/forms"),
    require("@vechaiui/core")({
      colors: ["blue", "red"],
    }),
    // ...
  ],
};
