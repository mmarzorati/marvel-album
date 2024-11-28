import React, { useState, useEffect } from 'react';
import { searchUsersAPI } from '../../apis/backendApi';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { getUserCards } from '../../apis/backendApi';
import MiniCard from '../MiniCard'
import noResultsIcon from '../../assets/icons/no-results.png';

function StepTwo(props) {

    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isButtonDisable, setIsButtonDisable] = useState(true); 

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const res = await getUserCards()
                setCollection(res)
            } catch (error) {
                console.log('error')
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
        setSelectedIds([])
    }, []);

    // disabilita il bottone 'Next' se è vuoto
    useEffect(() => {
        setIsButtonDisable(selectedIds.length === 0);
    }, [selectedIds]);

    const checkboxSelected = (id) => {
        setSelectedIds((prevSelectedIds) =>     // aggiorna l'array selectedIds aggiungendo o rimuovendo l'ID a seconda che la minicard sia selezionata o deselezionata
            prevSelectedIds.includes(id)
            ? prevSelectedIds.filter((selectedId) => selectedId !== id)
            : [...prevSelectedIds, id]
        );
    };

    const confirmCards = () => {
        props.setReceiverCards(selectedIds)
        props.nextStep()
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
                )}
            
            </div>
            <Modal.Footer className='border-0 w-100'>
                <Button variant="danger" onClick={props.previousStep}>
                    Cancel
                </Button>
                <Button disabled={isButtonDisable} onClick={confirmCards} sx={{ mr: 1 }}>
                    Next
                </Button>
            </Modal.Footer>
        </div>
    );
    };

export default StepTwo;