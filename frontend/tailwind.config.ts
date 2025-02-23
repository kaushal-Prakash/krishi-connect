import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", ...fontFamily.sans],
        poppins: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        "custom-grey": "#B6CBBD",
        "custom-brown": "#754E1A",
        "custom-warm": "#CBA35C",
        "custom-cream": "#F8E1B7",
      },
    },
  },
  plugins: [],
} satisfies Config;
