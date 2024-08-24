import type { Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { varAlpha, stylesMode } from 'src/theme/styles';

import type { LabelColor, LabelVariant } from './types';

// ----------------------------------------------------------------------

export const StyledLabel = styled(Box)(({
  theme,
  ownerState: { color, variant },
}: {
  theme: Theme;
  ownerState: {
    color: LabelColor;
    variant: LabelVariant;
  };
}) => {
  const defaultColor = {
    ...(color === 'default' && {
      /**
       * @variant filled
       */
      ...(variant === 'filled' && {
        color: theme.vars.palette.common.white,
        backgroundColor: theme.vars.palette.text.primary,
        [stylesMode.dark]: { color: theme.vars.palette.grey[800] },
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

  const styleColors = {
    ...(color !== 'default' && {
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
        [stylesMode.dark]: { color: theme.vars.palette[color].light },
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
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    borderRadius: theme.shape.borderRadius * 0.75,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...defaultColor,
    ...styleColors,
  };
});
