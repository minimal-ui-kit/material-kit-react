import * as React from 'react';
import {  useState } from 'react';

import axiosInstance from 'src/routes/axios-config';
import { useQuery } from '@tanstack/react-query';

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
import LoadingSpinner from 'src/components/loading/loading';

export default function Report() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const {
    isLoading,
    error,
    data: reportData,
  } = useQuery({
    queryKey: ['report', page, rowsPerPage, filial, device, searchTerm],
    queryFn: () =>
      axiosInstance
        .get(
          `/merchant/report/?page_size=${rowsPerPage}&page=${
            page + 1
          }${filial !== 'all' ? `&device__company=${filial}` : ''}${
            device !== 'all' ? `&device=${device}` : ''
          }${searchTerm ? `&search=${searchTerm}` : ''}`
        )
        .then((res) => res.data),
    onError: (error) => {
      console.error(error);
    },
  });

  const {
    data: filials,
    isLoading: isLoadingFilials,
    error: errorFilials,
  } = useQuery({
    queryKey: ['filials'],
    queryFn: () => axiosInstance.get('/merchant/filials/').then((res) => res.data),
    onError: (error) => {
      console.error(error);
    },
  });

  const {
    data: devices,
    isLoading: isLoadingDevices,
    error: errorDevices,
  } = useQuery({
    queryKey: ['devices', filial],
    queryFn: () =>
      axiosInstance
        .get(`/merchant/devices/?company=${filial !== 'all' ? filial : ''}`)
        .then((res) => res.data),
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading || isLoadingDevices || isLoadingFilials) return <LoadingSpinner />;

  if (error || errorDevices || errorFilials) return 'An error has occurred: ' + error;
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          ml: 2,
          my: { xs: 2, sm: 2 },
        }}
      >
        <Typography variant="h6" sx={{ mr: 2 }}>
          Hisobot
        </Typography>
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
            {filials?.map((item) => (
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
            {devices.map((item) => (
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
              {reportData?.results?.map((row) => (
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
          count={Number(reportData?.count)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
