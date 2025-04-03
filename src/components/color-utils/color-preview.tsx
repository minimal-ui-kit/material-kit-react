import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { colorPreviewClasses } from './classes';

// ----------------------------------------------------------------------

export type ColorPreviewSlotProps = {
  item?: React.ComponentProps<typeof ItemRoot>;
  label?: React.ComponentProps<typeof ItemLabel>;
};

export type ColorPreviewProps = React.ComponentProps<typeof ColorPreviewRoot> & {
  limit?: number;
  size?: number;
  gap?: number;
  colors: string[];
  slotProps?: ColorPreviewSlotProps;
};

export function ColorPreview({
  sx,
  colors,
  className,
  slotProps,
  gap = 6,
  limit = 3,
  size = 16,
  ...other
}: ColorPreviewProps) {
  const colorsRange = colors.slice(0, limit);
  const remainingColorCount = colors.length - limit;

  return (
    <ColorPreviewRoot
      className={mergeClasses([colorPreviewClasses.root, className])}
      sx={sx}
      {...other}
    >
      {colorsRange.map((color, index) => (
        <ItemRoot
          key={color + index}
          className={colorPreviewClasses.item}
          {...slotProps?.item}
          sx={[
            {
              '--item-color': color,
              '--item-size': `${size}px`,
              '--item-gap': `${-gap}px`,
            },
            ...(Array.isArray(slotProps?.item?.sx)
              ? (slotProps.item?.sx ?? [])
              : [slotProps?.item?.sx]),
          ]}
        />
      ))}

      {colors.length > limit && (
        <ItemLabel
          className={colorPreviewClasses.label}
          {...slotProps?.label}
        >{`+${remainingColorCount}`}</ItemLabel>
      )}
    </ColorPreviewRoot>
  );
}

// ----------------------------------------------------------------------

const ColorPreviewRoot = styled('ul')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const ItemRoot = styled('li')(({ theme }) => ({
  borderRadius: '50%',
  width: 'var(--item-size)',
  height: 'var(--item-size)',
  marginLeft: 'var(--item-gap)',
  backgroundColor: 'var(--item-color)',
  border: `solid 2px ${theme.vars.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
}));

const ItemLabel = styled('li')(({ theme }) => ({
  ...theme.typography.subtitle2,
}));
