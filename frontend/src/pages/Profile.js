import React, { useEffect, useState } from 'react';
import '../scss/Profile.scss';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import userIcon from '../assets/icons/user.png';
import coinIcon from '../assets/icons/coin.png';
import pencilIcon from '../assets/icons/pencil.png';
import { getUserInfo, updateUserInfo } from '../apis/backendApi';

function Profile() {

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [fieldType, setFieldType] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [coins, setCoins] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const closeModal = () => setShowEditModal(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserInfo();
                setUsername(res.username)
                setName(res.name)
                setEmail(res.email)
                setCoins(res.coins)
                console.log(res);
            } catch (error) {
                // Imposta lo stato di errore
            } finally {
                setLoading(false); 
            }
        };
    
        fetchData();
    }, []);

    const openModal = ( type ) => {
        setFieldType(type)
        setShowEditModal(true)
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value); 
    };

    const updateInfo = async () => {
        if (inputValue) {
            const res = await updateUserInfo(fieldType, inputValue);
            setUsername(res.user.username)
            setName(res.user.name)
            setEmail(res.user.email)
            closeModal();
            setInputValue('');
        }
        else {
            // errore toast
        }
    };

    return (
        <>
            <Container className='text-center'>
                { loading ? (
                    <h1>is loading</h1>   // da modificare
                ) : (
                    <>
                        <h2 className='profile-title'>Profile</h2>
                        <img className='profile-icon' src={userIcon} alt="user Icon" />
                        <Row className='text-center' >
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Name</label>
                                    <h6 className='profile-desc'>{name}</h6>
                                </div>
                                <img className='profile-edit' src={pencilIcon} alt="user Icon" onClick={() => openModal("name")}/>
                            </Col>
                            
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Username</label>
                                    <h6 className='profile-desc'>{username}</h6>
                                </div>
                                <img className='profile-edit' src={pencilIcon} alt="user Icon" onClick={() => openModal("username")}/>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Email</label>
                                    <h6 className='profile-desc'>{email}</h6>
                                </div>
                                <img className='profile-edit' src={pencilIcon} alt="user Icon" onClick={() => openModal("email")}/>
                            </Col>
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Coins</label>
                                    <div className='profile-row'>
                                        <h6 className='profile-desc'>{coins}</h6>
                                        <img className='profile-coin' src={coinIcon} alt="coin Icon" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
            <Modal 
                show={showEditModal} 
                onHide={closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            { loading ? (
                <p>SPINNER</p>
            ) : (
                <>         
                    <Modal.Header className='border-0' closeButton>
                        <Modal.Title>
                            Edit {fieldType}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Enter your new {fieldType}</Form.Label>
                            <Form.Control type="email" placeholder="..." value={inputValue} onChange={handleInputChange}/>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer className='border-0'>
                        <Button variant="danger" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={updateInfo}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </> 
            )}
            </Modal>
        </>
    );
}

export default Profile;