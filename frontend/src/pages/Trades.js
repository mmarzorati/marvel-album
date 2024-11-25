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

    const [tradeStatus, setTradeStatus] = useState("pending");
    const [tradeOrigin, setTradeOrigin] = useState("sent");
    const [show, setShow] = useState(false);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);
    const setCompleted = () => setTradeStatus("completed");
    const setCancelled = () => setTradeStatus("cancelled");
    const setPending = () => setTradeStatus("pending");
    const setSent = () => setTradeOrigin("sent");
    const setReceived = () => setTradeOrigin("received");

    const switchStatus = () => {
        switch (tradeStatus) {
            case 'completed':
                return <CompletedTrade tradeOrigin={tradeOrigin} />;
            case 'pending':
                return <PendingTrade tradeOrigin={tradeOrigin} setTradeStatus={setTradeStatus}/>;
            case 'cancelled':
                return <CancelledTrade tradeOrigin={tradeOrigin} />;
            default:
                return <div></div>;
        }
    };
    
    return (
        <>
            <div className='trades-wrapper'>
                <div className='trades-container mb-4 mt-4'>
                    <h2 className='trades-title'>Do you want swap some cards?</h2>
                    <Button className='button d-flex justify-content-center align-items-center mb-4' onClick={showModal}>
                        <img className='trades-icon-2' src={plusIcon} alt="Plus Icon" />
                            New trade
                    </Button>
                </div>
                <h2 className='trades-title '>Your trades overview</h2>
                <div className='trades-container mb-4'>
                    <div onClick={setSent} className={`button sent ${tradeOrigin === 'sent' ? 'active' : 'inactive'}`}>
                        Sent
                    </div>
                    <div onClick={setReceived} className={`button sent ${tradeOrigin === 'received' ? 'active' : 'inactive'}`}>
                        Received
                    </div>
                </div>
                <div className='trades-container'>
                    <div onClick={setCancelled} className={`button cancelled ${tradeStatus === 'cancelled' ? 'active' : 'inactive'}`}>
                        Cancelled
                    </div>
                    <div onClick={setPending} className={`button pending ${tradeStatus === 'pending' ? 'active' : 'inactive'}`}>
                        Pending
                    </div>
                    <div onClick={setCompleted} className={`button completed ${tradeStatus === 'completed' ? 'active' : 'inactive'}`}>
                        Completed
                    </div>
                </div>
                {switchStatus()}
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