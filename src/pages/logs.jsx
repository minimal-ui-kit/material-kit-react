import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function createData(logs) {
  return { logs};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const [loaded,setDataLoaded]=useState(true);
    const [data,setData]=useState([])
    useEffect(() => {
        setDataLoaded(false);
        let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
          }
        console.log("loading")
        axios.get("http://localhost:8000/api/logs",config
            
        ).then((response) => {
        console.log(response.data.data);
        setData(response.data.data)
        setDataLoaded(true);
        
       
        
      }).catch((err)=>console.log(err))
      },[])
      if(loaded){
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Type Changed ID</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.User}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.typeChanged}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.createdAt}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.updatedAt}
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );}
  else{
  return(
    <h1>loading</h1>
  )}
}