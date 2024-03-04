import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Container, Select,FormControl,InputLabel,Button,MenuItem,Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useLocation, useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function AthleticsEdit() {
  
 
  const rid =useParams().id;
    console.log(rid);
    const router =useRouter();
    const navigate=useNavigate();
    const [data,setData]=useState({
        Date:"",
        GroupStage:"",
        MatchName:"",
        Player1:"",
        Player2:"",
        Player3:""
    });
    useEffect(() => {
        
        console.log('loading');
        axios.get('https://app-admin-api.asmitaiiita.org/api/results/getResults/athletics/'+rid).then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
         
        });
      }, []);
    
    function changeData(field,data1){
        setData((prev) => {
            prev[field] = data1;
            return { ...prev };
          });
    }
   
      const handleSubmit = (event) => {
        try{
            
            axios.patch("https://app-admin-api.asmitaiiita.org/api/results/athletics/"+rid,
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
      const handleDelete = (event) => {
        try{
            
            axios.delete("https://app-admin-api.asmitaiiita.org/api/results/athletics/"+rid
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
        <Typography variant="h4">Edit Athletics Result Data: </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <FormControl fullWidth >
            
            <TextField margin='10%' fullWidth label="Date" id='Date' autoFocus={true} value={data.Date} onChange={(event) => {
                changeData("Date",event.target.value);
            }} />
            <TextField fullWidth label="GroupStage" id='GroupStage' autoFocus={true} value={data.GroupStage} onChange={(event) => {
                changeData("GroupStage",event.target.value);
            }} />
            <TextField fullWidth label="MatchName" id='MatchName' autoFocus={true} value={data.MatchName} onChange={(event) => {
                changeData("MatchName",event.target.value);
            }} />
            <TextField fullWidth label="Player1" id='Player1' autoFocus={true} value={data.Player1} onChange={(event) => {
                changeData("Player1",event.target.value);
            }} />
            <TextField fullWidth label="Player2" id='Player2' autoFocus={true} value={data.Player2} onChange={(event) => {
                changeData("Player2",event.target.value);
            }} />
            <TextField fullWidth label="Player3" id='Player3' autoFocus={true} value={data.Player3} onChange={(event) => {
                changeData("Player3",event.target.value);
            }} />
        </FormControl>
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