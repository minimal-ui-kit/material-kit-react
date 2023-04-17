/* eslint-disable no-const-assign */
/* eslint-disable no-var */
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReadQr from '../qr-scanner';


export default function RecitExtractor(){

    const [message, setMessage] = useState([]);

    const urlbase = 'http://localhost:4800/scan/=?';

    const arrayDisplay = [];

    const getData = (message) => {
        axios.get(urlbase + message).then(
            (e)=>{
                console.log(e.data);
                e.data.items.forEach(e => {
                    arrayDisplay.push(e);
                });
                setMessage(arrayDisplay);
            }
        );
    };

    return (
        <>
            <ReadQr sendQrData={getData}/>
            <div style={{margin: "auto", width:"fit-content"}}>
            {
                message && message.map ( (e,i) =>{
                    return(
                        <div style={{display: "flex"}}>
                        <span style={{margin: "6px"}} key={i}>{e.name}</span>
                        <span style={{margin: "6px"}}key={i}>{e.amount}</span>
                        <span style={{margin: "6px"}}key={i}>{e.price}</span>
                        <span style={{margin: "6px"}}key={i}>{e.total}</span> 
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}