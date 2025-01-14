import { useParams } from "react-router-dom";
import { useSnackbar } from './../components/AlertContext';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getCardDetail } from './../apis/marvelApi';
import { Container, Row, Col, Image } from 'react-bootstrap';

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
                                        <h6 className='details-desc'>{cardInfo.description ? cardInfo.description : 'No description'}</h6>
                                    </div>
                                </Col>
                                
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Urls</label>
                                        <h6>{cardInfo.urls ? printUrls() : 'No data'}</h6>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='text-center'>
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Series</label>
                                        <h6 className='details-desc'>{cardInfo.series.available ? concatObj(cardInfo.series) : 'No data'}</h6>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='profile-col'>
                                        <label className='details-label' >Comics</label>
                                        <h6 className='details-desc'>{cardInfo.comics.available ? concatObj(cardInfo.comics) : 'No data'}</h6>
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