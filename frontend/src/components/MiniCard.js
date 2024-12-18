import React, {useState, useEffect} from 'react';
import '../scss/Trades.scss';
import Image from 'react-bootstrap/Image';
import { Checkbox, Badge } from '@mui/material';
import { yellow } from '@mui/material/colors';

function MiniCard(props) {

    const [name, setName] = useState(props.name);

    useEffect(() => {
        if (props.name.length > 15) {
            setName(props.name.substring(0, 15) + '...');
        } else {
            setName(props.name);
        }
    }, [props.name]);

    return (
        <>
            {
                props.quantity > 1 ? (
                    <Badge badgeContent={props.quantity} 
                        color="success" 
                        className='minicard'
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: "15px",
                                height: "30px",
                                minWidth: "30px",
                                borderRadius: "30px",
                            },
                        }}
                    >
                        <Checkbox
                            sx={{
                                position: 'absolute',
                                top: '-27px',
                                left: '-27px',
                                zIndex: 1,
                                '& .MuiSvgIcon-root': { fontSize: 35},
                                color: yellow[800],
                                '&.Mui-checked': {
                                color: yellow[600],
                                },
                            }}
                            onChange={() => props.checkboxSelected(props.id)}
                            color="default"
                        />
                        <Image src={props.pathImg } rounded />
                        <h6>{name}</h6>
                    </Badge>
                ) : (
                    <div className='minicard'>
                        <Checkbox
                            sx={{
                                position: 'absolute',
                                top: '-27px',
                                left: '-27px',
                                zIndex: 1,
                                '& .MuiSvgIcon-root': { fontSize: 35},
                                color: yellow[800],
                                '&.Mui-checked': {
                                color: yellow[600],
                                },
                            }}
                            onChange={() => props.checkboxSelected(props.id)}
                            color="default"
                        />
                        <Image src={props.pathImg } rounded />
                        <h6>{name}</h6>
                    </div>
                )
            }
        </>
    );
}

export default MiniCard;