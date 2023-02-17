import React, { useState } from 'react';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Container, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import {AppWidgetSummary,} from '../../../sections/@dashboard/app';
import LoginPage from '../../../pages/LoginPage';
import RegisterPage from '../../../pages/RegisterPage';

// ----------------------------------------------------------------------

const NAV_WIDTH = 0;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  // ...bgBlur({ color: theme.palette.background.default }),
  ...bgBlur ({color: '#280003'}),
  boxShadow: 'none',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    height: '10%',
    width: '100%',
  },
  zIndex: 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {

    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
      setShowComponent(!showComponent);
    }

  return (

    <StyledRoot>

    {/* {showComponent && <LoginPage />} */}
      {/* {showComponent && <LoginPage />} */}
      {showComponent && (<LoginPage show={showComponent} onClose={() => setShowComponent(false)} />)}

      <StyledToolbar>

        <Container maxWidth="xxl">
            <AppWidgetSummary height={3} width={5} color="redblack" title="Lingo" />
            <Button onClick={handleClick} variant="contained" size="large" align="center">Login</Button>
        </Container>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover /> */}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
