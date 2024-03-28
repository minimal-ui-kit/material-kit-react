import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';

import { ColorModeContext } from '../../../app.tsx';

const BrightnessButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === 'dark' ? 'Light' : 'Dark'}
    </IconButton>
  );
};

export default BrightnessButton;
