import { useRef } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------
function DebounceInput(props) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = useRef();

  const handleChange = (event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log('Coming in here');
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };
  return (
    <OutlinedInput
      {...rest}
      onChange={handleChange}
      placeholder="Search File..."
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </InputAdornment>
      }
    />
  );
  // return <Input {...rest} />;
}

DebounceInput.propTypes = {
  debounceTimeout: PropTypes.number.isRequired,
  handleDebounce: PropTypes.func.isRequired,
};
export default function JiraProjectsTableToolbar({ filterName, onFilterName }) {
  // const debouncedOnFilterName = debounce(onFilterName, 500); // Adjust the delay time as needed (500 milliseconds in this example)

  // Use the debounced function in the event handler
  // const handleFilterNameChange = (event) => {
  //   const { value } = event.target;
  //   debouncedOnFilterName(value);
  // };
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <DebounceInput
        placeholder="Type in here…"
        debounceTimeout={800}
        handleDebounce={onFilterName}
      />
      {/* <OutlinedInput */}
      {/*  value={filterName} */}
      {/*  onChange={handleFilterNameChange} */}
      {/*  placeholder="Search File..." */}
      {/*  startAdornment={ */}
      {/*    <InputAdornment position="start"> */}
      {/*      <Iconify */}
      {/*        icon="eva:search-fill" */}
      {/*        sx={{ color: 'text.disabled', width: 20, height: 20 }} */}
      {/*      /> */}
      {/*    </InputAdornment> */}
      {/*  } */}
      {/* /> */}
    </Toolbar>
  );
}

JiraProjectsTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
