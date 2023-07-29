/* eslint-disable arrow-body-style */
import {useState} from 'react';
import { Grid, Button, Divider, ListItem, List } from '@mui/material';
import RECEIPTS from '../../_mock/receipts';
import DotDivider from '../dot-divider';
import ReceiptRibbon from '../receipt-ribbon';


const Receipt = ({amo}) =>{

    const receipt = RECEIPTS[0];

    console.log(amo.data,'HOLA');

    return(
        <div style={{ 
            margin: "auto",
            background: "rgb(240,240,240)",
            width: "397px"
        }}>
            <div style={{margin: 'auto', display: 'flex', justifyContent: 'space-between',marginBottom: '-20px'}}> 
                <h3 style={{marginLeft: '16px'}}>{receipt.name}</h3>
                <div style = {{width: '20px',height: '20px',background:'green', marginRight: '16px'}}/>
            </div>
            <div style={{marginLeft: '16px', marginBottom:'20px', fontSize: '12px'}}>{receipt.timeDate[0]}</div>
            <DotDivider amount={24}/>
            <List style = {{marginTop: '6px'}}>
            {
                receipt && receipt.items.map((e,i) =>(<>
                        <ListItem key={i} style={{display: 'flex',justifyContent: 'space-between', marginBottom: '6px'}}>
                            <span>{e.name}</span> 
                            <span>{e.total} RSD</span>
                        </ListItem>
                        </>
                ))
            }
            </List>
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

export default Receipt;