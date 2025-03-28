import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Slider } from '@mui/material';
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import TextField from '@mui/material/TextField';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export type FiltersProps = {
  rating: string;
  creditRange: number[];
  status: string;
  vacanciesRange: number[];
  // dateRange: [Date | null, Date | null];
};

type ProductFiltersProps = {
  canReset: boolean;
  openFilter: boolean;
  filters: FiltersProps;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  onResetFilter: () => void;
  onSetFilters: (updateState: Partial<FiltersProps>) => void;
  options: {
    ratings: string[];
    creditRange: number[];
    status: { value: string; label: string }[];
    vacanciesRange: number[];
    // dateRange: [Date | null, Date | null];
  };
};

export function ProductFilters({
  filters,
  options,
  canReset,
  openFilter,
  onSetFilters,
  onOpenFilter,
  onCloseFilter,
  onResetFilter,
}: ProductFiltersProps) {

  const renderRating = (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Rating
      </Typography>

      {options.ratings.map((option, index) => (
        <Box
          key={option}
          onClick={() => onSetFilters({ rating: option })}
          sx={{
            mb: 1,
            gap: 1,
            ml: -1,
            p: 0.5,
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            typography: 'body2',
            alignItems: 'center',
            '&:hover': { opacity: 0.48 },
            ...(filters.rating === option && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          <Rating readOnly value={4 - index} /> & Up
        </Box>
      ))}
    </Stack>
  );

  const renderCreditRange = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Credits</Typography>
      <Typography variant="body2">
        {filters.creditRange[0]} - {filters.creditRange[1]} credits
      </Typography>
      <Slider
        value={filters.creditRange}
        onChange={(_, newValue) => onSetFilters({ creditRange: newValue as number[] })}
        valueLabelDisplay="auto"
        min={0}
        max={15}
        sx={{ color: "blue" }}
      />
    </Stack>
  );
  
  const renderStatusFilter = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Status</Typography>
      <RadioGroup>
        {options.status.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                checked={filters.status === option.value}
                onChange={() => onSetFilters({ status: option.value })}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );  

  const renderVacanciesFilter = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Vacancies</Typography>
      <Typography variant="body2">
        {filters.vacanciesRange[0]} - {filters.vacanciesRange[1]} spots
      </Typography>
      <Slider
        value={filters.vacanciesRange}
        onChange={(_, newValue) => onSetFilters({ vacanciesRange: newValue as number[] })}
        valueLabelDisplay="auto"
        min={options.vacanciesRange[0]}
        max={options.vacanciesRange[1]}
        sx={{ color: "green" }}
      />
    </Stack>
  );  

  // const renderDateFilter = (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     <Stack spacing={1}>
  //       <Typography variant="subtitle2">Select Date Range</Typography>
  //       <DesktopDatePicker
  //         label="Start Date"
  //         value={filters.dateRange[0]}
  //         onChange={(newDate) => onSetFilters({ dateRange: [newDate, filters.dateRange[1]] })}
  //       />
  //       <DatePicker
  //         label="End Date"
  //         value={filters.dateRange[1]}
  //         onChange={(newDate) => onSetFilters({ dateRange: [filters.dateRange[0], newDate] })}
  //         renderInput={(params) => <TextField {...params} fullWidth />}
  //       />
  //     </Stack>
  //   </LocalizationProvider>
  // );
  

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpenFilter}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, overflow: 'hidden' },
        }}
      >
        <Box display="flex" alignItems="center" sx={{ pl: 2.5, pr: 1.5, py: 2 }}>
          <Typography variant="h6" flexGrow={1}>
            Filters
          </Typography>

          <IconButton onClick={onResetFilter}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:refresh-linear" />
            </Badge>
          </IconButton>

          <IconButton onClick={onCloseFilter}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderRating}
            {renderCreditRange}
            {renderStatusFilter}
            {renderVacanciesFilter}
            {/* {renderDateFilter} */}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
