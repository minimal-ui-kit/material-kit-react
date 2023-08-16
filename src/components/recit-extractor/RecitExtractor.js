/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-const-assign */
/* eslint-disable no-var */
import { Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import ReadQrMobile from '../qr-mobile-scanner';
import ReadQr from '../qr-scanner';
import Receipt from '../receipt/receipt';
import ReadQrMobileFullscreen from '../qr-mobile-scanner-fullscreen';


export default function RecitExtractor(){

    const {auth} = useContext(AuthContext);
    
    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
    
    const[mobile,setMobile] = useState([false]);

    const [message, setMessage] = useState([]);
    const [isFetching, setFetching] = useState([false]);

    useEffect(()=>{
        console.log(detectMob());
        setMobile(detectMob());
    },[]);

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

    const liveUrl = process.env.REACT_APP_BACKEND_URL;

    const urlbase = `${liveUrl}/scan/=?`;

    const userId = auth.id;

    // const arrayDisplay = [];

    const getData = (message) => {
        axios.get(urlbase + message).then(
            (e)=>{
                console.log(e.data);
                console.log(urlbase + message,'poziv');
                // e.data.items.forEach(e => {
                //     arrayDisplay.push(e);
                // });
                setMessage(e);
                setFetching(true);
            }
        );
    };

    const saveReceipt = (message) =>{
        const payload = {...message.data, userId: userId};
        console.log(payload);
        axios.post(`${liveUrl}/scan/save`,payload).then(
            (e) => {
                console.log('Saved successfully!');
                setFetching(false);
            }    
        );
    }

    return (
        <div style={{width:'100%',height:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
            {
                isFetching !== true && mobile? <ReadQr sendQrData={getData}/> : ''
            }
            {
                isFetching !== true && !mobile? <ReadQrMobileFullscreen sendQrData={getData}/> : ''
            }
            {
                isFetching === true ? 
                <div>
                    <Receipt amo={message}/>
                    <div style={{margin: 'auto', marginTop: '10px', width:'397px', display: 'flex', justifyContent: 'space-between'}}>
                        <button style={SaveButton} onClick={() => saveReceipt(message)}>SAVE</button>
                        <button style={CancelButton} onClick={ ()=>setFetching(false)}>CANCEL</button>
                    </div>
                </div> : ''
            }
        </div>
    )
}