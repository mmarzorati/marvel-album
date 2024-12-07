import { useParams } from "react-router-dom";
import { useSnackbar } from './../components/AlertContext';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getCardDetail } from './../apis/marvelApi';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';

function CardDetail() {
    
    const [isLoading, setIsLoading] = useState(true);
    const [cardInfo, setCardInfo] = useState(true);
    const { cardName } = useParams();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const res = await getCardDetail(cardName)
                console.log(res.results[0])
                setCardInfo(res.results[0])
                setIsLoading(false)
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }
        }

        loadData();
    }, []);

    const concatObj = (object) => {
        return object.items.map(obj => obj.name).join(", ")
    }

    const printUrls = () => {
        return cardInfo.urls.map(url => (
            <a className='details-link' href={url.url} target='_blank' rel="noopener noreferrer" key={url.type}>{url.type} </a>
        ))
    }


    return (
        <>
        <Container className='text-center'>
            {
                isLoading ? (
                    <div className='album-spinner'>
                        <CircularProgress color="error" size="100px"/>
                    </div>
                ) : (
                    <>
                            <h2 className='profile-title'>{cardName}</h2>
                            <Image className='details-image' src={cardInfo.thumbnail.path + '.' + cardInfo.thumbnail.extension} thumbnail />
                            <Row className='text-center' >
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Description</label>
                                        <h6 className='details-desc'>{cardInfo.desc ? cardInfo.desc : 'No description'}</h6>
                                    </div>
                                </Col>
                                
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Urls</label>
                                        <h6>{printUrls()}</h6>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='text-center'>
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Series</label>
                                        <h6 className='details-desc'>{concatObj(cardInfo.series)}</h6>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Comics</label>
                                        <h6 className='details-desc'>{concatObj(cardInfo.comics)}</h6>
                                    </div>
                                </Col>
                            </Row>
                    </>
                )
            }
        </Container>
        </>
    );
}

export default CardDetail;