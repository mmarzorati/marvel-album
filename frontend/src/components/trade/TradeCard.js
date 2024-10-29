import React, {useState, useEffect} from 'react';
import '../../scss/Trades.scss';
import Image from 'react-bootstrap/Image';

function TradeCard(props) {

    const [name, setName] = useState(props.name);

    useEffect(() => {
        if (props.name.length > 8) {
            setName(props.name.substring(0, 8) + '...');
        } else {
            setName(props.name);
        }
    }, [props.name]);

    return (
        <>
            <div className='tradecard'>
                <Image src={props.pathImg } rounded />
                <label>{name}</label>
            </div>
        </>
    );
}

export default TradeCard;