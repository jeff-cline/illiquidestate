import type { Config } from "tailwindcss";
import { colors, fonts } from "./src/lib/brand/tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: colors.cream,
        creamDeep: colors.creamDeep,
        ink: colors.ink,
        ink80: colors.ink80,
        ink60: colors.ink60,
        ink40: colors.ink40,
        ink20: colors.ink20,
        ink10: colors.ink10,
        sienna: colors.sienna,
        siennaLight: colors.siennaLight,
        sage: colors.siloEntrepreneur,
        bronze: colors.siloExecutive,
        whitespace: colors.siloGenerational,
        ok: colors.ok,
        warn: colors.warn,
      },
      fontFamily: {
        serif: fonts.serif.split(", "),
        sans: fonts.sans.split(", "),
        mono: fonts.mono.split(", "),
      },
    },
  },
  plugins: [],
};
export default config;
