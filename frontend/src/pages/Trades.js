import React from 'react';
import CompletedTrade from '../components/CompletedTrade';
import PendingTrade from '../components/PendingTrade';
import CancelledTrade from '../components/CancelledTrade';
import '../scss/Trades.scss';
import { useState } from 'react';

function Trades() {

    const [tradeType, setTradeType] = useState("pending");

    const setCompleted = () => setTradeType("completed");

    const setCancelled = () => setTradeType("cancelled");
    
    const setPending = () => setTradeType("pending");

    const switchComponent = () => {
        switch (tradeType) {
            case 'completed':
                return <CompletedTrade />;
            case 'pending':
                return <PendingTrade />;
            case 'cancelled':
                return <CancelledTrade />;
            default:
                return <div></div>;
        }
    };
    
    return (
        <>
            <div className='trades-container'>
                <div onClick={setCancelled} className={`button cancelled ${tradeType === 'cancelled' ? 'active' : 'inactive'}`}>
                    Cancelled
                </div>
                <div onClick={setPending} className={`button pending ${tradeType === 'pending' ? 'active' : 'inactive'}`}>
                    Pending
                </div>
                <div onClick={setCompleted} className={`button completed ${tradeType === 'completed' ? 'active' : 'inactive'}`}>
                    Completed
                </div>
            </div>
            {switchComponent()}
        </>
    );
}

export default Trades;