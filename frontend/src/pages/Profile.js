import React, { useEffect, useState } from 'react';
import '../scss/Profile.scss';
import { Container, Row, Col } from 'react-bootstrap';
import userIcon from '../assets/icons/user.png';
import { getUserInfo } from '../apis/backendApi';

function Profile() {

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [coins, setCoins] = useState(null);

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
                setLoading(false);  // Imposta lo stato di caricamento a false
            }
        };
    
        fetchData();
    }, []);

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
                        <Col>
                            <label className='profile-label' >Name</label>
                            <h6 className='profile-desc'>{name}</h6>
                        </Col>
                        <Col>
                            <label className='profile-label' >Username</label>
                            <h6 className='profile-desc'>{username}</h6>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            <label className='profile-label' >Email</label>
                            <h6 className='profile-desc'>{email}</h6>
                        </Col>
                        <Col>
                            <label className='profile-label' >Coins</label>
                            <h6 className='profile-desc'>{coins}</h6>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
        </>
    );
}

export default Profile;