import React, { useEffect, useState } from 'react';
import '../scss/Profile.scss';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import userIcon from '../assets/icons/user.png';
import coinIcon from '../assets/icons/coin.png';
import pencilIcon from '../assets/icons/pencil.png';
import deleteUserIcon from '../assets/icons/deleteUser.png';
import { getUserInfo, updateUserInfo, deleteUser } from '../apis/backendApi';
import { useSnackbar } from './../components/AlertContext';
import CircularProgress from '@mui/material/CircularProgress';

function Profile() {

    const [loading, setLoading] = useState(true);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [fieldType, setFieldType] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [coins, setCoins] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { showSnackbar } = useSnackbar();

    const closeEditModal = () => setShowEditModal(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); 
                const res = await getUserInfo();
                setUsername(res.username)
                setName(res.name)
                setEmail(res.email)
                setCoins(res.coins)
                setLoading(false); 
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        };
    
        fetchData();
    }, []);

    const openEditModal = ( type ) => {
        setFieldType(type)
        setShowEditModal(true)
    };

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);
    
    const handleInputChange = (event) => {
        setInputValue(event.target.value); 
    };

    const handleDeleteProfile = async () => {
        try {
            setIsDeleteLoading(true)
            const res = await deleteUser()
            showSnackbar(res.message, 'success');
            setIsDeleteLoading(false)
            setTimeout(() => {
                localStorage.clear();
                window.location.replace('/login');
            }, 2000);
        } catch (error) {
            showSnackbar(error.response.data.message, 'error');
        }
        finally {
            closeDeleteModal();
        }
    }

    const updateInfo = async () => {
        if (inputValue) {
            if (fieldType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
                showSnackbar('Email is not valid', 'error');
                return;
            }
            if (fieldType === "username" && (inputValue !== inputValue.toLowerCase() || /\d/.test(inputValue))) {
                showSnackbar('Username must be lowercase and cannot contain numbers', 'error');
                return;
            }
            if(fieldType === "name" && !/^[a-zA-Z ]*$/.test(inputValue)) {
                showSnackbar('The name must consist of letters and spaces only', 'error');
                return;
            }
            try {
                const res = await updateUserInfo(fieldType, inputValue);
                setUsername(res.user.username)
                setName(res.user.name)
                setEmail(res.user.email)
                closeEditModal();
                setInputValue('');
                showSnackbar(res.message, 'success');
            }
            catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        }
        else {
            showSnackbar('Input is not valid', 'error');
        }
    };

    return (
        <>
            <Container className='text-center'>
                { loading ? (
                    <div className='album-spinner'>
                        <CircularProgress color="error" size="100px"/>
                    </div>
                ) : (
                    <>
                        <img className='profile-delete tr-position' onClick={openDeleteModal} src={deleteUserIcon} alt="user Icon" />
                        <h2 className='profile-title'>Profile</h2>
                        <img className='profile-icon' src={userIcon} alt="user Icon" />
                        <Row className='text-center' >
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Name</label>
                                    <h6 className='profile-desc'>{name}</h6>
                                </div>
                                <img className='profile-edit' src={pencilIcon} alt="user Icon" onClick={() => openEditModal("name")}/>
                            </Col>
                            
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Username</label>
                                    <h6 className='profile-desc'>{username}</h6>
                                </div>
                                <img className='profile-edit' src={pencilIcon} alt="user Icon" onClick={() => openEditModal("username")}/>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col className='profile-row profile-mb'>
                                <div className='profile-col'>
                                    <label className='profile-label' >Email</label>
                                    <h6 className='profile-desc'>{email}</h6>
                                </div>
                                <img className='profile-edit' src={pencilIcon} alt="user Icon" onClick={() => openEditModal("email")}/>
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
                onHide={closeEditModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            { loading ? (
                <div className='pack-spinner'>
                    <CircularProgress color="error" size="100px" />
                </div>
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
                        <Button variant="danger" onClick={closeEditModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={updateInfo}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </> 
            )}
            </Modal>
            <Modal 
                show={showDeleteModal} 
                onHide={closeDeleteModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {isDeleteLoading ? (
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
                            Are you certain you want to delete the profile? This action cannot be undone.
                        </Modal.Body>
                        <Modal.Footer className='border-0'>
                            <Button variant="danger" onClick={closeDeleteModal}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handleDeleteProfile}>
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