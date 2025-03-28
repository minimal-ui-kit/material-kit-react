import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { _roles, _roleType, _users } from 'src/_mock';

export function BookingsHeader() {

    return (
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
            Bookings
            </Typography>
        </Box>
    );
}