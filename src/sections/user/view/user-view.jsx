import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Container, Typography } from '@mui/material';

import axios from 'axios';






export default function Report() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const url = `https://api.2pay.uz/api/merchant/report/?page_size=${rowsPerPage}&page=${page + 1}`
  useEffect(() => {
    
    const getData = async (url) => {
      try {
        const response = await axios.get(
          url,
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData(url);
  }, [url]);
  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, my: 3 }}>
        <Typography variant="h4">Hisobot</Typography>
      </Box>

      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>SANA VA VAQT</TableCell>
                <TableCell>FILIAL NOMMI</TableCell>
                <TableCell>QURILMA NOMI</TableCell>
                <TableCell>NAQD TO'LOV</TableCell>
                <TableCell>ONLINE TO'LOV</TableCell>
                <TableCell>MANUAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.map((row) => (
                <TableRow>
                  <TableCell>{row?.created}</TableCell>
                  <TableCell>{row?.device?.company?.name}</TableCell>
                  <TableCell>{row?.device?.name}</TableCell>
                  <TableCell>{row?.diff?.cash}</TableCell>
                  <TableCell>{row?.diff?.click}</TableCell>
                  <TableCell>{row?.diff?.manual}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
