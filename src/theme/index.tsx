import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { customShadows } from './custom-shadows.ts';
import { overrides } from './overrides.ts';
import { palette } from './palette.ts';
import { shadows } from './shadows.ts';
import { typography } from './typography.ts';

// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const theme = createTheme(memoizedValue);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
