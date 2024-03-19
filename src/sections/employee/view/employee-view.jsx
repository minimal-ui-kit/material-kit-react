// import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

export default function EmployeePage() {

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Employees</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Employee
                </Button>
            </Stack>

            {/* <Card>

            </Card> */}
        </Container>
    );
}