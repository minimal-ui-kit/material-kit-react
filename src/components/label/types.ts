import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export type LabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type LabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';

export interface LabelProps extends BoxProps {
  color?: LabelColor;
  variant?: LabelVariant;
  endIcon?: React.ReactElement | null;
  startIcon?: React.ReactElement | null;
}
