import React, {useEffect, useState} from 'react';
import '../../scss/Trades.scss';
import Trade from './Trade'
import {getUserTrades} from '../../apis/backendApi'

function PendingTrade() {

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
            <h2>Pending trades</h2>
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
        </>
    );
}

export default PendingTrade;