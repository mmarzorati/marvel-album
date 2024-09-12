import React from 'react';
import '../scss/Trades.scss';
import Trade from './Trade'

function CompletedTrade() {
    
    return (
        <>
            <h2>Completed trades</h2>
            <Trade/>
        </>
    );
}

export default CompletedTrade;