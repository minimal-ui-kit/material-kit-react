import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import { account } from 'src/_mock/account'; //do not have user id it can be retrived from shopPS CAUSE EACH SHOP HAVE USERID

import {
  getShopLoginLink,
  useApiShop,
  useDeleteUserById,
} from '../../../sections/products-v2/etsy/useApi.ts';

const MENU_OPTIONS = [
  { label: 'Home', icon: 'eva:home-fill' },
  { label: 'Profile', icon: 'eva:person-fill' },
  { label: 'Settings', icon: 'eva:settings-2-fill' },
];

const ShopPopover = () => {
  const { fetchShopLink } = getShopLoginLink();
  const { shops, deleteShop } = useApiShop();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { deleteUser } = useDeleteUserById();

  const handleOpen = (index: number) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopoverIndex(index);
    console.log('shops', shops);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopoverIndex(null);
  };

  const handleShopLogin = async () => {
    const link = await fetchShopLink();
    if (link) window.location.replace(link);
  };

  const renderIconButton = (src: string, alt: string, index: number) => (
    <IconButton
      onClick={index === 0 ? handleShopLogin : handleOpen(index)}
      sx={{
        width: 40,
        height: 40,
        background: (theme) => alpha(theme.palette.grey[500], 0.08),
        ...(openPopoverIndex === index && {
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        }),
      }}
    >
      <Avatar
        src={src}
        alt={alt}
        sx={{
          width: 36,
          height: 36,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
        }}
      >
        {alt.charAt(0).toUpperCase()}
      </Avatar>
    </IconButton>
  );

  const renderPopover = (index: number) => (
    <Popover
      open={openPopoverIndex === index}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        p: 0,
        mt: 1,
        ml: 0.75,
        width: 200,
      }}
    >
      <Box sx={{ my: 1.5, px: 2 }}>
        <Typography variant="subtitle2" noWrap>
          {account.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {account.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
      {MENU_OPTIONS.map((option) => (
        <MenuItem key={option.label} onClick={handleClose}>
          {option.label}
        </MenuItem>
      ))}
      <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
      <MenuItem
        onClick={async () => {
          if (shops && shops.length > 0) {
            await deleteUser(Number(shops[index - 1].user_id));
            await deleteShop(Number(shops[index - 1].user_id));
            window.location.reload();
          }
          handleClose();
        }}
      >
        Logout
      </MenuItem>
    </Popover>
  );

  return (
    <>
      {renderIconButton('/assets/plus.png', account.displayName, 0)}
      {shops &&
        shops.length > 0 &&
        shops.map((shop, index) => (
          <React.Fragment key={index}>
            {renderIconButton(shop.icon ?? '', shop.name, index + 1)}
            {renderPopover(index + 1)}
          </React.Fragment>
        ))}
    </>
  );
};

export default ShopPopover;
