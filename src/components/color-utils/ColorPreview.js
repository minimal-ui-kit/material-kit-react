import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

ColorPreview.propTypes = {
  sx: PropTypes.object,
  limit: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default function ColorPreview({ colors, limit = 3, sx }) {
  const showColor = colors.slice(0, limit);

  const moreColor = colors.length - limit;

  return (
    <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
      {showColor.map((color, index) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
            bgcolor: color,
          }}
        />
      ))}

      {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
    </Stack>
  );
}
