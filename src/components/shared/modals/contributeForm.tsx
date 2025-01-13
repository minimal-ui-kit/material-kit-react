import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Link,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import PaystackInline from '@paystack/inline-js';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import useUser from 'src/hooks/useUser';
import { useRouter } from 'src/routes/hooks';
import PayService from 'src/services/pay';
import { errCb } from 'src/utils';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface PaymentFormModalProps {
  open: boolean;
  amount?: string | number;
  handleClose: () => void;
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({
  open,
  amount: pledge,
  handleClose,
}) => {
  const { user } = useUser();
  const { refresh } = useRouter();

  const [amount, setAmount] = useState<number | string>(user?.pledgeAmount ?? pledge ?? '');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      await PayService.init(Number(amount), selectedMonths);
      closeModal();
      setLoading(false);
    } catch (error) {
      errCb(error.message);
    }
  };

  const closeModal = () => {
    setAmount('');
    setSelectedMonths([]);
    handleClose();
  };

  useEffect(() => {
    setAmount(user?.pledgeAmount ?? '');
  }, [user?.pledgeAmount]);

  useEffect(() => {
    if (open) {
      setAmount(user?.pledgeAmount ?? '');
    }
  }, [open, user?.pledgeAmount]);

  const hasValues = !!amount && !!selectedMonths.length;

  return (
    <Modal
      open={open}
      onClose={closeModal}
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
        {!!selectedMonths.length && amount && (
          <Typography variant="body2" sx={{ mb: 3, display: 'block' }}>
            You are making a contribution of{' '}
            <Typography variant="caption" fontWeight={700}>
              GHS{amount}
            </Typography>{' '}
            for{' '}
            <Typography variant="caption" fontWeight={700}>
              {selectedMonths.join(', ')}
            </Typography>
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount (GHS)"
            type="number"
            fullWidth
            required
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
                <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Months"
                placeholder="Choose one or more months"
              />
            )}
            sx={{ mb: 3 }}
          />
          <Box textAlign="center">
            <LoadingButton
              disabled={!hasValues}
              type="submit"
              variant="contained"
              color="inherit"
              loading={loading}
              sx={{ mt: 2 }}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentFormModal;
