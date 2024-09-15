import React, { useEffect } from 'react';
import Card from '../components/Card';
import '../scss/Album.scss';
import { getAllCharacters } from '../apis/marvelApi';

function Album() {

    useEffect(() => {
        const loadData = async () => {
            // const characters = await getAllCharacters();
            // console.log(characters);
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
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>

        </>
    );
}

export default Album;