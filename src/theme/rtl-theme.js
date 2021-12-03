/* eslint-disable prettier/prettier */
// material
import { createTheme } from '@mui/material/styles';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

const themeOptions = () => ({
    direction: 'ltr',
    palette,
    shape,
    typography,
    shadows,
    customShadows
});

export const rtlTheme = createTheme(themeOptions());
rtlTheme.components = componentsOverride(rtlTheme);
