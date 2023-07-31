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

    const SaveButton = {
        width:'48%', 
        height:'50px',
        border: 'solid rgb(0,175,120) 2px',
        borderRadius: '10px',
        background: 'rgb(0,175,120)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    const CancelButton = {
        width:'48%', 
        height:'50px',
        border: 'solid rgb(0,175,120) 2px',
        borderRadius: '10px',
        background: 'white',
        color: 'rgb(0,175,120)',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    const urlbase = 'http://localhost:4800/scan/=?';
    const mainUrlBase = 'http://localhost:4800/';

    const DikaUserID = 1001;

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

    const saveReceipt = (message) =>{
        const payload = {...message.data, userId: DikaUserID};
        console.log(payload);
        axios.post('http://localhost:4800/scan/save',payload).then(
            (e) => {
                console.log('Saved successfully!');
                setFetching(false);
            }    
        );
    }

    return (
        <div style={{width:'100%',height:'100%'}}>
            {
                isFetching !== true ? <ReadQr sendQrData={getData}/> : ''
            }
            {
                isFetching === true ? 
                <>
                    <Receipt amo={message}/>
                    <div style={{margin: 'auto', marginTop: '10px', width:'397px', display: 'flex', justifyContent: 'space-between'}}>
                        <button style={SaveButton} onClick={() => saveReceipt(message)}>SAVE</button>
                        <button style={CancelButton} onClick={ ()=>setFetching(false)}>CANCEL</button>
                    </div>
                </> : ''
            }
        </div>
    )
}