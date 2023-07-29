/* eslint-disable no-plusplus */
export default function ReceiptRibbon({amount}){

    const renderAmount = () =>{
        const divs = [];
        for (let i = 0; i < amount; i++) {
          divs.push(<>
                      <div style={{
                background: 'white',
                width:'12px',
                height: '40px',
                top: '20px',
                position: 'relative',
                // bottom: '0px',
            }}/>

          <div style={{
            border: 'solid white 20px',
            width: '46px',
            borderTopRightRadius: '50%',
            borderTopLeftRadius: '50%',
        }}
            key={i} />
            <div style={{
                background: 'white',
                width:'12px',
                height: '40px',
                top: '20px',
                position: 'relative',
                // bottom: '0px',
            }}/></>);
        }
        return divs;
    }

return( 
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'end'
        }}>
        {renderAmount()}
        </div>
    )
}