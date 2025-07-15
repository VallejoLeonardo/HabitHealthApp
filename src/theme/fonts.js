/**
 * Typography configuration for HabitHealthApp
 * Defines font sizes, weights, and families for consistent text styling
 */

export const fonts = {
  // Font families
  family: {
    regular: "System",
    medium: "System",
    bold: "System",
    light: "System",
  },

  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },

  // Font weights
  weight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Predefined text styles
export const textStyles = {
  h1: {
    fontSize: fonts.size["4xl"],
    fontWeight: fonts.weight.bold,
    // lineHeight as pixel value (fontSize * multiplier)
    lineHeight: fonts.size["4xl"] * fonts.lineHeight.tight,
  },
  h2: {
    fontSize: fonts.size["3xl"],
    fontWeight: fonts.weight.bold,
    lineHeight: fonts.size["3xl"] * fonts.lineHeight.tight,
  },
  h3: {
    fontSize: fonts.size["2xl"],
    fontWeight: fonts.weight.semibold,
    lineHeight: fonts.size["2xl"] * fonts.lineHeight.normal,
  },
  h4: {
    fontSize: fonts.size.xl,
    fontWeight: fonts.weight.semibold,
    lineHeight: fonts.size.xl * fonts.lineHeight.normal,
  },
  body: {
    fontSize: fonts.size.base,
    fontWeight: fonts.weight.normal,
    lineHeight: fonts.size.base * fonts.lineHeight.normal,
  },
  bodySmall: {
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.normal,
    lineHeight: fonts.size.sm * fonts.lineHeight.normal,
  },
  caption: {
    fontSize: fonts.size.xs,
    fontWeight: fonts.weight.normal,
    lineHeight: fonts.size.xs * fonts.lineHeight.normal,
  },
  button: {
    fontSize: fonts.size.base,
    fontWeight: fonts.weight.medium,
    letterSpacing: fonts.letterSpacing.wide,
    // optional lineHeight for buttons
    lineHeight: fonts.size.base * fonts.lineHeight.normal,
  },
};

export default fonts;
