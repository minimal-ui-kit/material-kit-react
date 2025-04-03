import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SvgColorProps = React.ComponentProps<'span'> & {
  src: string;
  sx?: SxProps<Theme>;
};
