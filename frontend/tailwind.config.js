/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmerVideo: {
          "0%, 100%": {
            backgroundColor: "#111827", // bg-gray-900
          },
          "50%": {
            backgroundColor: "#374151", // transition color
          },
        },
      },
      animation: {
        shimmer: "shimmerVideo 3s infinite",
      },
    },
  },
  plugins: [],
};
