import { useEffect, useState } from 'react';
import axios from 'axios';
import colleges from "../../assets/college_logos.json";
import Typography from '@mui/material/Typography';
import { Container, Select,FormControl,InputLabel,Button,MenuItem,Stack, TextField, Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { sports } from 'src/assets/sports';

// ----------------------------------------------------------------------


export default function CricketEdit() {
    const dates=[
        "9 March 2024",
        "10 March 2024",
        "11 March 2024",
        "12 March 2024",
        "13 March 2024",
        "14 March 2024",
        "15 March 2024",
    ];
    const rid =useParams().id;
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
        SportName:"",
    });
    
    function changeData(field,data1){
        setData((prev) => {
            if(field=="ClgName1" || field=="ClgName2"){
                prev[field]=data1;
                if(field=="ClgName1"){
                    console.log(data1);
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
    useEffect(() => {
        
        console.log('loading');
        axios.get('https://app-admin-api.asmitaiiita.org/api/results/getResults/cricket/'+rid).then((response) => {
          console.log(response.data.data);
          var newdata=response.data.data;
          newdata.ClgImg1="";
          newdata.ClgImg2="";
          setData(newdata);
          changeData("ClgName1",response.data.data.ClgName1);
          changeData("ClgName2",response.data.data.ClgName2);
        });
      }, []);
   
      const handleSubmit = (event) => {
        try{
            
            axios.patch("https://app-admin-api.asmitaiiita.org/api/results/cricket/"+rid,
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
      const handleDelete = (event) => {
        try{
            
            axios.delete("https://app-admin-api.asmitaiiita.org/api/results/cricket/"+rid
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
        <Typography variant="h4">Edit Cricket Result Data: </Typography>
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
            <Stack>
            <InputLabel id="sport-label">SportName</InputLabel>
            <Select
            
                labelId="sport-label"
                id="sport"
                value={data.SportName}
                label="SportName"
                onChange={(event) => {
                    changeData("SportName",event.target.value);
                }}
                fullWidth
            >
                {sports.map((val)=>{
                    return (<MenuItem value={val}>{val}</MenuItem>);
                })}
            </Select>
           
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="GroupStage" autoFocus={true} value={data.GroupStage} id='GroupStage' onChange={(event) => {
                changeData("GroupStage",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center"  justifyContent="space-between" mb={5}>
            <TextField fullWidth label="MatchName" autoFocus={true} value={data.MatchName} id='MatchName' onChange={(event) => {
                changeData("MatchName",event.target.value);
            }} />
            </Stack>
            
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Over1" id='Over1' autoFocus={true} value={data.Over1} onChange={(event) => {
                changeData("Over1",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Over2" autoFocus={true} value={data.Over2} id='Over2' onChange={(event) => {
                changeData("Over2",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Score1" id='Score1' autoFocus={true} value={data.Score1} onChange={(event) => {
                changeData("Score1",event.target.value);
            }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField fullWidth label="Score2" id='Score2' autoFocus={true} value={data.Score2} onChange={(event) => {
                changeData("Score2",event.target.value);
            }} />
            </Stack>
            
            
       
        <Button onClick={handleSubmit} variant="contained" color="inherit" >
          Edit Result
        </Button>
        <Button onClick={handleDelete} variant="contained" color="inherit" >
          Delete Result
        </Button>
       
       
    </Container>
  );
}