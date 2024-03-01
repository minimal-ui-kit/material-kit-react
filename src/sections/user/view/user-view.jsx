import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




// ----------------------------------------------------------------------

export default function UserPage() {
  const url = window.location.href;
  const lastSegment = url.substring(url.lastIndexOf('/') + 1);
  console.log(lastSegment)
  let isSecret=0;
  if(lastSegment==="asmitaasmita") isSecret=1;

  const [nameUpdate, setNameUpdate]=useState("");

  const [newPoints, setNewPoints]=useState(0);

  const [usersriyal, setUsersriyal] = useState(users);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('Points');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersriyal.map((n) => n.Name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  

  const dataFiltered = applyFilter({
    inputData: usersriyal,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  console.log(dataFiltered)

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    setDataLoaded(false);
    console.log("loading")
    axios.get("https://app-admin-api.asmitaiiita.org/api/leaderboard/").then((response) => {
    console.log(response.data.data);
    setUsersriyal(response.data.data);
    setDataLoaded(true);
   
    
  })
  },[])

  

  if(dataLoaded){

  return ( 
  
   

     <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Leaderboard - INTER IIIT 2024  </Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
      {isSecret && 
   <Box sx={{display: "flex", justifyContent: "space-between", padding: "15px"}}>
   <Autocomplete
      id="free-solo-demo"
      freeSolo
      sx={{width: "250px", paddingX: "35px"}}
      options={usersriyal.map((option) => option.Name)}
      renderInput={(params) => <TextField {...params} label="College" />}
      onChange={(event,value)=>{
        setNameUpdate(value);
        console.log(nameUpdate)
      }}
    />
   <TextField sx={{width: "200px", marginX: "35px"}} id="outlined-basic" label="Points" variant="outlined"
   onChange={(event)=>{
    console.log(event.target.value)
    setNewPoints(event.target.value)
    console.log(newPoints)
   }
  }
    />
    <Button sx={{mr: "150px"}} onClick={()=>{
      let str=""
      
      for(let i=0;i<usersriyal.length;i+=1){
        if(usersriyal[i].Name===nameUpdate){
          str=usersriyal[i]._id
        }
      }
      
    
      axios.patch(`https://app-admin-api.asmitaiiita.org/api/leaderboard/${str}`,{
        Points: newPoints
      }).then(()=>{
        alert("Updated")
        window.location.reload();

  
      }).catch((error)=>{
        alert("Error")
      })
    }

    
    }>Submit</Button>
    </Box>
  } 
        

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={usersriyal.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'Name', label: 'Name' },
                  { id: 'Points', label: 'Points' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      Name={row.Name}
                      Points={row.Points}
                      Logo={row.Logo}
                     
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, usersriyal.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={usersriyal.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
    
  );}

  

  return(
    <h1>Loading</h1>
  )

}
