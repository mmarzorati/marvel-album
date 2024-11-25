import React, {useEffect, useState} from 'react';
import '../../scss/Trades.scss';
import Trade from './Trade'
import {getUserTrades} from '../../apis/backendApi'

function CancelledTrade({tradeOrigin}) {

    const [tradesSent, setTradesSent] = useState(null);
    const [tradesReceived, setTradesReceived] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserTrades('cancelled')
            setTradesSent(res.sent_trades)
            setTradesReceived(res.received_trades)
        }

        loadData()
    }, []);

    useEffect(() => {
        console.log(tradesSent, tradesReceived, tradeOrigin)
    }, [tradeOrigin]);
    
    return (
        <>
                {  tradeOrigin === 'sent' ? (                            
                        tradesSent && [...tradesSent.trades]
                        .reverse().map((item) => (
                            <Trade 
                                id={item._id}
                                sender_id={item.sender_id}
                                receiver_id={item.receiver_id}
                                rec_cards={item.rec_cards}
                                sen_cards={item.sen_cards}
                                status='cancelled'
                            />
                        ))
                    ) : (
                        tradesReceived && [...tradesReceived.trades]
                        .reverse().map((item) => (
                            <Trade 
                                id={item._id}
                                sender_id={item.sender_id}
                                receiver_id={item.receiver_id}
                                rec_cards={item.rec_cards}
                                sen_cards={item.sen_cards}
                                status='cancelled'
                            />
                        ))
                    )
                }
        </>
    );
}

export default CancelledTrade;