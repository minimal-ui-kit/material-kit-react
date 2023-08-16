/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable arrow-body-style */

import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Dialog, DialogContent } from '@mui/material'

const ReadQrMobile = ({sendQrData}) => {

    const videoRef = useRef();

    const [result, setResult] = useState('');

    const [data, setData] = useState(null);

    useEffect(()=>{
        const qrScanner = new QrScanner(videoRef.current,
            result => {
                setData(result);
                sendQrData(result);
                qrScanner.stop();
            },
            {
                highlightScanRegion: "true",
                highlightCodeOutline: "true",
                returnDetailedScanResult: true
            });
        qrScanner.start();
    });

    return (
        <div style={{ margin: "auto", border: 'solid red 2px' }}>
            <div style={{ width: '400px', height: '400px', overflow: 'hidden' }}>
                <video id="video" ref={videoRef} playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'solid black 2px' }} />
            </div>
        </div>

    );
};

export default ReadQrMobile;