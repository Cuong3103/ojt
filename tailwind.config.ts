import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "height",
      },
      backgroundColor: {
        "secondary-sidebar": "#ECF8FF",
        "primary-sidebar": "",
        "primary-color": "#2D3748",
        "deep-primary-color": "#0B2136",
        main: "#2D3748",
        "blue-main": "#285D9A",
        "orange-main": "#D45B13",
        "green-main": "#2F903F",
        "grey-main": "#CCCCCC",
      },
      textColor: {
        "primary-color": "#2D3748",
        "secondary-color": "#D45B13",
      },
      minHeight: {
        middle: "100vh",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "pastel"],
  },
};
export default config;
