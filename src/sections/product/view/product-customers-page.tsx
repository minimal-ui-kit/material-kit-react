import { useState } from "react";
import { Typography, Box, Card, TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { _customers } from "src/_mock";
import { getComparator, emptyRows } from "src/sections/Bookings/utils";
import { useTable } from "src/sections/Bookings/view";
import { Scrollbar } from "src/components/scrollbar";
import { TodayActivities, ActivityTableHead } from "../../overview/analytics-today-activities";
import { TableEmptyRows } from "../../Bookings/table-empty-rows";
import { TableNoData } from "../../Bookings/table-no-data";

export function ProductCustomerPage() {
    const table = useTable();
    const [filterName, setFilterName] = useState('');

    const dataFiltered: CustomerProps[] = applyFilter({
        inputData: _customers,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });
        const notFound = !dataFiltered.length && !!filterName;
    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Customers
                </Typography>
            </Box>

            <Card>
                <TodayActivities
                    filterName={filterName}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                }}/>

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800}}>
                            <ActivityTableHead
                            order={table.order}
                            orderBy={table.orderBy}
                            onSort={table.onSort}
                            headLabel={[
                                { id: 'name', label: 'Customer Name' },
                                { id: 'email', label: 'Email' },
                                { id: 'Contact', label: 'Contact' },
                                { id: 'date', label: 'Booking Date' },
                                { id: 'credits', label: 'Credits' }           
                            ]}
                            />
                            <TableBody>
                                {dataFiltered
                                .slice(
                                    table.page * table.rowsPerPage,
                                    table.page * table.rowsPerPage + table.rowsPerPage
                                )
                                .map((row) => (
                                    <CustomerTableRow
                                    row={row}
                                    />
                                ))}

                                <TableEmptyRows
                                height={68}
                                emptyRows={emptyRows(table.page, table.rowsPerPage, _customers.length)}
                                />

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------
export type CustomerProps = {
    id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    credits: number;
}

export type CustomerFilterProps = {
  inputData: CustomerProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filterName}: CustomerFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}

// ----------------------------------------------------------------------
export function CustomerTableRow({ row }: { row: CustomerProps }) {
    return (
      <>
        <TableRow hover tabIndex={-1}>
  
          <TableCell component="th" scope="row">
            <Box gap={2} display="flex" alignItems="center">
              {row.name}
            </Box>
          </TableCell>
  
          <TableCell>{row.email}</TableCell>
  
          <TableCell>{row.phone}</TableCell>
          <TableCell>{row.date}</TableCell>

          <TableCell>{row.credits}</TableCell>
        </TableRow>
      </>
    );
  }