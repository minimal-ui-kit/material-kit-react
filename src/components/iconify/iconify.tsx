import type { IconProps } from '@iconify/react';

import { forwardRef } from 'react';
import { Icon, disableCache } from '@iconify/react';
import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { iconifyClasses } from './classes';

// ----------------------------------------------------------------------

export type IconifyProps = React.ComponentProps<typeof IconRoot> & IconProps;

export const Iconify = forwardRef<SVGSVGElement, IconifyProps>((props, ref) => {
  const { className, width = 20, sx, ...other } = props;

  return (
    <IconRoot
      ssr
      ref={ref}
      className={mergeClasses([iconifyClasses.root, className])}
      sx={[
        {
          width,
          height: width,
          flexShrink: 0,
          display: 'inline-flex',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
});

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local');

// ----------------------------------------------------------------------

const IconRoot = styled(Icon)``;
