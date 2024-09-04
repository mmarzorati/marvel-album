import React from 'react';
import '../scss/Pack.scss';
import Button from 'react-bootstrap/Button';
import coinIcon from '../assets/icons/coin.png';

function Pack(props) {
    return (
        <>
            <div className='pack-col'>
                <div className='pack-container' style={{ backgroundColor: props.color }}>
                    <h2 className='pack-amount'>{props.amount}</h2>
                    {props.desc === "coin" ? (
                        <img className='pack-icon-2' src={coinIcon} alt="Coin Icon" />
                    ) : (
                        <p className='pack-desc'>{props.desc}</p>
                    )}                   
                </div>
                <Button variant="success" className='pack-btn'>
                    <label className='pack-price' >{props.price}</label>
                    {props.desc === "coin" ? (
                        <label className='pack-price' > €</label>
                    ) : (
                        <img className='pack-icon' src={coinIcon} alt="Coin Icon" />
                    )}
                </Button>
            </div>
        </>
    );
}

export default Pack;