import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';
import useUser from 'src/hooks/useUser';
import useAdmin from 'src/hooks/useAdmin';

import AuthService from 'src/services/auth';
import { UserRole } from 'src/services/user/user.dto';

import ToggleSwitch from 'src/components/shared/switch/toggle';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { AccountPopover } from '../components/account-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const { userExists } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const { isAdminMode, setIsAdmin } = useAdmin();

  const isAdmin = !!user?.role.includes(UserRole.Admin);

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  const onToggleAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  useEffect(() => {
    if (!AuthService.hasToken()) {
      router.replace('/signin');
    }
  }, [userExists, router]);

  const navOptions = isAdminMode ? navData : navData.filter((nav) => nav.title !== 'Partners');
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                {isAdmin && (
                  <ToggleSwitch label="Admin Mode" onChange={onToggleAdmin} checked={isAdminMode} />
                )}
                {/* <NotificationsPopover data={_notifications} /> */}
                <AccountPopover
                  data={
                    [
                      // {
                      //   label: 'Profile',
                      //   href: '#',
                      //   icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                      // },
                      // {
                      //   label: 'Settings',
                      //   href: '#',
                      //   icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                      // },
                    ]
                  }
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navOptions} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
