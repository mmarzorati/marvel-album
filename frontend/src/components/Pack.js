import React, { useState } from 'react';
import '../scss/Pack.scss';
import { Modal, Button } from 'react-bootstrap';
import coinIcon from '../assets/icons/coin.png';
import { addUserCard, removeCoins } from '../apis/backendApi';
import { getCharacters } from '../apis/marvelApi';
import { useSnackbar } from './../components/AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function Pack(props) {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingValue, setLoadingValue] = useState(1);
    const { showSnackbar } = useSnackbar();

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const confirmPurchase = async () => {
        try {
            const user = await removeCoins(props.price)
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
                // +2 per renderlo più utile per l'utente a livello visivo
                setLoadingValue(((i+2)*100)/props.amount)  // calcolo lo status in percentuale del processo per mostrarlo nello spinner
            }
            props.setCoins(user.coins)
            showSnackbar("Cards successfully added", 'success');
        }
        catch (error) {
            showSnackbar(error.response.data.message, 'error');
        }
        finally {
            setIsLoading(false);
            closeModal();
            setLoadingValue(1); // reset dello spinner value
        }

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
                <div className='pack-spinner d-flex flex-column'>
                    The process might take a while
                    <CircularProgress variant="determinate" className='mt-4' color="error" size="100px" value={loadingValue}/>
                </div>
            ) : (
                <>         
                    <Modal.Header className='border-0' closeButton>
                        <Modal.Title>
                            Buy random cards pack
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        Are you sure to spend <span style={{ color: 'red' }}>{props.price}</span> coins to buy this pack? You will recive <span style={{ color: 'red' }}>{props.amount}</span> random cards.
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