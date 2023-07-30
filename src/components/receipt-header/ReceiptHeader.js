/* eslint-disable arrow-body-style */

import SvgColor from "../svg-color";

const ReceiptHeader = ({receipt}) =>{


return (
<>
<div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{marginLeft:'12px', fontSize: '12px',marginTop: '12px',color:'gray'}}>#{receipt.receiptNumber}</div>
    <div style = {{width: '40px',height: '40px',background:'rgb(0,175,120)', margin: 'auto', marginTop:'0px', borderRadius:'6px'}}>
        <SvgColor src={'ic_store.svg'} sx={{ width: 1, height: 1 }}/>
    </div>
    <h3 style={{margin: 'auto',display:'block',marginTop:'10px'}}>{receipt.name}</h3>
    <div style={{margin: 'auto', marginBottom:'10px', fontSize: '12px'}}>{receipt.timeDate[0]}</div>            
</div>
</>)
};
export default ReceiptHeader;