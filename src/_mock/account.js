// ----------------------------------------------------------------------
import axios from 'axios'
import { useState , useEffect } from 'react';

const Account = () => {
  const [isAuthen, setAuthen] = useState(false)
  const [user, setUser] = useState("")
  useEffect(()=>{
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/login`,
      data: { "phone": '', "passwd": ''},
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      
    }).then(res => {
      if (res.data.authen === true){
        setUser(res.data.phone)
        setAuthen(true)
      }});
    
  }, [])
  return (
    user, isAuthen
  )
}

export default Account