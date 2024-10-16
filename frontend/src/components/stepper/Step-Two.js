import React, { useState, useEffect } from 'react';
import { searchUsersAPI } from '../../apis/backendApi';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { getUserCards } from '../../apis/backendApi';
import MiniCard from '../MiniCard'

function StepTwo(props) {

    const [collection, setCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserCards()
            setCollection(res)
            setIsLoading(false)
        }

        loadData()
        setSelectedIds([])
    }, []);

    const checkboxSelected = (id) => {
        console.log(id)
        setSelectedIds((prevSelectedIds) =>     // aggiorna l'array selectedIds aggiungendo o rimuovendo l'ID a seconda che la minicard sia selezionata o deselezionata
            prevSelectedIds.includes(id)
            ? prevSelectedIds.filter((selectedId) => selectedId !== id)
            : [...prevSelectedIds, id]
        );
    };

    const confirmCards = () => {
        console.log(selectedIds)
    }

    return (
        <div className='w-100 step-search-container'>
            <div className='step-cards-container'>
                {!isLoading && collection ? (
                    collection.map((item) => (
                        <MiniCard 
                            id={item.marvelId}
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
                <Button onClick={confirmCards} sx={{ mr: 1 }}>
                    Next
                </Button>
            </Modal.Footer>
        </div>
    );
    };

export default StepTwo;