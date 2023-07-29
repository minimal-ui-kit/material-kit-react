/* eslint-disable no-plusplus */
export default function DotDivider({amount}){

    const renderAmount = () =>{
        const divs = [];
        for (let i = 0; i < amount; i++) {
          divs.push(<div style={{
            height: '4px',
            width: '4px',
            background: 'green',
            borderRadius: '50%',
        }}
            key={i} />);
        }
        return divs;
    }

return( 
        <div style={{
            display: 'flex',
            justifyContent: 'space-evenly'
        }}>
        {renderAmount()}
        </div>
    )
}