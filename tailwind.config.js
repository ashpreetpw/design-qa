/** @type {import('tailwindcss').Config} */
// Tokens mirror the Figma design variables from file wriL5j9xiuUY60BxIwJj2n.
// The design-compare-merge skill prefers fixing values here over component-level edits.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Reddit Sans"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        teko: ['"Teko"', "sans-serif"],
      },
      colors: {
        // Core palette
        heading: "#1b2124",            // TextColors/Heading_AAA
        body1: "#3d3d3d",              // TextColors/Body_Text_1_AAA
        body2: "#757575",              // TextColors/Body_Text_2_AAA

        // Greys
        grey6: "#f8f8f8",              // GreyColors/Grey 6
        grey600: "#7b7f86",            // Greys/Grey 600
        grey900: "#1b2124",            // GreyColors/Grey_900

        // Strokes
        strokeLight: "#d9dce1",        // StrokeColors/Stroke_Light
        strokeMed: "#b7b7b7",          // StrokeColors/Stroke_Medium

        // Brand
        brand: {
          primary: "#5a4bda",          // Primary/Primary 500
          premium: "#143cb6",          // PremiumColors/500
        },

        // Secondary accents
        orange: {
          25: "#fffaf5",
          400: "#fd853a",
          500: "#fb6514",
        },
        green: {
          25: "#f6fef9",
          50: "#edfcf2",
          300: "#73e2a3",
          400: "#3ccb7f",
          500: "#1b7938",              // Auxillary/Success/500
        },
        indigo: {
          100: "#e0eaff",
        },
        blue: {
          50: "#eff8ff",
          200: "#b2ddff",
          300: "#84caff",
        },
        red: {
          200: "#fecdca",
          900: "#7a271a",
        },
        vp: {
          50: "#fce8ed",
          200: "#ef7694",
        },
      },
      spacing: {
        // The Figma file defines explicit spacing tokens; mirror them so
        // `p-2`, `p-4`, etc. match the Figma intent rather than Tailwind's
        // default 4px grid. Values are in pixels.
        0: "0px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        20: "20px",
        40: "40px",
        100: "100px",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontSize: {
        // Match Figma typography tokens: [size, line-height]
        tiny: ["10px", "16px"],   // Body/Tiny
        small: ["12px", "18px"],  // Body/Small
        regular: ["14px", "20px"],// Body/Regular
        sub: ["16px", "24px"],    // Subheading
        h4: ["18px", "26px"],     // Heading/H4
        h3: ["20px", "30px"],     // Heading/H3
      },
      boxShadow: {
        card: "0 1px 2px rgba(27, 33, 36, 0.06)",
      },
    },
  },
  plugins: [],
};
