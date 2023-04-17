/* eslint-disable arrow-body-style */

import {useState, useRef} from 'react';
import QrScanner from 'qr-scanner';

const ReadQr = ({sendQrData}) =>{
    
    const [file,setFile] = useState(null);
    const [data,setData] = useState(null);

    const fileRef = useRef();

    const handleClick = () =>{
        fileRef.current.click();
    }

    const handleChange = async (e) =>{
        const file = e.target.files[0];
        setFile(file);
        const result = await QrScanner.scanImage(file);
        setData(result);
        sendQrData(result);
    }

    return(
        <div style={{ margin: "auto"}}>

            <button type="button"
            onClick={handleClick}>
                Scan QR Code
            </button>

            <input
                onChange={handleChange}
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                ref={fileRef}
                style={{display: "none"}}
            />

            {file && <img src={URL.createObjectURL(file)} alt="QR Code"/>}
        </div>

    );
};

export default ReadQr;