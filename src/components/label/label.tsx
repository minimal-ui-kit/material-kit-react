import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { StyledLabel } from './styles';
import { labelClasses } from './classes';

import type { LabelProps } from './types';

// ----------------------------------------------------------------------

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    { children, color = 'default', variant = 'soft', startIcon, endIcon, sx, className, ...other },
    ref
  ) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': {
        width: 1,
        height: 1,
        objectFit: 'cover',
      },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        className={labelClasses.root.concat(className ? ` ${className}` : '')}
        ownerState={{ color, variant }}
        sx={{ ...(startIcon && { pl: 0.75 }), ...(endIcon && { pr: 0.75 }), ...sx }}
        theme={theme}
        {...other}
      >
        {startIcon && (
          <Box component="span" className={labelClasses.icon} sx={{ mr: 0.75, ...iconStyles }}>
            {startIcon}
          </Box>
        )}

        {typeof children === 'string' ? sentenceCase(children) : children}

        {endIcon && (
          <Box component="span" className={labelClasses.icon} sx={{ ml: 0.75, ...iconStyles }}>
            {endIcon}
          </Box>
        )}
      </StyledLabel>
    );
  }
);

// ----------------------------------------------------------------------

function sentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
