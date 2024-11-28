import React, {useEffect, useState} from 'react';
import '../../scss/Trades.scss';
import Trade from './Trade'
import {getUserTrades} from '../../apis/backendApi'
import noResultsIcon from '../../assets/icons/no-results.png';

function PendingTrade(props) {

    const [tradesSent, setTradesSent] = useState(null);
    const [tradesReceived, setTradesReceived] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await getUserTrades('pending')
            setTradesSent(res.sent_trades)
            setTradesReceived(res.received_trades)
        }

        loadData()
    }, []);

    useEffect(() => {
        if (props.updateTrades) {
            setTradesSent(props.updateTrades.sent_trades)
            setTradesReceived(props.updateTrades.received_trades)
        }
    }, [props.updateTrades]);
    return (
        <>
        {
            props.tradeOrigin === 'sent' ? (
                tradesSent && tradesSent.trades.length > 0 ? (
                [...tradesSent.trades]
                    .reverse()
                    .map((item) => (
                    <>
                        <Trade 
                            id={item._id}
                            sender_id={item.sender_id}
                            receiver_id={item.receiver_id}
                            rec_cards={item.rec_cards}
                            sen_cards={item.sen_cards}
                            status='pending'
                        />
                    </>
                    ))
                ) : (
                    <div className='no-items-container'>
                        <label className='trades-no-items'>No trades found</label>
                        <img className='profile-icon' src={noResultsIcon} alt="Not Found Icon" />
                    </div>
                )
            ) : (
                tradesReceived && tradesReceived.trades.length > 0 ? (
                [...tradesReceived.trades]
                    .reverse()
                    .map((item) => (
                    <>
                        <Trade 
                            id={item._id}
                            sender_id={item.sender_id}
                            receiver_id={item.receiver_id}
                            rec_cards={item.rec_cards}
                            sen_cards={item.sen_cards}
                            status='pending'
                            tradeOrigin={props.tradeOrigin}
                            setTradeStatus={props.setTradeStatus}
                        />
                    </>
                    ))
                ) : (
                    <div className='no-items-container'>
                        <label className='trades-no-items'>No trades found</label>
                        <img className='profile-icon' src={noResultsIcon} alt="Not Found Icon" />
                    </div>
                )
            )
        }
        </>
    );
}

export default PendingTrade;