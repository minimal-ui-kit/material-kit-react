import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function AppTransactionsTable({ data, title }) {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 0, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2, mt: 2, ml: 2 }}>
        {title}
      </Typography>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>FILIAL NOMI</TableCell>
            <TableCell sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>QURILMA NOMI</TableCell>
            <TableCell sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>MIQDORI SO'M</TableCell>
            <TableCell align="right" sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
              SANA VA VAQT
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ fontWeight: 'bold' }}>{row.filial_name}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                {row.device_name}
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    padding: '3px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {row.amount}
                </Box>
              </TableCell>
              <TableCell align="center">{formatDate(row.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
