import type { Theme, SxProps } from '@mui/material/styles';
import type { Props as SimplebarProps } from 'simplebar-react';

// ----------------------------------------------------------------------

export type ScrollbarProps = SimplebarProps & {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  fillContent?: boolean;
  slotProps?: {
    wrapperSx?: SxProps<Theme>;
    contentSx?: SxProps<Theme>;
    contentWrapperSx?: SxProps<Theme>;
  };
};
