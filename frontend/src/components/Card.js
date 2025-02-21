import React, { useState, useEffect} from 'react';
import '../scss/Card.scss';
import {Image, Modal, Button} from 'react-bootstrap';
import { Badge } from '@mui/material';
import { Link } from "react-router-dom";
import trashIcon from '../assets/icons/trash.png';
import { sellCard } from '../apis/backendApi';
import { useSnackbar } from './AlertContext';
import CircularProgress from '@mui/material/CircularProgress';


function Card(props) {

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState(false);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (props.description.length > 85) {
            setDescription(props.description.substring(0, 85) + '...');
        } else {
            setDescription(props.description);
        }
    }, [props.description]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleSellCard = async () => {
        try {
            setIsLoading(true)
            const res = await sellCard(props.id);
            props.setCollection(res.collec);
            setIsLoading(false)
            showSnackbar(res.message, 'success')
        } catch (error) {
            showSnackbar(error.response.data.message, 'error');
        }
        finally {
            closeModal();
        }
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
                        <p className='card-desc'>{description ? description : 'No description'}</p>
                        <img className='card-icon' onClick={(e) => {e.preventDefault(); e.stopPropagation(); openModal()}} src={trashIcon} alt="Trash icon" />
                    </Badge>
                ) : (
                    <div className='card-container'>
                        <Image className='card-image' src={props.pathImg} thumbnail />
                        <h5 className='card-name'>{props.name}</h5>
                        <p className='card-desc'>{description ? description : 'No description'}</p>
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
                {isLoading ? (
                    <div className='pack-spinner'>
                        <CircularProgress color="error" size="100px" />
                    </div>
                ) : (
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
                            <Button variant="success" onClick={handleSellCard}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    );
}

export default Card;