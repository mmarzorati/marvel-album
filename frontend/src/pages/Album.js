import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import '../scss/Album.scss';
import { getUserCards } from '../apis/backendApi';

function Album() {

    const [collection, setCollection] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserCards();
            setCollection(res);
        }

        loadData();
    }, []);

    return (
        <>
            <div className='album-row'>
                <h2 className='album-title'>50%</h2>
                <h2 className='album-title'>Your collection:</h2>
                <span className='album-wrapper'>
                    <h2 className='album-title'>5/100</h2>
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