import PropTypes from 'prop-types';
// material
import { CustomTheme, useMediaQuery } from '@mui/material';

// ----------------------------------------------------------------------

MHidden.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf([
    'xsDown',
    'smDown',
    'mdDown',
    'lgDown',
    'xlDown',
    'xsUp',
    'smUp',
    'mdUp',
    'lgUp',
    'xlUp'
  ]).isRequired
};

export default function MHidden({ width, children }: any) {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery<CustomTheme>((theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery<CustomTheme>((theme) => theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
}
