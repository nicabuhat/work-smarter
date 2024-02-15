import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--cl-primary)",
        accent: "var(--cl-accent)",
        secondary: "var(--cl-secondary)",
      },
      fontFamily: {
        sans: ["var(--font-sfpro)"],
        serif: ["var(--font-satisfy"],
      },
      fontSize: {
        xs: [
          "10px",
          {
            lineHeight: "15px",
            fontWeight: "600",
          },
        ],
        inset: [
          "12px",
          {
            lineHeight: "15px",
            fontWeight: "500",
          },
        ],
        sm: [
          "14px",
          {
            lineHeight: "15px",
            fontWeight: "400",
          },
        ],
        "sm-m": [
          "14px",
          {
            lineHeight: "15px",
            fontWeight: "500",
          },
        ],
        "sm-b": [
          "14px",
          {
            lineHeight: "15px",
            fontWeight: "600",
          },
        ],
        m: [
          "16px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
        "m-m": [
          "16px",
          {
            lineHeight: "15px",
            fontWeight: "500",
          },
        ],
        "m-b": [
          "16px",
          {
            lineHeight: "15px",
            fontWeight: "600",
          },
        ],
        base: [
          "18px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "base-m": [
          "18px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "base-b": [
          "18px",
          {
            lineHeight: "24px",
            fontWeight: "600",
          },
        ],
        lg: [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "400",
            letterSpacing: "-0.25px",
          },
        ],
        "lg-m": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "500",
            letterSpacing: "-0.25px",
          },
        ],
        "lg-b": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "600",
            letterSpacing: "-0.25px",
          },
        ],
        "xl-l": [
          "26px",
          {
            lineHeight: "30px",
            fontWeight: "200",
            letterSpacing: "-0.5px",
          },
        ],
        xl: [
          "26px",
          {
            lineHeight: "30px",
            fontWeight: "400",
            letterSpacing: "-0.5px",
          },
        ],
        "xl-m": [
          "26px",
          {
            lineHeight: "30px",
            fontWeight: "500",
            letterSpacing: "-0.5px",
          },
        ],
        "xl-b": [
          "26px",
          {
            lineHeight: "30px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
          },
        ],
        "2xl": [
          "46px",
          {
            lineHeight: "46px",
            fontWeight: "400",
            letterSpacing: "-0.75px",
          },
        ],
        "2xl-m": [
          "46px",
          {
            lineHeight: "46px",
            fontWeight: "500",
            letterSpacing: "-0.75px",
          },
        ],
        "2xl-b": [
          "46px",
          {
            lineHeight: "46px",
            fontWeight: "600",
            letterSpacing: "-0.75px",
          },
        ],
        "3xl": [
          "64px",
          {
            lineHeight: "64px",
            fontWeight: "400",
            letterSpacing: "-1.5px",
          },
        ],
        "3xl-m": [
          "64px",
          {
            lineHeight: "64px",
            fontWeight: "500",
            letterSpacing: "-1.5px",
          },
        ],
        "3xl-b": [
          "64px",
          {
            lineHeight: "64px",
            fontWeight: "600",
            letterSpacing: "-1.5px",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
