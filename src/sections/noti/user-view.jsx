
import axios from "axios"
import { TextField } from "@mui/material"
import {Button} from "@mui/material"
import { useState } from "react"
// ----------------------------------------------------------------------

export default function UserPage() {
const [title,setTitle]=useState("")
const [body,setBody]=useState("")
const handleSubmit=async ()=>{
    const data={
        to: "/topics/all",
        notification: {
          title: title,
          body: body,
          mutable_content: true,
          sound: "Tri-tone"
          }  
    }
    const token="AAAAb6gnCaA:APA91bH6MgkESR5hma1KSR9u2GO7UAlLi5wlXlpEYqsZnPJYAmEcfqKmXWJCqcStkY4IvoRpibE4E1mBobhyjjjKgFnJ9jtUeiQyQJomC0htcdT7GjMIge8Rxu7shcDXzwIqxzwpelgi"
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': "application/json",
        },
        
    };
    await axios.post("https://fcm.googleapis.com/fcm/send",data,config).then(()=>alert("done"))
    .catch(()=>alert("err"))

}

  return(<><h1>
    SEND NOTFICATIONS

  </h1>
  <TextField id="standard-basic" label="Title" variant="standard" value={title} onChange={(e)=>setTitle(e.target.value)} />
  <TextField id="standard-basic" label="Body" value={body} onChange={(e)=>setBody(e.target.value)} variant="standard" sx={{marginY:"12px"}} />   
  <Button variant="contained" onClick={handleSubmit}>Send</Button> 
  </>
  )

}
