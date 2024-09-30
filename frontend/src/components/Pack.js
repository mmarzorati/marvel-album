import React from 'react';
import '../scss/Pack.scss';
import Button from 'react-bootstrap/Button';
import coinIcon from '../assets/icons/coin.png';
import { addUserCard } from '../apis/backendApi';

function Pack(props) {

    const buyPack = () => {
        // test da RIMUOVERE
        addUserCard(1011334, "3-D Man", "", "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784");
    }

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
                <Button variant="success" className='pack-btn' onClick={buyPack}>
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