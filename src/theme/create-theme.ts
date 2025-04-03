import type { Theme } from '@mui/material/styles';

import { createTheme as createMuiTheme } from '@mui/material/styles';

import { mixins } from './core/mixins';
import { themeConfig } from './theme-config';
import { shadows, palette, typography, components, customShadows } from './core';

import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows(),
      customShadows: customShadows(),
    },
    dark: {},
  },
  mixins,
  components,
  typography,
  shape: { borderRadius: 8 },
  cssVariables: themeConfig.cssVariables,
};

export function createTheme(): Theme {
  const theme = createMuiTheme(baseTheme);

  return theme;
}
