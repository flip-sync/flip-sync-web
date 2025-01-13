import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4ec0e9",
          light: "#eaf2fd",
        },
        gray: {
          1: "#1d1b20",
          2: "#322f35",
          3: "#48464c",
          4: "#79767d",
          5: "#938f96",
          6: "#cac5cd",
          7: "#e6e0e9",
          8: "#f5f6f6",
        },
      },
      fontSize: {
        // Large Title
        "large-title": ["48px", { lineHeight: "60px", fontWeight: "700" }],

        // Titles
        "title-1": ["32px", { lineHeight: "42px", fontWeight: "400" }],
        "title-2": ["28px", { lineHeight: "36px", fontWeight: "400" }],
        "title-3": ["22px", { lineHeight: "30px", fontWeight: "400" }],
        "title-4": ["18px", { lineHeight: "24px", fontWeight: "400" }],

        // Weight Titles
        "weight-title-1": ["32px", { lineHeight: "42px", fontWeight: "600" }],
        "weight-title-2": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "weight-title-3": ["22px", { lineHeight: "30px", fontWeight: "600" }],
        "weight-title-4": ["18px", { lineHeight: "24px", fontWeight: "600" }],

        // Body
        "body-1": ["16px", { lineHeight: "22px", fontWeight: "400" }],
        "body-2": ["14px", { lineHeight: "22px", fontWeight: "400" }],

        // Weight Body
        "weight-body-1": ["16px", { lineHeight: "22px", fontWeight: "600" }],
        "weight-body-2": ["14px", { lineHeight: "22px", fontWeight: "600" }],

        // Buttons
        "button-1": ["17px", { lineHeight: "22px", fontWeight: "400" }],
        "button-2": ["15px", { lineHeight: "20px", fontWeight: "400" }],
        "button-3": ["12px", { lineHeight: "18px", fontWeight: "400" }],

        // Weight Buttons
        "weight-button-1": ["17px", { lineHeight: "22px", fontWeight: "600" }],
        "weight-button-2": ["15px", { lineHeight: "20px", fontWeight: "600" }],
        "weight-button-3": ["12px", { lineHeight: "18px", fontWeight: "600" }],

        // Label
        label: ["16px", { lineHeight: "22px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
