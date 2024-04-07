import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import Label from 'src/components/label';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function WbsTableRow({
  selected,
  name,
  startDate,
  endDate,
  estimate,
  uploaded,
  resource,
  handleClick,
  wbsIndent,
  wbsNext,
  jiraIdentifier,
}) {
  const secondsToHoursMinutes = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    const formattedTime = [];

    if (hours > 0) {
      formattedTime.push(`${hours}h`);
    }

    if (minutes > 0) {
      formattedTime.push(`${minutes}m`);
    }

    return formattedTime.join(' ');
  };
  const getIndentation = (wbsFormat) => {
    const depth = wbsFormat.split('.').length;
    const nextDepth = wbsNext.split('.').length;
    // console.log(depth, wbsFormat);
    // Define the base indentation and the incremental value
    const baseIndent = 5; // You can adjust this based on your preference
    const incrementalIndent = 10; // Adjust this based on your preference

    // Calculate the total indentation based on the depth
    const totalIndent = baseIndent + (depth - 1) * incrementalIndent;
    if (depth === 1 || depth < nextDepth) {
      return {
        fontWeight: 'bold',
        marginLeft: `${totalIndent}px`,
      };
    }
    return {
      marginLeft: `${totalIndent}px`,
    };
  };
  const getIndentationStyle = getIndentation(wbsIndent);

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>
      <TableCell align="left">
        <Typography fontSize={10}>{wbsIndent}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography fontSize={13} sx={getIndentationStyle}>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography fontSize={13}>{new Date(startDate).toLocaleDateString('en-US')}</Typography>
      </TableCell>

      <TableCell align="left">
        <Typography fontSize={13}>{new Date(endDate).toLocaleDateString('en-US')}</Typography>
      </TableCell>

      <TableCell align="center">
        <Typography fontSize={13}>{secondsToHoursMinutes(estimate)}</Typography>
      </TableCell>
      <TableCell align="center">
        {resource.map((res) => (
          <Typography key={res.email} fontSize={13}>
            {res.name}
          </Typography>
        ))}
      </TableCell>

      <TableCell align="center">
        {uploaded ? (
          <Button
            startIcon={
              <Avatar src={jiraIdentifier.icon} style={{ width: '20px', height: 'auto' }} />
            }
            endIcon={
              <Iconify
                icon="fluent-mdl2:open-in-new-tab"
                style={{ width: '12px', paddingBottom: '9px' }}
              />
            }
            color="primary"
            onClick={() => window.open(jiraIdentifier.url)}
          >
            {jiraIdentifier.key}
          </Button>
        ) : (
          <Label color="error"> - </Label>
        )}
      </TableCell>
    </TableRow>
  );
}

WbsTableRow.propTypes = {
  estimate: PropTypes.number,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  uploaded: PropTypes.bool,
  name: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  resource: PropTypes.array,
  wbsIndent: PropTypes.string,
  wbsNext: PropTypes.string,
  jiraIdentifier: PropTypes.object,
};
