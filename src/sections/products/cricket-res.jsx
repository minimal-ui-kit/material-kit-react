import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import colleges from "../../../public/assets/college_logos.json";
import Typography from '@mui/material/Typography';
import { Container, Select,FormControl,InputLabel,Button,MenuItem,Stack, TextField, Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function CricketAdd() {
    const router =useRouter();
    const navigate=useNavigate();
    const [data,setData]=useState({
        ClgImg1:"",
        ClgImg2:"",
        ClgName1:"",
        ClgName2:"",
        Date:"",
        GroupStage:"",
        MatchName:"",
        Over1:"",
        Over2:"",
        Score1:"",
        Score2:"",
    });
    
    function changeData(field,data1){
        setData((prev) => {
            if(field=="ClgName1" || field=="ClgName2"){
                prev[field]=data1;
                if(field=="ClgName1"){
                    prev["ClgImg1"]=colleges[data1].logo_link;
                }
                if(field=="ClgName2"){
                    prev["ClgImg2"]=colleges[data1].logo_link;
                }
                return {...prev};
            }
            prev[field] = data1;
            return { ...prev };
          });
    }
   
      const handleSubmit = (event) => {
        try{
            
            axios.post("https://app-admin-api.asmitaiiita.org/api/results/cricket/",
                data
            ).then((response)=>{
           console.log(response)
           navigate("../../../",{ relative: "path" });
        })
        }
        catch(error){
            console.log(error)
        }
        
        
      };
    
  return (
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Set Cricket Result Data: </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        
            <Box flex={"50%"} fullWidth>
        <InputLabel id="col1-label">College 1</InputLabel>
        
            <Select
                labelId="col1-label"
                id="col1"
                value={data.ClgName1}
                label="College 1 Name"
                onChange={(event) => {
                    changeData("ClgName1",event.target.value);
                }}
                fullWidth
            >
                {Object.entries(colleges).map((value)=>{
                    return (<MenuItem value={value[1].name}>{value[1].name}</MenuItem>);
                })}
            </Select>
            </Box>
            <Box flex={"50%"} fullWidth>
            <InputLabel id="col2-label">College 2</InputLabel>
            <Select
                labelId="col2-label"
                id="col2"
                value={data.ClgName2}
                label="College 2 Name"
                onChange={(event) => {
                    changeData("ClgName2",event.target.value);
                }}
                fullWidth
            >
                {Object.entries(colleges).map((value)=>{
                    
                    return (<MenuItem value={value[1].name}>{value[1].name}</MenuItem>);
                })}
            </Select>
            </Box>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField margin='10%' fullWidth label="Date" id='Date' onChange={(event) => {
                changeData("Date",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="GroupStage" id='GroupStage' onChange={(event) => {
                changeData("GroupStage",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="MatchName" id='MatchName' onChange={(event) => {
                changeData("MatchName",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Over1" id='Over1' onChange={(event) => {
                changeData("Over1",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Over2" id='Over2' onChange={(event) => {
                changeData("Over2",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Score1" id='Score1' onChange={(event) => {
                changeData("Score1",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Score2" id='Score2' onChange={(event) => {
                changeData("Score2",event.target.value);
            }} />
            </Stack>
            
            
       
        <Button onClick={handleSubmit} variant="contained" color="inherit" >
          Add Result
        </Button>
       
    </Container>
  );
}