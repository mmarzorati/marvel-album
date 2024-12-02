import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { getUserCards } from '../../apis/backendApi';
import MiniCard from '../MiniCard'
import noResultsIcon from '../../assets/icons/no-results.png';
import { useSnackbar } from './../AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function StepTwo(props) {

    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const res = await getUserCards()
                setCollection(res)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
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
        props.setSenderCards(selectedIds)
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