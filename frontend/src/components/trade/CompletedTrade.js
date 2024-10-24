import React, {useEffect, useState} from 'react';
import '../../scss/Trades.scss';
import Trade from './Trade'
import {getUserTrades} from '../../apis/backendApi'
import { Container, Row, Col, Button } from 'react-bootstrap';

function CompletedTrade() {

    const [trades, setTrades] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserTrades('pending')
            setTrades(res)
        }

        loadData()
    }, []);
    
    return (
        <>
            <h2>Completed trades</h2>
                <Row>
                    <Col className='text-center trades-border'>
                    <h3 className='trades-title'>Trades Received</h3>
                        {
                            trades && trades.map((item) => (
                                <Trade 
                                    id={item._id}
                                    sender_id={item.sender_id}
                                    receiver_id={item.receiver_id}
                                    rec_cards={item.rec_cards}
                                    sen_cards={item.sen_cards}
                                    status='pending'
                                />
                            ))
                        }
                    </Col>
                    <Col className='text-center'>
                        <h3 className='trades-title'>My Trades</h3>
                        {
                            trades && trades.map((item) => (
                                <Trade 
                                    id={item._id}
                                    sender_id={item.sender_id}
                                    receiver_id={item.receiver_id}
                                    rec_cards={item.rec_cards}
                                    sen_cards={item.sen_cards}
                                    status='pending'
                                />
                            ))
                        }
                        
                    </Col>
                </Row>
        </>
    );
}

export default CompletedTrade;