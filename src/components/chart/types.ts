import type { Props } from 'react-apexcharts';
import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ChartProps = {
  type: Props['type'];
  series: Props['series'];
  options: Props['options'];
};

export type ChartBaseProps = Props;

export type ChartOptions = Props['options'];

export type ChartLoadingProps = {
  disabled?: boolean;
  sx?: SxProps<Theme>;
};
