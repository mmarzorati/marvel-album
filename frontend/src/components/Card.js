import React from 'react';
import '../scss/Card.scss';
import Image from 'react-bootstrap/Image';

function Card() {
    return (
        <>
            <div className='card-container'>
                <Image src="https://via.placeholder.com/150" thumbnail />
                <h5 className='card-name'>CAPTAIN AMERICA</h5>
                <p className='card-desc'>jdb adhsu8 abdsucy 8 bads u ygbdy 9hwadsefiucw wefdg h8we bw8efu  hwefhwe h7efwu hefw787fghwef wehfuw </p>
            </div>
        </>
    );
}

export default Card;