import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Chip,
  IconButton,
  Link,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface PaymentFormModalProps {
  open: boolean;
  amount: string;
  handleClose: () => void;
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({
  open,
  amount: pledge,
  handleClose,
}) => {
  const [amount, setAmount] = useState<string>(pledge);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Amount:', amount);
    console.log('Selected Months:', selectedMonths);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-form-title"
      aria-describedby="payment-form-description"
    >
      <Box
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          aria-label="close"
        >
          <Iconify icon="ic:round-close" />
        </IconButton>
        <Typography id="payment-form-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Contribute
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount (GHS)"
            type="number"
            fullWidth
            required
            disabled
            value={amount}
            onChange={handleAmountChange}
            sx={{ mb: 3 }}
            FormHelperTextProps={{ sx: { textAlign: 'right', cursor: 'pointer' } }}
            helperText={<Link>Change pledge amount?</Link>}
          />
          <Autocomplete
            multiple
            options={months}
            value={selectedMonths}
            onChange={(event, newValue) => setSelectedMonths(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Months"
                placeholder="Choose one or more months"
                required
              />
            )}
            sx={{ mb: 3 }}
          />
          <Box textAlign="center">
            <Button type="submit" variant="contained" color="inherit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentFormModal;
