import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secundary: "#FFD000",

        primary: "#0067B1",
        highest: "#333333",
        low: "#F6F7FC",
        accent: "#DE1267",

        warning: "#F4A767",
        success: "#2E7D32",
        error: "#D32F2F",
        info: "#8CCEEC",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: "383px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
