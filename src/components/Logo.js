import { Link as RouterLink } from 'react-router-dom';
// material

// ----------------------------------------------------------------------

Logo.propTypes = {};

export default function Logo() {
  return (
    <RouterLink to="/">
      <img src="/static/logo.png" width={160} height={60} alt="gct-logo" />
    </RouterLink>
  );
}
