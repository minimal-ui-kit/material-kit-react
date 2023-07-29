/* eslint-disable no-plusplus */
export default function ReceiptRibbon({amount}){

    const renderAmount = () =>{
        const divs = [];
        for (let i = 0; i < amount; i++) {
          divs.push(<>
                      <div style={{
                backgroundImage: `linear-gradient(-45deg, transparent 16px, #1ba1e2 0),
                                    linear-gradient(45deg, transparent 16px, #1ba1e2  0)`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'left bottom',
                backgroundSize: '22px 32px',
                display: 'block',
                width:'100%',
                height: '32px',
                // top: '64px',
                position: 'relative',
            }}/>

            </>);
        }
        return divs;
    }

return( 
        <div style={{
            background:'#F9FAFB'
        }}>
        <div style={{
                backgroundImage: `linear-gradient(-45deg, transparent 16px, rgb(240,240,240) 0),
                                    linear-gradient(45deg, transparent 16px, rgb(240,240,240)  0)`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'left bottom',
                backgroundSize: '22px 32px',
                display: 'block',
                width:'100%',
                height: '32px',
                // top: '64px',
                position: 'relative',
            }}/>
        </div>
    )
}