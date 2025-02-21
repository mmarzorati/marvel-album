import React, { createContext, useState, useContext, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from "@mui/material/Alert";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');

    const showSnackbarHandler = useCallback((message, type = 'success') => {
        setShowSnackbar(false);
        setTimeout(() => {
            setSnackbarMessage(message);
            setSnackbarType(type);
            setShowSnackbar(true);
        }, 100); // piccolo delay per garantire il reset della snackbar dopo la chiusura automatica
    }, []);

    const closeSnackbar = () => setShowSnackbar(false);

    return (
        <SnackbarContext.Provider value={{ showSnackbar: showSnackbarHandler }}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={showSnackbar}
                onClose={closeSnackbar}
                autoHideDuration={4000}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}
                sx={{
                    width: "50%",
                    maxWidth: "600px",
                }}
            >
                <MuiAlert
                    severity={snackbarType}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

// custom hook per usare il context
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};