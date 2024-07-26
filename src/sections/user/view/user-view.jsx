import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


import formatDate from 'src/utils/format-date';

//material ui
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Container,
  InputLabel,
  Typography,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from '@mui/material';

export default function Report() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [selectFilialValue, setSelectFilialValue] = useState([]);
  const [selectDeviceValue, setSelectDeviceValue] = useState([]);
  const [filial, setFilial] = useState('all');
  const [device, setDevice] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilialChange = (event) => {
    setFilial(event.target.value);
  };

  const handleDeviceChange = (event) => {
    setDevice(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const url = `https://api.2pay.uz/api/merchant/report/?page_size=${rowsPerPage}&page=${
      page + 1
    }${filial !== 'all' ? `&device__company=${filial}` : ''}${
      device !== 'all' ? `&device=${device}` : ''
    }${searchTerm ? `&search=${searchTerm}` : ''}`;
    getData(url);
  }, [page, rowsPerPage, filial, device, searchTerm]);

  useEffect(() => {
    const getFilials = async () => {
      try {
        const response = await axios.get(`https://api.2pay.uz/api/merchant/filials/`, {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setSelectFilialValue(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFilials();
  }, []);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await axios.get(
          `https://api.2pay.uz/api/merchant/devices/?company=${filial!=='all' ? filial : ''}`,
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);
        setSelectDeviceValue(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDevices();
  }, [filial]);

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 2, my: 3 }}>
        <Typography variant="h4">Hisobot</Typography>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="filial-select-label">Filialni tanlang</InputLabel>
          <Select
            labelId="filial-select-label"
            id="filial-select"
            value={filial}
            label="Filialni tanlang"
            onChange={handleFilialChange}
            placeholder="Filialni tanlang"
          >
            <MenuItem value="all">Barchasi</MenuItem>
            {selectFilialValue.map((item) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="device-select-label">Qurilmani tanlang</InputLabel>
          <Select
            labelId="device-select-label"
            id="device-select"
            value={device}
            label="Qurilmani tanlang"
            onChange={handleDeviceChange}
            placeholder="Qurilmani tanlang"
          >
            <MenuItem value="all">Barchasi</MenuItem>
            {selectDeviceValue.map((item) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <TextField
            label="Qidiruv"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </FormControl>
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
                <TableCell>FILIAL NOMI</TableCell>
                <TableCell>QURILMA NOMI</TableCell>
                <TableCell>NAQD TO'LOV</TableCell>
                <TableCell>ONLINE TO'LOV</TableCell>
                <TableCell>MANUAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell>{formatDate(row?.created)}</TableCell>
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
          count={Number(data?.count)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
