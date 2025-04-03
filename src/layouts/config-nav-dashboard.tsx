import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  blog: icon('ic-blog'),
  lock: icon('ic-lock'),
  user: icon('ic-user'),
  cart: icon('ic-cart'),
  disabled: icon('ic-disabled'),
  analytics: icon('ic-analytics'),
};

export const navData = [
  { title: 'Dashboard', path: '/', icon: ICONS.analytics },
  { title: 'User', path: '/user', icon: ICONS.user },
  {
    title: 'Product',
    path: '/products',
    icon: ICONS.cart,
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  { title: 'Blog', path: '/blog', icon: ICONS.blog },
  { title: 'Sign in', path: '/sign-in', icon: ICONS.lock },
  { title: 'Not found', path: '/404', icon: icon('ic-disabled') },
];
