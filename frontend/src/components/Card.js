import React from 'react';
import '../scss/Card.scss';
import Image from 'react-bootstrap/Image';

function Card(props) {
    return (
        <>
            <div className='card-container'>
                <Image src={props.pathImg} thumbnail />
                <h5 className='card-name'>{props.name}</h5>
                <p className='card-desc'>{props.description}</p>
            </div>
        </>
    );
}

export default Card;