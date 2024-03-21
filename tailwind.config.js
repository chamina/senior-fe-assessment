/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#413F3D",
      },
    },
  },
  safelist: [
    "bg-amber-700",
    "bg-emerald-700",
    "bg-blue",
    "text-gray-400",
    "bg-violet",
    "bg-gray",
  ],
  plugins: [],
};
