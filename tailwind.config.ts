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
        ink: "#0D0D0C",
        deep: "#1A1A18",
        mid: "#3A3A38",
        stone: "#888780",
        warm: "#D3D1C7",
        cream: "#F1EFE8",
        amber: "#EF9F27",
        "amber-light": "#FAEEDA",
        "amber-dark": "#412402",
        teal: "#1D9E75",
        "teal-light": "#E1F5EE",
        "teal-dark": "#04342C",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        "syne-mono": ["var(--font-syne-mono)", "monospace"],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
        inner: "12px",
        modal: "20px",
      },
      fontSize: {
        "label-xs": ["10px", { letterSpacing: "0.12em", lineHeight: "1" }],
        "label-sm": ["11px", { letterSpacing: "0.12em", lineHeight: "1" }],
        "body-sm": ["13px", { lineHeight: "1.65" }],
        "body-md": ["14px", { lineHeight: "1.65" }],
        "body-lg": ["15px", { lineHeight: "1.75" }],
        "mono-lg": ["24px", { lineHeight: "1" }],
        "mono-sm": ["13px", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};

export default config;
