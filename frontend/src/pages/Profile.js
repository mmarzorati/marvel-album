import React from 'react';
import '../scss/Profile.scss';
import { Container, Row, Col } from 'react-bootstrap';

function Profile() {
    return (
        <>
        <Container className='text-center'>
            <h2 className='profile-title'>Profile</h2>
            <Row className='text-start' >
                <Col>
                    <label className='profile-label' >Name</label>
                    <h6 className='profile-desc'>Manuel Marzorati</h6>
                </Col>
                <Col>
                    <label className='profile-label' >Username</label>
                    <h6 className='profile-desc'>mmarzorati</h6>
                </Col>
            </Row>
            <Row className='text-start'>
                <Col>
                    <label className='profile-label' >Email</label>
                    <h6 className='profile-desc'>manu.marzorati@gmail.com</h6>
                </Col>
                <Col>
                    <label className='profile-label' >Coins</label>
                    <h6 className='profile-desc'>55</h6>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Profile;