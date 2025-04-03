import type { CSSObject } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Generates a border gradient CSS object.
 *
 * @param {BorderGradientProps} props - The properties for the border gradient.
 * @param {string} [props.color] - The gradient color.
 * @param {string} [props.padding='2px'] - The padding inside the border.
 * @returns {CSSObject} The CSS object for the border gradient.
 *
 * @example
 * ...theme.mixins.borderGradient({ color: `to right, ${theme.vars.palette.primary.main}, ${alpha(theme.vars.palette.primary.mainChannel, 0.2)}`, padding: '4px' }),
 */
export type BorderGradientProps = {
  color?: string;
  padding?: string;
};

export function borderGradient(props?: BorderGradientProps): CSSObject {
  const { color, padding = '2px' } = props ?? {};

  return {
    padding,
    inset: 0,
    width: '100%',
    content: '""',
    height: '100%',
    margin: 'auto',
    position: 'absolute',
    borderRadius: 'inherit',
    /********/
    mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
    WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor',
    ...(color && {
      background: color,
    }),
  };
}
