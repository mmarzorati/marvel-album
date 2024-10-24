import React from 'react';
import '../../scss/Trades.scss';
import tradeIcon from '../../assets/icons/trade.png';
import TradeCard from './TradeCard'
import { Container, Row, Col, Button } from 'react-bootstrap';

function Trade(props) {
    return (
        <>
            <Row className='d-flex justify-content-center align-items-center me-0 ms-0'>
                { props.sen_cards && props.sen_cards.map((item) => (
                    <TradeCard
                        name={item.name}
                        pathImg={item.pathImg}
                    />
                ))}
                <img className='trades-icon' src={tradeIcon} alt="user Icon" />
                { props.rec_cards && props.rec_cards.map((item) => (
                    <TradeCard
                        name={item.name}
                        pathImg={item.pathImg}
                    />
                ))}
            </Row>
            <div>
                <Button variant="danger" className='trades-btn'>Reject</Button>
                <Button variant="success" className='trades-btn'>Accept</Button>
            </div>
        </>
    );
}

export default Trade;