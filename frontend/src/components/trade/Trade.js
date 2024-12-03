import React from 'react';
import '../../scss/Trades.scss';
import tradeIcon from '../../assets/icons/trade.png';
import TradeCard from './TradeCard';
import { Button } from 'react-bootstrap';
import { changeTradeStatus } from '../../apis/backendApi';
import { useSnackbar } from './../AlertContext';

function Trade(props) {

    const { showSnackbar } = useSnackbar();

    const handleTradeStatus = async (status) => {
        try {
            const res = await changeTradeStatus(status, props.id);
            props.setTradeStatus(status);
            showSnackbar(res.message, 'success');
        } catch (error) {
            showSnackbar(error.response.data.message, 'error');
            props.setTradeStatus('cancelled');
        }
    } 

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>  
            <div className='trades-row-names'>
                <label className='trades-subtitle'>{props.sender_id.name} - {props.sender_id.username}</label>
                <label className='trades-subtitle'>{props.receiver_id.name} - {props.receiver_id.username}</label>
            </div>
            <div className='trades-row me-0 ms-0'>
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
            </div>
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