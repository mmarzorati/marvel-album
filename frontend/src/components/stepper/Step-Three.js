import React, { useState, useEffect } from 'react';
import { createTrade } from '../../apis/backendApi';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { getUserCardsById } from '../../apis/backendApi';
import MiniCard from '../MiniCard'

function SepThree(props) {

    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [senderCards, setSenderCards] = useState([]);
    const [isButtonDisable, setIsButtonDisable] = useState(true); 

    useEffect(() => {
        const loadData = async () => {
            console.log(props.receiver)
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
                await createTrade(props.receiver._id, senderCards, props.receiverCards)
            } catch (error) {
                console.log('error')
            } finally {
                setIsLoading(false)
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
                {!isLoading && collection ? (
                    collection.map((item) => (
                        <MiniCard 
                            id={item._id}
                            name={item.name}
                            pathImg={item.pathImg}
                            checkboxSelected={checkboxSelected}
                        />
                    ))
                ) : (
                    <div>SPINNER</div>
                )}
            
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