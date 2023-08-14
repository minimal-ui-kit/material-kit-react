/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable arrow-body-style */

import {useState, useRef} from 'react';
import QrScanner from 'qr-scanner';

const ReadQrMobile = ({sendQrData}) =>{
    
    const videoRef = useRef(null);
    const [result, setResult] = useState('');

    const [file,setFile] = useState(null);
    const [data,setData] = useState(null);

    const fileRef = useRef();

    const startScan = async () => {
        const qrScanner = new QrScanner(videoRef.current,
            result => console.log(result),
          {
            highlightScanRegion:"true",
            highlightCodeOutline: "true"
          });
          qrScanner.start();
          const result = await QrScanner.scanImage(videoRef.current);
          setData(result);
          sendQrData(result);
        };

    // const handleClick = () =>{
    //     fileRef.current.click();
    // }

    // const handleChange = async (e) =>{
    //     const file = e.target.files[0];
    //     setFile(file);
    //     const result = await QrScanner.scanImage(file);
    //     setData(result);
    //     sendQrData(result);
    // }

    return(
        <div style={{ margin: "auto", width:'150px',height:'150px',marginTop:'250px'}}>
            <video ref={videoRef} style={{ margin: "auto", width: '500px', maxWidth: '500px' }}/>
            <button type="button"
            style={{margin: 'auto', backgroundColor:'rgb(0,140,120)', color:'white', border:'solid rgb(0,175,120) 5px',borderRadius:'50%',width:'150px',height:'150px'}}
            onClick={startScan}>
                Scan Mobile
            </button>

        </div>

    );
};

export default ReadQrMobile;