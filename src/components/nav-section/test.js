import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText,ListItemButton, Collapse,ListItemIcon } from '@mui/material';
import { StarBorder,ExpandMore,ExpandLess } from '@mui/icons-material';
import { StyledNavItem, StyledNavItemIcon } from './styles';



// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}


function NavItem({ item }) {
  const { title, path, icon,child} = item;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <StyledNavItem
    component={RouterLink}
    to={path}
    sx={{
      '&.active': {
        color: 'text.primary',
        bgcolor: 'action.selected',
        fontWeight: 'fontWeightBold',
      }

    }}>
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemButton onClick={handleClick}>
      <ListItemText disableTypography primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

   {child ? <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
    {
    child.map((item) => (
      <ListItemButton 
          component={RouterLink}
          to={item.path}
          sx={{
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            }
    
          }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText disableTypography primary={item.title}/>
      </ListItemButton> 
        ))}
    </List>
  </Collapse>
  : null
}
    </StyledNavItem>

  );
}


