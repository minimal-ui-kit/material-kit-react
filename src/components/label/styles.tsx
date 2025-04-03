import type { CSSObject } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import type { LabelProps } from './types';

// ----------------------------------------------------------------------

export const LabelRoot = styled('span', {
  shouldForwardProp: (prop: string) => !['color', 'variant', 'disabled', 'sx'].includes(prop),
})<LabelProps>(({ color, variant, disabled, theme }) => {
  const defaultStyles: CSSObject = {
    ...(color === 'default' && {
      /**
       * @variant filled
       */
      ...(variant === 'filled' && {
        color: theme.vars.palette.common.white,
        backgroundColor: theme.vars.palette.text.primary,
        ...theme.applyStyles('dark', {
          color: theme.vars.palette.grey[800],
        }),
      }),
      /**
       * @variant outlined
       */
      ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        color: theme.vars.palette.text.primary,
        border: `2px solid ${theme.vars.palette.text.primary}`,
      }),
      /**
       * @variant soft
       */
      ...(variant === 'soft' && {
        color: theme.vars.palette.text.secondary,
        backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
      }),
      /**
       * @variant inverted
       */
      ...(variant === 'inverted' && {
        color: theme.vars.palette.grey[800],
        backgroundColor: theme.vars.palette.grey[300],
      }),
    }),
  };

  const colorStyles: CSSObject = {
    ...(color &&
      color !== 'default' && {
        /**
         * @variant filled
         */
        ...(variant === 'filled' && {
          color: theme.vars.palette[color].contrastText,
          backgroundColor: theme.vars.palette[color].main,
        }),
        /**
         * @variant outlined
         */
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          color: theme.vars.palette[color].main,
          border: `2px solid ${theme.vars.palette[color].main}`,
        }),
        /**
         * @variant soft
         */
        ...(variant === 'soft' && {
          color: theme.vars.palette[color].dark,
          backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
          ...theme.applyStyles('dark', {
            color: theme.vars.palette[color].light,
          }),
        }),
        /**
         * @variant inverted
         */
        ...(variant === 'inverted' && {
          color: theme.vars.palette[color].darker,
          backgroundColor: theme.vars.palette[color].lighter,
        }),
      }),
  };

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    flexShrink: 0,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    gap: theme.spacing(0.75),
    justifyContent: 'center',
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    borderRadius: theme.shape.borderRadius * 0.75,
    transition: theme.transitions.create(['all'], { duration: theme.transitions.duration.shorter }),
    ...defaultStyles,
    ...colorStyles,
    ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
  };
});

export const LabelIcon = styled('span')({
  width: 16,
  height: 16,
  flexShrink: 0,
  '& svg, img': { width: '100%', height: '100%', objectFit: 'cover' },
});
