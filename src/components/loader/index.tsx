import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { FC } from 'react';
import { varAlpha } from 'src/theme/styles';

interface LoaderProps extends BoxProps {}

const Loader: FC<LoaderProps> = (props) => (
  <Box display="flex" alignItems="center" justifyContent="center" flex={1} {...props}>
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export default Loader;
