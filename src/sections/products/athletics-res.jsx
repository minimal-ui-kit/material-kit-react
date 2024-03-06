import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import { Container, Select,FormControl,InputLabel,Button,MenuItem,Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function AthleticsAdd() {
    const router =useRouter();
    const navigate=useNavigate();
    const dates=[
        "9 March 2024",
        "10 March 2024",
        "11 March 2024",
        "12 March 2024",
        "13 March 2024",
        "14 March 2024",
        "15 March 2024",
    ];
    const [data,setData]=useState({
        Date:"",
        GroupStage:"",
        MatchName:"",
        SportName:"",
        Player1:"",
        Player2:"",
        Player3:""
    });
    function changeData(field,data1){
        setData((prev) => {
            prev[field] = data1;
            return { ...prev };
          });
    }
   
      const handleSubmit = (event) => {
        try{
            
            axios.post("https://app-admin-api.asmitaiiita.org/api/results/athletics/",
                data
            ).then((response)=>{
            console.log(response);
        })
        }
        catch(error){
            console.log(error)
        }
        
        navigate("../../../",{ relative: "path" });
      };
    
  return (
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Set Athletics Result Data: </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <FormControl fullWidth >
            
            {/* <TextField margin='10%' fullWidth label="Date" id='Date' onChange={(event) => {
                changeData("Date",event.target.value);
            }} /> */}

        
            <InputLabel id="date-label">Date</InputLabel>
            
                <Select
                    labelId="date-label"
                    id="date"
                    value={data.Date}
                    label="Date"
                    onChange={(event) => {
                        changeData("Date",event.target.value);
                    }}
                    fullWidth
                >
                    {dates.map((val)=>{
                        return (<MenuItem value={val}>{val}</MenuItem>);
                    })}
                </Select>
            



            <TextField fullWidth label="GroupStage" id='GroupStage' onChange={(event) => {
                changeData("GroupStage",event.target.value);
            }} />
            <TextField fullWidth label="MatchName" id='MatchName' onChange={(event) => {
                changeData("MatchName",event.target.value);
            }} />
            <TextField fullWidth label="SportName" id='SportName' onChange={(event) => {
                changeData("SportName",event.target.value);
            }} />
            <TextField fullWidth label="Player1" id='Player1' onChange={(event) => {
                changeData("Player1",event.target.value);
            }} />
            <TextField fullWidth label="Player2" id='Player2' onChange={(event) => {
                changeData("Player2",event.target.value);
            }} />
            <TextField fullWidth label="Player3" id='Player3' onChange={(event) => {
                changeData("Player3",event.target.value);
            }} />
        </FormControl>
        </Stack>
        <Button onClick={handleSubmit} variant="contained" color="inherit" >
          Add Result
        </Button>
       
    </Container>
  );
}