import React, { useState, useEffect } from 'react';
import { createTrade } from '../../apis/backendApi';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { getUserCardsById } from '../../apis/backendApi';
import MiniCard from '../MiniCard'
import noResultsIcon from '../../assets/icons/no-results.png';
import { useSnackbar } from './../AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function SepThree(props) {

    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [receiverCards, setReceiverCards] = useState([]);
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getUserCardsById(props.receiver._id)
                setCollection(res)
                setIsLoading(false)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        }

        loadData()
        setReceiverCards([])
    }, []);

    // disabilita il bottone 'Next' se è vuoto
    useEffect(() => {
    setIsButtonDisable(receiverCards.length === 0);
    }, [receiverCards]);

    const checkboxSelected = (id) => {
        setReceiverCards((prevSelectedIds) =>     // aggiorna l'array receiverCards aggiungendo o rimuovendo l'ID a seconda che la minicard sia selezionata o deselezionata
            prevSelectedIds.includes(id)
            ? prevSelectedIds.filter((selectedId) => selectedId !== id)
            : [...prevSelectedIds, id]
        );
    };

    const confirmTrade = async () => {
        if (props.senderCards && receiverCards) {
            try {
                setIsLoading(true)
                const res = await createTrade(props.receiver._id, receiverCards, props.senderCards)
                props.updateTrades(res)
                showSnackbar(res.message, 'success');
                setIsLoading(false)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            } finally {
                props.closeModal()
                props.setPending()
                // riazzero la selezione carte per i prossimi trade
                props.resetStep()
                props.setUserSelected(null)
            }
        }
        else {
            console.log('error')
        }
    }

    return (
        <>
            <div className='w-100 step-search-container'>
                <div className='step-cards-container'>
                    {!isLoading ? (
                        collection && collection.length > 0 ? (
                            collection.map((item) => (
                                <MiniCard 
                                    id={item.cardId._id}
                                    name={item.cardId.name}
                                    pathImg={item.cardId.pathImg}
                                    quantity={item.quantity}
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
                        <div className='pack-spinner'>
                            <CircularProgress color="error" size="100px"/>
                        </div>
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
    </>
    );
    };

export default SepThree;