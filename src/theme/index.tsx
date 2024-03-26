import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { overrides } from './overrides.ts';
import { getDesignTokens } from './palette.ts';

// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function ThemeProvider({ mode, children }) {
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  console.log(theme);

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
