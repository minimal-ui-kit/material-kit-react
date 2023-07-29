/* eslint-disable no-const-assign */
/* eslint-disable no-var */
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReadQr from '../qr-scanner';
import Receipt from '../receipt/receipt';


export default function RecitExtractor(){

    const [message, setMessage] = useState([]);
    const [isFetching, setFetching] = useState([false]);

    const urlbase = 'http://localhost:4800/scan/=?';

    // const arrayDisplay = [];

    const getData = (message) => {
        axios.get(urlbase + message).then(
            (e)=>{
                console.log(e.data);
                // e.data.items.forEach(e => {
                //     arrayDisplay.push(e);
                // });
                setMessage(e);
                setFetching(true);
            }
        );
    };

    return (
        <>
            <ReadQr sendQrData={getData}/>
            {
                isFetching === true ? <Receipt amo={message}/> : ''
            }
        </>
    )
}