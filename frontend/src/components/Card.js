import React, { useState} from 'react';
import '../scss/Card.scss';
import {Image, Modal, Button} from 'react-bootstrap';
import { Badge } from '@mui/material';
import { Link } from "react-router-dom";
import trashIcon from '../assets/icons/trash.png';

// veridficare i 112 cartteri

function Card(props) {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const sellCard = () => {
        console.log('sell')
    }

    return (
        <>
            <Link className="no-underline" to={`/card/${props.name}`}>
            {
                props.quantity > 1 ? (
                    <Badge badgeContent={props.quantity} 
                        color="success" 
                        className='card-container'
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: "25px",
                                height: "50px",
                                minWidth: "50px",
                                borderRadius: "30px",
                                border: "4px solid white",
                            },
                        }}
                    >
                        <Image className='card-image' src={props.pathImg} thumbnail />
                        <h5 className='card-name'>{props.name}</h5>
                        <p className='card-desc'>{props.description ? props.description : 'No description'}</p>
                        <img className='card-icon' onClick={(e) => {e.preventDefault(); e.stopPropagation(); }} src={trashIcon} alt="Trash icon" />
                    </Badge>
                ) : (
                    <div className='card-container'>
                        <Image className='card-image' src={props.pathImg} thumbnail />
                        <h5 className='card-name'>{props.name}</h5>
                        <p className='card-desc'>{props.description ? props.description : 'No description'}</p>
                        <img className='card-icon' onClick={(e) => {e.preventDefault(); e.stopPropagation(); openModal()}} src={trashIcon} alt="Trash icon" />
                    </div>
                )
            }
            </Link>
            <Modal 
                show={showModal} 
                onHide={closeModal} 
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <>         
                    <Modal.Header className='border-0' closeButton>
                        <Modal.Title>
                            Sell card
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        Are you sure to sell <span style={{ color: 'red' }}>{props.name}</span> card? You will recive <span style={{ color: 'red' }}>1</span> coin.
                    </Modal.Body>
                    <Modal.Footer className='border-0'>
                        <Button variant="danger" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={sellCard}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </> 
            </Modal>
        </>
    );
}

export default Card;