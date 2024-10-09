import * as React from 'react';
import '../scss/Trades.scss';
import 
    {
        Stepper, 
        Step, 
        StepLabel, 
        Button,
        StepContent,
        Typography,
        Box
    } 
from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

const steps = [
    {
        label: 'Select user for the trade',
        desc: 'Select a user for the trade'
    },
    {
        label: 'Select your cards',
        desc: 'Select your cards'
    },
    {
        label: 'Select his cards',
        desc: 'Select his cards'
    }
];

export default function TradeStepper(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        if (activeStep>=2) {
            // funzione di creazione dello sccambio
        } else {
            setActiveStep(activeStep+1)
        }
    }

    const previousStep = () => {
        setActiveStep(activeStep-1)
    }

    return (
        <Modal 
            show={props.show} 
            onHide={props.closeModal} 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {isLoading ? (
                <p>SPINNER</p>
            ) : (
                <>         
                    <Modal.Header className='border-0' closeButton>
                        <Modal.Title>
                            New Trade
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((steps) => (
                                <Step key={steps}>
                                    <StepLabel>{steps.label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                            <Box className='step-container'>
                                <Typography>{steps[activeStep].desc}</Typography>
                            </Box>
                        </Box>
                    </Modal.Body>
                    <Modal.Footer className='border-0'>
                        <Button variant="danger" onClick={previousStep}>
                            Cancel
                        </Button>
                        <Button onClick={nextStep} sx={{ mr: 1 }}>
                            Next
                        </Button>
                    </Modal.Footer>
                </> 
            )}
        </Modal>
    );
}