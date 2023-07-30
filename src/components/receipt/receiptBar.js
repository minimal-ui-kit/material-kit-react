/* eslint-disable arrow-body-style */
import {useState} from 'react';
import { Grid, Button, Divider, ListItem, List } from '@mui/material';
import { AppConversionRates } from "../../sections/@dashboard/app/index";
import RECEIPTS from '../../_mock/receipts';
import DotDivider from '../dot-divider';
import ReceiptRibbon from '../receipt-ribbon';
import ReceiptHeader from '../receipt-header/ReceiptHeader';


const ReceiptBar = ({amo}) =>{

    const receipt = amo;

    // console.log(amo.data,'HOLA');

    return(
        <div style={{ 
            margin: "auto",
            marginLeft: '8px',
            background: "rgb(240,240,240)",
            width: "375px"
        }}>
            <ReceiptHeader receipt={receipt}/>
            <DotDivider amount={24}/>
            <AppConversionRates 
            // title="Conversion Rates"
            //   subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 452 }]}
            />
            <DotDivider amount={24}/>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px'
            }}>
                <span style={{marginLeft: '16px'}}>Amount:</span>
                <span style={{marginRight: '16px', fontWeight: 'bold'}}>{receipt.receiptAmount} RSD</span>
            </div>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between',
                paddingBottom: '20px'}}
                >
                    <span style={{marginLeft: '16px', fontSize: '12px'}}>Tax:</span>
                    <span style={{marginRight: '16px', fontSize: '12px'}}>{receipt.receiptTax} RSD</span>
            </div>

            <ReceiptRibbon amount={8}/>

        </div>
    )
};

export default ReceiptBar;