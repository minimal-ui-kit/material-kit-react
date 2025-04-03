import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import type { FontStyleExtend } from './core/typography';
import type { CustomShadows } from './core/custom-shadows';
import type {
  GreyExtend,
  TypeTextExtend,
  CommonColorsExtend,
  PaletteColorExtend,
  TypeBackgroundExtend,
} from './core/palette';
import type {
  BgBlurMixin,
  MaxLineMixin,
  BgGradientMixin,
  PaperStylesMixin,
  TextGradientMixin,
  MenuItemStylesMixin,
  BorderGradientProps,
} from './core/mixins';

// ----------------------------------------------------------------------

/** **************************************
 * EXTEND CORE
 * Palette, typography, shadows...
 *************************************** */

/**
 * Palette
 * https://mui.com/customization/palette/
 * @from {@link file://./core/palette.ts}
 */
declare module '@mui/material/styles/createPalette' {
  // grey
  interface Color extends GreyExtend {}
  // text
  interface TypeText extends TypeTextExtend {}
  // black & white
  interface CommonColors extends CommonColorsExtend {}
  // background
  interface TypeBackground extends TypeBackgroundExtend {}
  // primary, secondary, info, success, warning, error
  interface PaletteColor extends PaletteColorExtend {}
  interface SimplePaletteColorOptions extends PaletteColorExtend {}
}

/**
 * Typography
 * https://mui.com/customization/typography/
 * @from {@link file://./core/typography.ts}
 */
declare module '@mui/material/styles/createTypography' {
  interface FontStyle extends FontStyleExtend {}
}

declare module '@mui/material/styles' {
  /**
   * Custom shadows
   * @from {@link file://./core/custom-shadows.ts}
   */
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
  interface ThemeVars {
    customShadows: CustomShadows;
    typography: Theme['typography'];
    transitions: Theme['transitions'];
  }
}

/** **************************************
 * EXTEND MIXINS
 *************************************** */
/**
 * @from {@link file://./core/mixins.ts}
 */
declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    hideScrollX: CSSObject;
    hideScrollY: CSSObject;
    borderGradient: BorderGradientProps;
    bgGradient: BgGradientMixin;
    bgBlur: BgBlurMixin;
    textGradient: TextGradientMixin;
    maxLine: MaxLineMixin;
    menuItemStyles: MenuItemStylesMixin;
    paperStyles: PaperStylesMixin;
  }
  interface MixinsOptions {
    hideScrollX?: CSSObject;
    hideScrollY?: CSSObject;
    borderGradient?: BorderGradientProps;
    bgGradient?: BgGradientMixin;
    bgBlur?: BgBlurMixin;
    textGradient?: TextGradientMixin;
    maxLine?: MaxLineMixin;
    menuItemStyles?: MenuItemStylesMixin;
    paperStyles?: PaperStylesMixin;
  }
}
