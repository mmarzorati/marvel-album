import React, {useEffect} from 'react';
import '../../scss/Trades.scss';
import tradeIcon from '../../assets/icons/trade.png';
import TradeCard from './TradeCard'
import { Container, Row, Col, Button } from 'react-bootstrap';

function Trade(props) {

    return (
        <>
            <Row className='trades-row me-0 ms-0'>
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
                <div className='trades-side-right' >
                    { props.rec_cards && props.rec_cards.map((item) => (
                        <TradeCard
                            name={item.name}
                            pathImg={item.pathImg}
                        />
                    ))}
                </div>
            </Row>
            <div className={`trades-tag-${props.status}`}>Pending</div>
            {
                (props.status === 'pending' && props.tradeOrigin === 'received') ? (
                    <div>
                        <Button variant="danger" className='trades-btn'>Reject</Button>
                        <Button variant="success" className='trades-btn'>Accept</Button>
                    </div>
                ) : null
            }
            <hr className='trades-separator' ></hr>
        </>
    );
}

export default Trade;