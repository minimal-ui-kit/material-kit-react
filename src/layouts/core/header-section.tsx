import type { Breakpoint } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material/AppBar';
import type { ToolbarProps } from '@mui/material/Toolbar';
import type { ContainerProps } from '@mui/material/Container';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { bgBlur, varAlpha } from 'src/theme/styles';

import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery: Breakpoint;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    toolbar?: ToolbarProps;
    container?: ContainerProps;
  };
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  layoutQuery = 'md',
  ...other
}: HeaderSectionProps) {
  const theme = useTheme();

  const toolbarStyles = {
    default: {
      ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
      minHeight: 'auto',
      height: 'var(--layout-header-mobile-height)',
      transition: theme.transitions.create(['height', 'background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [theme.breakpoints.up(layoutQuery)]: {
        height: 'var(--layout-header-desktop-height)',
      },
    },
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      className={layoutClasses.header}
      sx={{
        boxShadow: 'none',
        zIndex: 'var(--layout-header-zIndex)',
        ...sx,
      }}
      {...other}
    >
      {slots?.topArea}

      <Toolbar
        disableGutters
        {...slotProps?.toolbar}
        sx={{
          ...toolbarStyles.default,
          ...slotProps?.toolbar?.sx,
        }}
      >
        <Container
          {...slotProps?.container}
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            ...slotProps?.container?.sx,
          }}
        >
          {slots?.leftArea}

          <Box sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
            {slots?.centerArea}
          </Box>

          {slots?.rightArea}
        </Container>
      </Toolbar>

      {slots?.bottomArea}
    </AppBar>
  );
}
