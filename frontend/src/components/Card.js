import React, {useEffect} from 'react';
import '../scss/Card.scss';
import Image from 'react-bootstrap/Image';
import { Badge } from '@mui/material';
import { Link } from "react-router-dom";

// veridficare i 112 cartteri

function Card(props) {

    useEffect(() => {
        console.log(props)
    }, []);

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
                </Badge>
            ) : (
                <div className='card-container'>
                    <Image className='card-image' src={props.pathImg} thumbnail />
                    <h5 className='card-name'>{props.name}</h5>
                    <p className='card-desc'>{props.description ? props.description : 'No description'}</p>
                </div>
            )
        }
        </Link>
        </>
    );
}

export default Card;