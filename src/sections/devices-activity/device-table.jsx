import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
//icons
import SignalCellular0BarIcon from '@mui/icons-material/SignalCellular0Bar';
import SignalCellular1BarIcon from '@mui/icons-material/SignalCellular1Bar';
import SignalCellular2BarIcon from '@mui/icons-material/SignalCellular2Bar';
import SignalCellular3BarIcon from '@mui/icons-material/SignalCellular3Bar';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';

const DeviceTable = ({data}) => {
   const lastNetwork = (network) => {
     switch (true) {
       case network === 0:
         return <SignalCellular0BarIcon />;
       case network >= 1 && network <= 10:
         return <SignalCellular1BarIcon />;
       case network > 10 && network <= 20:
         return <SignalCellular2BarIcon />;
       case network > 20 && network <= 28:
         return <SignalCellular3BarIcon />;
       case network > 28:
         return <SignalCellular4BarIcon />;
       default:
         return null;
     }
   };
  return (
    <div>
      <TableContainer
        sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)', mt: 3,borderRadius: '10px'}}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2, mt: 2, ml: 2 }}>
          FILIAL : {data[0]?.company?.name}
        </Typography>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>QURILMA NOMI</TableCell>
              <TableCell>HOLAT</TableCell>
              <TableCell>TARMOQ QUVVATI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell sx={{color: row?.connected ? 'green' : 'red'}}>{row?.connected ? 'Faollashtirilgan' : row?.last_activity.days !==0 ? `${row?.last_activity.days}kun avval`:row?.last_activity.hours!==0 ? `${row?.last_activity.hours} soat avval`: `${row?.last_activity.minutes}-minut avval`}</TableCell>
                <TableCell>{row.last_network} {lastNetwork(row.last_network)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeviceTable;
