import type { CSSObject } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Usage:
 * ...hideScrollX,
 * ...hideScrollY,
 */
export const hideScrollX: CSSObject = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowX: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
};

export const hideScrollY: CSSObject = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
};

/**
 * Usage:
 * ...textGradient(`to right, ${theme.vars.palette.text.primary}, ${alpha(theme.vars.palette.text.primary, 0.2)}`
 */
export function textGradient(color: string): CSSObject {
  return {
    background: `linear-gradient(${color})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    color: 'transparent',
  };
}

/**
 * Usage:
 * ...bgGradient({ color: `to right, ${theme.vars.palette.grey[900]} 25%, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.88)}`, imgUrl: '/assets/background/overlay.png' }),
 */
export type BgGradientProps = {
  color: string;
  imgUrl?: string;
};

export function bgGradient({ color, imgUrl }: BgGradientProps): CSSObject {
  if (imgUrl) {
    return {
      background: `linear-gradient(${color}), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }
  return { background: `linear-gradient(${color})` };
}

/**
 * Usage:
 * ...bgBlur({ color: `varAlpha(theme.vars.palette.background.paperChannel, 0.8)`, imgUrl: '/assets/background/overlay.png', blur: 6 }),
 */
export type BgBlurProps = {
  color: string;
  blur?: number;
  imgUrl?: string;
};

export function bgBlur({ color, blur = 6, imgUrl }: BgBlurProps): CSSObject {
  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&::before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: color,
      },
    };
  }
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color,
  };
}
