import React, {useState, useEffect} from 'react';
import '../../scss/Trades.scss';
import Image from 'react-bootstrap/Image';

function TradeCard(props) {

    const [name, setName] = useState(props.name);

    useEffect(() => {
        if (props.name.length > 10) {
            setName(props.name.substring(0, 10) + '...');
        } else {
            setName(props.name);
        }
    }, [props.name]);

    return (
        <>
            <div className='minicard'>
                <Image src={props.pathImg } rounded />
                <h6>{name}</h6>
            </div>
        </>
    );
}

export default TradeCard;