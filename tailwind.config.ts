import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        base: {
          white: "var(--color-base--white, whitesmoke)",
          black: "var(--color-base--black, #292929)",
        },
        red: {
          250: "rgb(250, 60, 60)",
        },
      },
      fontFamily: {
        sans: ["var(--fonts--body)", "Switzer", "Arial", "sans-serif"],
        heading: ["var(--fonts--heading)", '"Didact Gothic"', "sans-serif"],
        mono: ['"Anonymous Pro"', "monospace"],
      },
      maxWidth: {
        container: "1400px",
        xlarge: "1138px",
        large: "896px",
        medium: "654px",
        small: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
