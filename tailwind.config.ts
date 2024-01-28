import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
          light: {
            colors: {
              background: "#FFFFFF", // or DEFAULT
              foreground: "#11181C", // or 50 to 900 DEFAULT
              primary: {
                50: "#fce9e6",
                100: "#ffccba",
                200: "#ffac8d",
                300: "#ff8b5f",
                400: "#ff723b",
                500: "#ff5a12",
                600: "#f4540e",
                700: "#e64c07",
                800: "#d84503",
                900: "#bf3800",
                foreground: "#FFFFFF",
                DEFAULT: "#ff723b",
              },
              // ... rest of the colors
            },
          },
          dark: {
            colors: {
              background: "#000000", // or DEFAULT
              foreground: "#ECEDEE", // or 50 to 900 DEFAULT
              primary: {
                50: "#fce9e6",
                100: "#ffccba",
                200: "#ffac8d",
                300: "#ff8b5f",
                400: "#ff723b",
                500: "#ff5a12",
                600: "#f4540e",
                700: "#e64c07",
                800: "#d84503",
                900: "#bf3800",
                foreground: "#FFFFFF",
                DEFAULT: "#ff723b",
              },
            },
            // ... rest of the colors
          }
        },
      }),]
}
export default config
