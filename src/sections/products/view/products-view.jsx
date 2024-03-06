import axios from 'axios';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import ProductCard from '../product-card';
import Router from 'src/routes/sections';
import { Link, useNavigate } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import Results from 'src/components/result/results';
import { useAuth } from 'src/context/loginContext';
import { jwtDecode } from 'jwt-decode';
// ----------------------------------------------------------------------

export default function ProductsView() {
  // const [dataLoaded,setDataLoaded]=useState(false);
  let alsorole="";
  if(localStorage.getItem("token")!==null)alsorole=(jwtDecode(localStorage.getItem("token")).role)
  const router = useRouter();
  const [resultData, setResData] = useState([]);
  const {name,role,check,login}=useAuth();

  function handleNewRes() {
    router.push('addresult');
  }

  useEffect(() => {
    // setDataLoaded(false);
    console.log('loading');
    axios.get('https://app-admin-api.asmitaiiita.org/api/results/getResults').then((response) => {
      console.log(response.data.data);
      setResData(response.data.data);
      // setDataLoaded(true);
    });
  }, []);
  //console.log(check)
  if(alsorole==="head"||alsorole==="volunteer"||alsorole==="executive"){
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Results</Typography>

        <Button
          onClick={handleNewRes}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Result
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {resultData.map((result) => (
          <Grid key={result.id} xs={12} sm={6} md={6}>
            <Results props={result}></Results>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
else{
  return(
    <h1>NOT AUTHORISED</h1>
  )
}}
