import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import colleges from "../../assets/college_logos.json";
import Typography from '@mui/material/Typography';
import { Container, Select,FormControl,InputLabel,Button,MenuItem,Stack, TextField, Box } from '@mui/material';

import { useRouter } from 'src/routes/hooks';


// ----------------------------------------------------------------------

export default function FootballAdd() {
    const dates=[
        "9 March 2024",
        "10 March 2024",
        "11 March 2024",
        "12 March 2024",
        "13 March 2024",
        "14 March 2024",
        "15 March 2024",
    ];
    const navigate=useNavigate();
    const [data,setData]=useState({
        ClgImg1:"",
        ClgImg2:"",
        ClgName1:"",
        ClgName2:"",
        Date:"",
        GroupStage:"",
        MatchName:"",
        Score:"",
        SportName:"",
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
            
            axios.post("https://app-admin-api.asmitaiiita.org/api/results/football/",
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
        <Typography variant="h4">Set Football Result Data: </Typography>
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
            <InputLabel id="date-label">Date</InputLabel>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            
            
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
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="GroupStage" id='GroupStage' onChange={(event) => {
                changeData("GroupStage",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="SportName" id='SportName' onChange={(event) => {
                changeData("SportName",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="MatchName" id='MatchName' onChange={(event) => {
                changeData("MatchName",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Score" id='Score' onChange={(event) => {
                changeData("Score",event.target.value);
            }} />
            </Stack>
        <Button onClick={handleSubmit} variant="contained" color="inherit" >
          Add Result
        </Button>
       
    </Container>
  );
}