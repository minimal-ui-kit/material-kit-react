import { useMemo, useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import Loader from 'src/components/loader';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { UserContext } from 'src/components/provider';

import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { ContributionTableHead } from '../contributions-table-head';
import { ContributionsTableToolbar } from '../contributions-table-toolbar';
import { ContributionsTableRow, type ContributionProps } from '../contributions-table-row';

// ----------------------------------------------------------------------

interface ContributionsViewProps {
  ignoreDashContent?: boolean;
  noMultiSelect?: boolean;
  noToolbar?: boolean;
  hideBtn?: boolean;
  title?: string;
  noPagination?: boolean;
  data?: ContributionProps[];
  loading?: boolean;
  viewMore?: boolean;
}

export function ContributionsView({
  ignoreDashContent,
  noMultiSelect,
  noToolbar,
  hideBtn,
  noPagination,
  title = 'Contributions',
  loading,
  viewMore,
  data = [],
}: ContributionsViewProps) {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const { pay } = useContext(UserContext);
  const { push } = useRouter();

  const onViewMore = () => {
    push('/contributions');
  };

  const dataFiltered: ContributionProps[] = useMemo(
    () =>
      applyFilter({
        inputData: data,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      }),
    [filterName, data, table.order, table.orderBy]
  );

  const notFound = (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !filterName);

  const content = (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {title}
        </Typography>
        {!hideBtn && (
          <Button
            variant="contained"
            color="inherit"
            onClick={pay}
            startIcon={<Iconify icon="mdi:donate" />}
          >
            Contribute
          </Button>
        )}
        {viewMore && (
          <Button variant="text" onClick={onViewMore}>
            View More
          </Button>
        )}
      </Box>
      <Card>
        {loading ? (
          <Loader height="300px" />
        ) : (
          <>
            {!noToolbar && (
              <ContributionsTableToolbar
                numSelected={table.selected.length}
                filterName={filterName}
                onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFilterName(event.target.value);
                  table.onResetPage();
                }}
              />
            )}

            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <ContributionTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={_users.length}
                    numSelected={table.selected.length}
                    noMultiSelect={noMultiSelect}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        _users.map((user) => user.id)
                      )
                    }
                    headLabel={[
                      { id: 'name', label: 'Name' },
                      { id: 'months', label: 'Month(s)' },
                      { id: 'amount', label: 'Amount' },
                      { id: 'date', label: 'Date' },
                      { id: 'status', label: 'Status' },
                      { id: 'resume', label: '' },
                    ]}
                  />
                  <TableBody>
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <ContributionsTableRow
                            noSelection={noMultiSelect}
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        height={68}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                      />
                      {notFound && (
                        <TableNoData label="No contributions available" searchQuery={filterName} />
                      )}
                    </>
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            {!noPagination && (
              <TablePagination
                component="div"
                page={table.page}
                count={_users.length}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              />
            )}
          </>
        )}
      </Card>
    </>
  );

  return ignoreDashContent ? content : <DashboardContent>{content}</DashboardContent>;
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
