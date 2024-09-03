import React from 'react';
import Card from '../components/Card';
import '../scss/Album.scss';

function Album() {
    return (
        <>
            <h2 className='album-title'>Your collection:</h2>
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