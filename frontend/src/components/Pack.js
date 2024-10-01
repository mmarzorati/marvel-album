import React, { useState } from 'react';
import '../scss/Pack.scss';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import coinIcon from '../assets/icons/coin.png';
import { addUserCard } from '../apis/backendApi';

function Pack(props) {

    const [show, setShow] = useState(false);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

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
                <Button variant="success" className='pack-btn' onClick={showModal}>
                    <label className='pack-price' >{props.price}</label>
                    {props.desc === "coin" ? (
                        <label className='pack-price' > €</label>
                    ) : (
                        <img className='pack-icon' src={coinIcon} alt="Coin Icon" />
                    )}
                </Button>
            </div>
            <Modal 
                show={show} 
                onHide={closeModal} 
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='border-0' closeButton>
                    <Modal.Title>
                        Buy random cards pack
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Are you sure to spend {props.price} coins to buy this pack? You will recive {props.amount} random cards.
                </Modal.Body>
                <Modal.Footer className='border-0'>
                    <Button variant="danger" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={closeModal}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Pack;