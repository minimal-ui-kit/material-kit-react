import type { BoxProps } from '@mui/material/Box';

import ApexChart from 'react-apexcharts';

import Box from '@mui/material/Box';

import { chartClasses } from './classes';

import type { ChartProps } from './types';

// ----------------------------------------------------------------------

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  className,
  width = '100%',
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir="ltr"
      className={chartClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <ApexChart type={type} series={series} options={options} width="100%" height="100%" />
    </Box>
  );
}
