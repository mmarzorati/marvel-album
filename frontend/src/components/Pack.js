import React, { useState } from 'react';
import '../scss/Pack.scss';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import coinIcon from '../assets/icons/coin.png';
import { addUserCard } from '../apis/backendApi';
import { getCharacters } from '../apis/marvelApi';

function Pack(props) {

    // inseriere gestione errori

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const confirmPurchase = async () => {
        setIsLoading(true);
        for (let i = 0; i < props.amount; i++) {
            // genera un numero casuale tra 0 e carteTotali -1,questo perchè rappresenterà l'offset, che permette di saltare il numero di elementi indicato
            const randomNumber = Math.floor(Math.random() * (props.totalCards)); 
            const res = await getCharacters(1, randomNumber)
            await addUserCard(
                res.results[0].id, 
                res.results[0].name, 
                res.results[0].description, 
                res.results[0].thumbnail.path + '.' + res.results[0].thumbnail.extension
            );
        }
        setIsLoading(false);
    }

    const buyPack = () => {
        // test da RIMUOVERE
        addUserCard(1011334, "3-D Man", "", "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784");
    }

    return (
        <>
            <div className='pack-col'>
                <div className='pack-container' style={{ backgroundColor: props.color }}>
                    <h2 className='pack-amount'>{props.amount}</h2>
                    <p className='pack-desc'>{props.desc}</p>                   
                </div>
                <Button variant="success" className='pack-btn' onClick={showModal}>
                    <label className='pack-price' >{props.price}</label>
                    <img className='pack-icon' src={coinIcon} alt="Coin Icon" />
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
            {isLoading ? (
                <p>SPINNER</p>
            ) : (
                <>         
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
                        <Button variant="success" onClick={confirmPurchase}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </> 
            )}
            </Modal>
        </>
    );
}

export default Pack;