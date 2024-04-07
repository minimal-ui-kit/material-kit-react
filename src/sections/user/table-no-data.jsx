import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            No Data Found
          </Typography>

          {query.length > 0 ? (
            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{query}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          ) : (
            <Typography variant="body1">Upload a file to start.</Typography>
          )}
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
