import React, {useEffect, useState} from 'react';
import '../../scss/Trades.scss';
import Trade from './Trade'
import {getUserTrades} from '../../apis/backendApi'
import { Container, Row, Col, Button } from 'react-bootstrap';

function CompletedTrade({tradeOrigin}) {

    const [tradesSent, setTradesSent] = useState(null);
    const [tradesReceived, setTradesReceived] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserTrades('pending')
            setTradesSent(res)
        }

        loadData()
    }, []);

    useEffect(() => {
        console.log(tradesSent, tradesReceived, tradeOrigin)
    }, [tradeOrigin]);
    
    return (
        <>
            <h2>Completed trades</h2>
                        {  tradeOrigin === 'sent' ? (                            
                                tradesSent && tradesSent.map((item) => (
                                    <Trade 
                                        id={item._id}
                                        sender_id={item.sender_id}
                                        receiver_id={item.receiver_id}
                                        rec_cards={item.rec_cards}
                                        sen_cards={item.sen_cards}
                                        status='pending'
                                    />
                                ))
                            ) : (
                                tradesReceived && tradesReceived.map((item) => (
                                    <Trade 
                                        id={item._id}
                                        sender_id={item.sender_id}
                                        receiver_id={item.receiver_id}
                                        rec_cards={item.rec_cards}
                                        sen_cards={item.sen_cards}
                                        status='pending'
                                    />
                                ))
                            )
                        }
        </>
    );
}

export default CompletedTrade;