import React from 'react';
import CompletedTrade from '../components/trade/CompletedTrade';
import PendingTrade from '../components/trade/PendingTrade';
import CancelledTrade from '../components/trade/CancelledTrade';
import TradeStepper from '../modal/TradeStepper';
import '../scss/Trades.scss';
import plusIcon from '../assets/icons/plus.png';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Trades() {

    const [tradeType, setTradeType] = useState("pending");
    const [show, setShow] = useState(false);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);
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
            <div className='trades-wrapper'>
                <h2 className='trades-title'>Do you want swap some cards?</h2>
                <Button className='button d-flex justify-content-center align-items-center mb-5' onClick={showModal}>
                    <img className='trades-icon-2' src={plusIcon} alt="Plus Icon" />
                        New trade
                </Button>
                <h2 className='trades-title'>Your trades:</h2>
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
            </div>
            <TradeStepper 
                show={show} 
                showModal={showModal} 
                closeModal={closeModal} 
            />
        </>
    );
}

export default Trades;