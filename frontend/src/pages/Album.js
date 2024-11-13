import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import '../scss/Album.scss';
import { getUserCards } from '../apis/backendApi';
import { getCharacters } from '../apis/marvelApi';

function Album() {

    const [collection, setCollection] = useState('');
    const [totalCards, setTotalCards] = useState(null);
    const [percentageCards, setPercentageCards] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserCards();
            setCollection(res);
            const cards = await getCharacters(1,0)
            if (setTotalCards(cards.total)) {
                console.error("Error loading total cards")
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
            <div className='album-row'>
                <h2 className='album-title'>{percentageCards}%</h2>
                <h2 className='album-title'>Your collection:</h2>
                <span className='album-wrapper'>
                    <h2 className='album-title'>{collection.length}/{totalCards}</h2>
                </span>
            </div>
            <div className='album-container'>
                {collection && collection.map((item) => (
                    <Card 
                        key={item._id}
                        name={item.name}
                        pathImg={item.pathImg}
                        description={item.description}
                    />
                ))}
            </div>

        </>
    );
}

export default Album;