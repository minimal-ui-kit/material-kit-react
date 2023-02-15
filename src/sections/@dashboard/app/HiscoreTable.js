import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


HiscoreTable.propTypes = {
  title: PropTypes.string
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Winston', 'English', 139, 24, 4.0),
  createData('Jurre', 'Mandarin', 124, 37, 4.3),
  createData('Dennis', 'Slang', 123, 24, 6.0),
  createData('Douwe', 'Mandarin', 119, 67, 4.3),
  createData('Jurre', 'Noob', 100000, 49, 3.9),
];

export default function HiscoreTable({title, height, color, sx}) {
  return (
    <TableContainer component={Paper}
      sx={{
        my: 15,
        py: height,
        boxShadow: 10,
        textAlign: 'center',
        // color: (theme) => theme.palette[color].darker,
        color: '#000000',
        bgcolor: (theme) => theme.palette[color].orange,
        ...sx,
      }}>
      <Table sx={{ minWidth: 650 , height: 200, opacity:1, color:"#00000"}} aria-label="simple table">
        <TableBody sx={{
          my: 0,
          bgcolor: (theme) => theme.palette[color].white,
          color: '#FFFFFF',
          ...sx,
        }}>
          <TableRow>
            <TableCell >Hiscores</TableCell>
            <TableCell align="center">Wordlist</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center" >{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}