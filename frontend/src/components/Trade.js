import React from 'react';
import '../scss/Trades.scss';
import tradeIcon from '../assets/icons/trade.png';
import Minicard from './MiniCard'
import { Container, Row, Col } from 'react-bootstrap';

function Trade() {
    return (
        <>
            <Row className='d-flex justify-content-center align-items-center me-0 ms-0'>
                <Minicard/>
                <img className='trades-icon' src={tradeIcon} alt="user Icon" />
                <Minicard/>
            </Row>
        </>
    );
}

export default Trade;