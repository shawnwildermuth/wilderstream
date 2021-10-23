module.exports = {
  mode: 'jit',
  purge: ["**/*.html", "**/*.vue"],
  corePlugins: {
    preflight: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      serif: ["'Source Serif Pro'", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
