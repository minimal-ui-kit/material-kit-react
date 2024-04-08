import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { Transaction } from '../etsy/etsy-api.types.ts';
import { useApiShopReceipts } from '../etsy/useApi.ts';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import UserTableHead from '../user-table-head';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import { applyFilter, emptyRows, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ProductsV2View() {
  const { userData } = useApiShopReceipts();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState<number[]>([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headLabel = [
    { id: 'shopReceipt.receipt_id', label: 'Order' },
    { id: 'shopReceipt.name', label: 'Customer' },
    { id: 'shopReceipt.created_timestamp', label: 'Date' },
    { id: 'subTotal', label: 'Subtotal' },
    { id: 'netProfit', label: 'Net profit' },
    { id: 'shopReceipt.status', label: 'Status' },
    { id: '' },
    { id: 'n' },
  ];

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = userData.flatMap(({ data }) =>
        data.map((data2) => data2?.shopReceipt.receipt_id),
      );
      setSelected(newSelectedIds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, receipt_id) => {
    const selectedIndex = selected.indexOf(receipt_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, receipt_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userData.flatMap((item) =>
      item.data.map((d) => ({ ...d, user: item.user })),
    ),
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={headLabel}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    (row: {
                      shopReceipt: {
                        receipt_id: number;
                        name: string;
                        status: string;
                        transactions: Transaction[];
                      };
                      orderDate: string;
                      subTotal: number;
                      netProfit: number;
                      avatarUrl: string;
                    }) => {
                      console.log('row', row);
                      return (
                        <UserTableRow
                          key={row.shopReceipt.receipt_id}
                          orderId={row.shopReceipt.receipt_id}
                          customer={row.shopReceipt.name}
                          date={row.orderDate}
                          subtotal={row.subTotal}
                          netProfit={row.netProfit}
                          status={row.shopReceipt.status}
                          avatarUrl={row.avatarUrl}
                          items={row.shopReceipt.transactions}
                          selected={selected.indexOf(row.shopReceipt.receipt_id) !== -1}
                          handleClick={(event) =>
                            handleClick(event, row.shopReceipt.receipt_id)
                          }
                        />
                      );
                    },
                  )}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
