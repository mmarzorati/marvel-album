import React, {useEffect, useState} from 'react';
import '../../scss/Trades.scss';
import Trade from './Trade'
import {getUserTrades} from '../../apis/backendApi'
import noResultsIcon from '../../assets/icons/no-results.png';
import { useSnackbar } from './../AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function CompletedTrade({tradeOrigin}) {

    const [tradesSent, setTradesSent] = useState(null);
    const [tradesReceived, setTradesReceived] = useState(null);
    const { showSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const res = await getUserTrades('completed')
                setTradesSent(res.sent_trades)
                setTradesReceived(res.received_trades)
                setIsLoading(false)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        }

        loadData()
    }, []);
    
    return (
        <>
            {  isLoading ? (
                <div className='album-spinner'>
                    <CircularProgress color="error" size="100px"/>
                </div>
            ) : (
                tradeOrigin === 'sent' ? (                            
                    tradesSent && tradesSent.trades.length > 0 ? (
                        [...tradesSent.trades]
                        .reverse().map((item) => (
                            <Trade 
                                id={item._id}
                                sender_id={item.sender_id}
                                receiver_id={item.receiver_id}
                                rec_cards={item.rec_cards}
                                sen_cards={item.sen_cards}
                                status='completed'
                            />
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
                        .reverse().map((item) => (
                            <Trade 
                                id={item._id}
                                sender_id={item.sender_id}
                                receiver_id={item.receiver_id}
                                rec_cards={item.rec_cards}
                                sen_cards={item.sen_cards}
                                status='completed'
                            />
                        ))
                    ) : (
                        
                        <div className='no-items-container'>
                            <label className='trades-no-items'>No trades found</label>
                            <img className='profile-icon' src={noResultsIcon} alt="Not Found Icon" />
                        </div>
                    )
                )
            )
            }
        </>
    );
}

export default CompletedTrade;