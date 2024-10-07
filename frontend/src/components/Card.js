import React from 'react';
import '../scss/Card.scss';
import Image from 'react-bootstrap/Image';

// veridficare i 112 cartteri

function Card(props) {
    return (
        <>
            <div className='card-container'>
                <Image className='card-image' src={props.pathImg} thumbnail />
                <h5 className='card-name'>{props.name}</h5>
                <p className='card-desc'>{props.description}</p>
            </div>
        </>
    );
}

export default Card;