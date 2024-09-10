import React from 'react';
import '../scss/Character.scss';
import { Container, Row, Col, Image } from 'react-bootstrap';
import userIcon from '../assets/icons/user.png';

function Character() {
    return (
        <>
        <Container className='text-center'>
            <h2 className='character-title'>Spidermen</h2>
            <Image className="character-img" src={userIcon} rounded />
            <Row className='text-center' >
                <Col>
                    <p className='character-subtitle' >Description</p>
                    <p className='character-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ull</p>
                </Col>
                <Col>
                    <p className='character-subtitle' >Series</p>
                    <p className='character-desc'>ed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima </p>
                </Col>
            </Row>
            <Row className='text-center mt-5'>
                <Col>
                    <p className='character-subtitle' >Comics</p>
                    <p className='character-desc'>in to you how all this mistaken idea of denouncing pleasure </p>
                </Col>
                <Col>
                    <p className='character-subtitle' >Film</p>
                    <p className='character-desc'>olestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt m</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Character;