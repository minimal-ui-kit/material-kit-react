import {useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import { Toolbar, Card, Typography, Divider, Stack, TableRow, TableCell, Box, Button} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Iconify } from 'src/components/iconify';
import { BookingProp } from '../Bookings/bookings-table-row';


type FinanceToolbarProps = {
    chooseDate: string;
    onChooseDate: (value: Dayjs | null) => void;
};

export function FinanceToolbar({chooseDate, onChooseDate} : FinanceToolbarProps) {
    const dayjsDate = chooseDate ? dayjs(chooseDate, 'MM YYYY') : null;
    return (
            <Toolbar
                sx={{
                    height: 96,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label='Choose MM YYYY' 
                        views={['month', 'year']} 
                        value={dayjsDate}
                        onChange={onChooseDate}/>
                </LocalizationProvider>
            </Toolbar>
)};

// ----------------------------------------------------------------------

type TotalEarningsProps = {
    bookings: BookingProp[];
};

export function TotalEarnings({ bookings }: TotalEarningsProps) {
    const cashPerCredit = 10;
    if (!bookings || bookings.length === 0) {
        return (
            <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
                <Typography variant="h6" color="text.secondary">
                    No earnings data available
                </Typography>
            </Card>
        );
    }

    const totalCredit = bookings.reduce((acc, booking) => acc + Number(booking.creditSpent), 0);
    const cashEarned = totalCredit * cashPerCredit;

    return (
        <Box sx={{ p: 3, bgcolor: 'grey.100', width: '400px' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Total Earnings
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">
                        Credits Spent:
                    </Typography>
                    <Typography variant="h6">{totalCredit.toFixed(2)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" color="text.secondary">
                        Cash Earned:
                    </Typography>
                    <Typography variant="h6" color="primary">
                        ${cashEarned.toFixed(2)}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

// ----------------------------------------------------------------------

export type GroupedBooking = {
    activityName: string;
    totalCredits: number;
    cashEarned: number;
};

export function EarningsRow({ row }: { row: GroupedBooking }) {
    if (!row) return null; // Prevent rendering an empty row
    return (
        <TableRow hover tabIndex={-1}>
            <TableCell component="th" scope="row">
                <Box gap={2} display="flex" alignItems="center">
                    {row.activityName}
                </Box>
            </TableCell>

            <TableCell>{row.totalCredits}</TableCell>
            
            <TableCell>${row.cashEarned.toFixed(2)}</TableCell>
        </TableRow>
    );
}

