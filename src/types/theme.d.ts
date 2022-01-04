import { Theme, ThemeOptions, Palette, CreateMUIStyled } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface PaletteColor {
        lighter: string;
        light: string;
        main: string;
        dark: string;
        darker: string;
        contrastText: string;
    }
    interface CustomTheme extends Theme {
        customShadows?: {
            z1: string;
            z8: string;
            z12: string;
            z16: string;
            z20: string;
            z24: string;
        };
      }
      // allow configuration using `createTheme`
      interface CustomThemeOptions extends ThemeOptions {
        customShadows?: {
            z1: string;
            z8: string;
            z12: string;
            z16: string;
            z20: string;
            z24: string;
        };
      }
      export function createTheme(options?: CustomThemeOptions): CustomTheme;
      export const styled: CreateMUIStyled<CustomTheme>;
}
