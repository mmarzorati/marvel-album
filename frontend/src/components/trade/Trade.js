import React, {useEffect} from 'react';
import '../../scss/Trades.scss';
import tradeIcon from '../../assets/icons/trade.png';
import TradeCard from './TradeCard';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { changeTradeStatus } from '../../apis/backendApi';

function Trade(props) {

    const handleTradeStatus = async (status) => {
        const res = await changeTradeStatus(status, props.id);
    } 

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <Row className='trades-row me-0 ms-0'>
                <label className='trades-subtitle'>{props.sender_id.username}</label>
                <div className='trades-side-left'>
                    { props.sen_cards && props.sen_cards.map((item) => (
                        <TradeCard
                            name={item.name}
                            pathImg={item.pathImg}
                        />
                    ))}
                </div>
                <div className='trades-side-middle'>
                    <img className='trades-icon' src={tradeIcon} alt="user Icon" />
                </div>
                <label className='trades-subtitle'>{props.receiver_id.username}</label>
                <div className='trades-side-right' >
                    { props.rec_cards && props.rec_cards.map((item) => (
                        <TradeCard
                            name={item.name}
                            pathImg={item.pathImg}
                        />
                    ))}
                </div>
            </Row>
            <div className={`trades-tag-${props.status}`}>{capitalizeFirstLetter(props.status)}</div>
            {
                (props.status === 'pending' && props.tradeOrigin === 'received') ? (
                    <div>
                        <Button onClick={() => handleTradeStatus('cancelled')} variant="danger" className='trades-btn'>Reject</Button>
                        <Button onClick={() => handleTradeStatus('completed')} variant="success" className='trades-btn'>Accept</Button>
                    </div>
                ) : null
            }
            <hr className='trades-separator' ></hr>
        </>
    );
}

export default Trade;