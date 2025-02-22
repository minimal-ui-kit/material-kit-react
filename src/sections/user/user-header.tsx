import { useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Iconify } from 'src/components/iconify';
import { red } from '@mui/material/colors';
import { _roles, _roleType, _users } from 'src/_mock';
import { addStaff, addStaffProps } from './utils';

export function UserHeader() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const roles = _roles.map((r) => ({
            value: r,
            label: r
    }));

    const roleType = _roleType.map((r) => ({
        value: r,
        label: r
}));

    const [selectedRole, setSelectedRole] = useState('');
    const [rType, setRoleType] = useState('');

    const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string;
        setSelectedRole(selectedValue);

        // If the selected role contains "manager", set roleType to "Manager"
        if (selectedValue.toLowerCase().includes('manager')) {
            setRoleType('Manager');
        } else {
            setRoleType(''); // Reset roleType if role doesn't include "manager"
        }
    };

    return (
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
            Staff
            </Typography>
            <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleClickOpen}
            >
            New Staff
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        if (formJson.role.includes('Manager') && !formJson.roleType) {
                            formJson.roleType = 'Manager'; 
                        }
                        const newStaff: addStaffProps = {
                            name: formJson.fullName, 
                            number: formJson.number, 
                            role: formJson.role, 
                            roleType: formJson.roleType || '',  // Default to empty string if not set
                        };
                        addStaff(newStaff);
                        handleClose();
                    }
                }}
            >
                <DialogTitle>Enter New Staff Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="fullName"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="number"
                        name="number"
                        label="Contact Number"
                        type="tel"
                        fullWidth
                        variant="outlined"
                    />
                        <TableRow sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TableCell sx={{paddingLeft: "0px"}}>
                                <TextField
                                    id="role"
                                    name='role'
                                    select
                                    required
                                    helperText="Role"
                                    SelectProps={{
                                        native: true
                                    }}
                                    fullWidth
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                >
                                    {roles.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </TableCell>
                            <TableCell align='right'>
                                <TextField
                                        id="roleType"
                                        name='roleType'
                                        select
                                        required
                                        fullWidth
                                        helperText="Role Type"
                                        SelectProps={{
                                            native: true
                                        }}
                                        value={rType}
                                        onChange={(e) => setRoleType(e.target.value)}
                                        disabled={selectedRole.includes('Manager')}
                                    >
                                        {roleType.map((option) => (
                                            <option key={option.value} value={option.value}>
                                            {option.label}
                                            </option>
                                        ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: red[500] }} onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}