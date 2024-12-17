import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#F4F6E0",
        first: "#0D6986",
        second: "#8EC7D2",
        third: "#D1F6EE",
        text: "#07495E",
        main_text: "white",
      },
    },
  },
  plugins: [],
} satisfies Config;
