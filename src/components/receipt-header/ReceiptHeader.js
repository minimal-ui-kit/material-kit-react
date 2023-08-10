/* eslint-disable arrow-body-style */

import SvgColor from "../svg-color";

const ReceiptHeader = ({receipt}) =>{

    function formatDate(date) {
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      }


return (
<>
<div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{marginLeft:'12px', fontSize: '12px',marginTop: '12px',color:'gray'}}>#{receipt.receiptNumber}</div>
    <div style = {{width: '40px',height: '40px',background:'rgb(0,175,120)', margin: 'auto', marginTop:'0px', borderRadius:'6px'}}>
        <SvgColor src={'ic_store.svg'} sx={{ width: 1, height: 1 }}/>
    </div>
    <h3 style={{margin: 'auto',display:'block',marginTop:'4px'}}>{receipt.name}</h3>
    <div style={{margin: 'auto', marginBottom:'10px', fontSize: '12px'}}>{formatDate(receipt.timeDate)}</div>            
</div>
</>)
};
export default ReceiptHeader;