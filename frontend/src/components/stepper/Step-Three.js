import React, { useState, useEffect } from 'react';
import { createTrade } from '../../apis/backendApi';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { getUserCardsById } from '../../apis/backendApi';
import MiniCard from '../MiniCard'
import noResultsIcon from '../../assets/icons/no-results.png';

function SepThree(props) {

    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [senderCards, setSenderCards] = useState([]);
    const [isButtonDisable, setIsButtonDisable] = useState(true); 

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserCardsById(props.receiver._id)
            setCollection(res)
            setIsLoading(false)
        }

        loadData()
        setSenderCards([])
    }, []);

    // disabilita il bottone 'Next' se è vuoto
    useEffect(() => {
        setIsButtonDisable(senderCards.length === 0);
    }, [senderCards]);

    const checkboxSelected = (id) => {
        setSenderCards((prevSelectedIds) =>     // aggiorna l'array receiverCards aggiungendo o rimuovendo l'ID a seconda che la minicard sia selezionata o deselezionata
            prevSelectedIds.includes(id)
            ? prevSelectedIds.filter((selectedId) => selectedId !== id)
            : [...prevSelectedIds, id]
        );
    };

    const confirmTrade = async () => {
        if (props.receiverCards && senderCards) {
            try {
                setIsLoading(true)
                const res = await createTrade(props.receiver._id, senderCards, props.receiverCards)
                props.updateTrades(res)
            } catch (error) {
                console.log('error')
            } finally {
                setIsLoading(false)
                props.closeModal()
                props.setPending()
                // riazzero la selezione carte per i prossimi trade
                props.resetStep()
                props.setUserSelected(null)
            }
        }
        else {
            console.log('error')
            console.log(props.receiverCards, senderCards)
        }
    }

    return (
        <div className='w-100 step-search-container'>
            <div className='step-cards-container'>
                {!isLoading ? (
                    collection && collection.length > 0 ? (
                        collection.map((item) => (
                            <MiniCard 
                                id={item.cardId._id}
                                name={item.cardId.name}
                                pathImg={item.cardId.pathImg}
                                checkboxSelected={checkboxSelected}
                            />
                        ))
                    ) : (
                        <div className='no-items-container'>
                            <label className='trades-no-items-2'>No cards found</label>
                            <img className='profile-icon' src={noResultsIcon} alt="Not Found Icon" />
                        </div>
                    )
                ) : (
                    <div>SPINNER</div>
                )
}
            
            </div>
            <Modal.Footer className='border-0 w-100'>
                <Button variant="danger" onClick={props.previousStep}>
                    Cancel
                </Button>
                <Button disabled={isButtonDisable} onClick={confirmTrade} sx={{ mr: 1 }}>
                    Create Trade
                </Button>
            </Modal.Footer>
        </div>
    );
    };

export default SepThree;