import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Card from '../components/Card';
import '../scss/All.scss';


function All() {
    return (
        <>
            <h2 className='all-title'>All collectible cards</h2>
            <div className='all-container'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </>
    );
}

export default All;