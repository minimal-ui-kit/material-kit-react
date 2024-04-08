import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';

import { ColorModeContext } from '../../../app.tsx';
import Iconify from '../../../components/iconify';

const BrightnessButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
      <Iconify
        icon={theme.palette.mode === 'dark' ? 'eva:sun-outline' : 'eva:moon-outline'}
      ></Iconify>
    </IconButton>
  );
};

export default BrightnessButton;
