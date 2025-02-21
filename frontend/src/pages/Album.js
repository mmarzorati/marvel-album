import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import '../scss/Album.scss';
import { getUserCards } from '../apis/backendApi';
import { getCharacters } from '../apis/marvelApi';
import noResultsIcon from '../assets/icons/no-results.png';
import { useSnackbar } from './../components/AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function Album() {

    const [collection, setCollection] = useState('');
    const [totalCards, setTotalCards] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [percentageCards, setPercentageCards] = useState(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const res = await getUserCards();
                setCollection(res);
                const cards = await getCharacters(1,0)
                if (setTotalCards(cards.total)) {
                    console.error("Error loading total cards")
                }
                setIsLoading(false)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        }

        loadData();
    }, []);
    
    useEffect(() => {
        if(collection.length && totalCards) {
            setPercentageCards(calculatePercentage())
        }
    }, [collection.length, totalCards]);

    const calculatePercentage = () => {
        const result = (collection.length*100)/totalCards
        return Math.round(result * 10) / 10;    // approssimo ai decimi il risultato
    }

    return (
        <> 
        {
            isLoading ? (
                <div className='album-spinner'>
                    <CircularProgress color="error" size="100px"/>
                </div>
            ) : (
                <>
                    <div className='album-row'>
                        <h2 className='album-title'>{percentageCards}%</h2>
                        <h2 className='album-title'>Your collection:</h2>
                        <span className='album-wrapper'>
                            <h2 className='album-title'>{collection.length}/{totalCards}</h2>
                        </span>
                    </div>
                    <div className='album-container'>
                        {
                            collection && collection.length > 0 ? (
                                collection.map((item) => (
                                    <Card 
                                        key={item.cardId._id}
                                        id={item.cardId._id}
                                        name={item.cardId.name}
                                        pathImg={item.cardId.pathImg}
                                        description={item.cardId.description}
                                        quantity={item.quantity}
                                        setCollection={setCollection}
                                    />
                                ))
                            ) : (
                                <>
                                    <div className='no-items-container'>
                                        <label className='trades-no-items'>No cards found</label>
                                        <img className='profile-icon' src={noResultsIcon} alt="Not Found Icon" />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </>
            )
        }
        </>
    );
}

export default Album;