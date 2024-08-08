import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import { account } from 'src/_mock/account';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover({ data }) {
  const navigate = useNavigate();
  // const [data, setData] = useState({});
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const storedUser = localStorage.getItem('user');
  let user = {};
  try {
    user = JSON.parse(storedUser) || {};
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src="/assets/images/avatars/avatar_1.jpg"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {/* {account.displayName.charAt(0).toUpperCase()} */}
          {user?.first_name}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 3, px: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.current_company?.name}
            {`(${user?.role?.name})`}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ color: 'text.secondary' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.first_name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.last_name}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', cursor: 'pointer' }} noWrap>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/select-company-role">
              Rolni o'zgartirish
            </Link>
          </Typography>
        </Box>

        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))} */}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={() => {
            navigate('/login', { replace: true });
          }}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Chiqish
        </MenuItem>
      </Popover>
    </>
  );
}
