import React from 'react';
import '../scss/Trades.scss';
import Image from 'react-bootstrap/Image';

function MiniCard() {
    return (
        <>
            <div className='minicard'>
                <Image src="https://via.placeholder.com/50" rounded />
                <h6>CAPTAIN AMERICA</h6>
            </div>
        </>
    );
}

export default MiniCard;