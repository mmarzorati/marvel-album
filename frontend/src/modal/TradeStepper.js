import React, { useState } from 'react';
import '../scss/Trades.scss';
import 
    {
        Stepper, 
        Step, 
        StepLabel,
        Box
    } 
from '@mui/material';
import { Modal } from 'react-bootstrap';
import StepTwo from '../components/stepper/Step-Two.js';
import StepOne from '../components/stepper/Step-One.js';
import StepThree from '../components/stepper/Step-Three.js';

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
    const [receiver, setReceiver] = useState(null);
    const [senderCards, setSenderCards] = useState(null);

    const nextStep = () => {
        if (activeStep<2) {
            setActiveStep(activeStep+1)
        }
    }

    const previousStep = () => {
        if (activeStep>0) {
            setActiveStep(activeStep-1)
        }
    }

    const resetStep = () => {
        setActiveStep(0);
    }

    const switchComponent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <StepOne 
                        userSelected={receiver} 
                        setUserSelected={setReceiver}
                        nextStep={nextStep} 
                    />
                );
            case 1:
                return (
                    <StepTwo
                        nextStep={nextStep}
                        previousStep={previousStep}
                        setSenderCards={setSenderCards}  
                    />
                );
            case 2:
                return (
                    <StepThree
                        receiver={receiver}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        senderCards={senderCards}
                        setUserSelected={setReceiver}
                        closeModal={props.closeModal}
                        setPending={props.setPending}
                        updateTrades={props.updateTrades}
                        resetStep={resetStep}
                    />
                );
            default:
                return <div></div>;
        }
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
                                {switchComponent()}
                            </Box>
                        </Box>
                    </Modal.Body>
                </> 
            )}
        </Modal>
    );
}