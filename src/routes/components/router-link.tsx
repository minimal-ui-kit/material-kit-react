import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const RouterLink = forwardRef(({ href, ...other }, ref) => (
  <Link ref={ref} to={href} {...other} />
));

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
