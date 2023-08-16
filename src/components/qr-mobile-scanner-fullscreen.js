/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable arrow-body-style */

import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Dialog, DialogContent } from '@mui/material'
import ReadQrMobile from './qr-mobile-scanner';

const ReadQrMobileFullscreen = ({sendQrData}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendQrDataNew = (message)=>{
        handleClose();
        sendQrData(message.data);
    }

    return (
        <div style={{ margin: "auto", border: 'solid red 2px' }}>
            <Dialog open={open} onClose={handleClose}>
                <ReadQrMobile sendQrData={sendQrDataNew}/>
            </Dialog>
            <button type="button"
                style={{ margin: 'auto', display: 'block', backgroundColor: 'rgb(0,140,120)', color: 'white', border: 'solid rgb(0,175,120) 5px', borderRadius: '50%', width: '150px', height: '150px' }}
                onClick={handleOpen}>
                Open Dialog
            </button>
        </div>

    );
};

export default ReadQrMobileFullscreen;