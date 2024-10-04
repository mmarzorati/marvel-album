import React, { useState } from 'react';
import '../scss/Pack.scss';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import coinIcon from '../assets/icons/coin.png';
import { addUserCard, buyCoins } from '../apis/backendApi';

function Pack(props) {

    const [show, setShow] = useState(false);

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const addCoins = async () => {
        const res = await buyCoins(10);
        console.log(res)
    }

    const buyPack = () => {
        // test da RIMUOVERE
        addUserCard(1011334, "3-D Man", "", "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784");
    }

    return (
        <>
            <div className='pack-col'>
                <div className='pack-container' style={{ backgroundColor: props.color }}>
                    <h2 className='pack-amount'>{props.amount}</h2>
                    <img className='pack-icon-2' src={coinIcon} alt="Coin Icon" />
                </div>
                <Button variant="success" className='pack-btn' onClick={showModal}>
                    <label className='pack-price' >{props.price}</label>
                    <label className='pack-price' > €</label>

                </Button>
            </div>
            
            <Modal 
                show={show} 
                onHide={closeModal} 
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='border-0' closeButton>
                    <Modal.Title>
                        Buy coins
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container>
                        <Row className='mb-3' >
                            <Col xs={12} md={8} className='d-flex flex-column' >
                                <label className='ms-2' >Card Number</label>
                                <input 
                                    placeholder='Card number' 
                                    type='text' 
                                    className='pack-input'
                                />
                            </Col>
                            <Col xs={6} md={4} className='d-flex flex-column'>
                                <label className='ms-2' >CVV</label>
                                <input 
                                    placeholder='CVV' 
                                    type='text' 
                                    className='pack-input-small'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={8} className='d-flex flex-column' >
                                <label className='ms-2' >Cardholder name</label>
                                <input 
                                    placeholder='Cardholder name' 
                                    type='text' 
                                    className='pack-input'
                                />
                            </Col>
                            <Col xs={6} md={4} className='d-flex flex-column'>
                                <label className='ms-2' >Expiration date</label>
                                <input 
                                    placeholder='MM/YY' 
                                    type='text' 
                                    className='pack-input-small'
                                />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className='border-0'>
                <Container>
                    <h4>Order recap</h4>
                    <Row>
                        <Col xs={3} md={2} className='pack-wrapper' >
                            <label className='mb-4'>My cart:</label>
                            <label>Total:</label>
                        </Col>
                        <Col xs={6} md={4} className='pack-wrapper' >
                            <div className='d-flex mt-4'>
                                <h5>{props.amount}</h5>
                                <img className='pack-icon' src={coinIcon} alt="Coin Icon" />
                            </div>
                            <hr className="pack-line" />
                            <h5>{props.price} €</h5>
                        </Col>
                    </Row>
                </Container>
                    <Button variant="danger" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={addCoins}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Pack;