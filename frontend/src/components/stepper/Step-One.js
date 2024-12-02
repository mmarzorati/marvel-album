import React, { useState, useEffect } from 'react';
import { searchUsersAPI } from '../../apis/backendApi';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useSnackbar } from './../AlertContext';

function StepOne(props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); 
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const { showSnackbar } = useSnackbar();
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // 300ms di ritardo per il debounce
    
        return () => {
            clearTimeout(handler);
        };
    }, [query]);
    
    useEffect(() => {
        if (debouncedQuery) {
            searchUsers(debouncedQuery);
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        setIsButtonDisable(!props.userSelected);
    }, [props.userSelected]);
    
    const searchUsers = async (searchQuery) => {
        try {
            const res = await searchUsersAPI(searchQuery);
            setResults(res.slice(0, 5));
            setIsDropdownVisible(true);
        } catch (error) {
            showSnackbar(error.response.data.message, 'error');
        }
    };
    
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    
    const handleSelectUser = (user) => {
        props.setUserSelected(user); 
        setQuery('');
        setIsDropdownVisible(false);
    };
    
    return (
        <div className='w-100 step-search-container'>
            <div className='step-search-container'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search users..."
                    className='step-search-bar'
                />
                {isDropdownVisible && results.length > 0 && (
                    <ul className='step-search-list'>
                        {results.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => handleSelectUser(user)}
                                className='step-serach-item'
                            >
                                {user.username} - {user.name}
                            </li>
                        ))}
                    </ul>
                )}
                <div className='step-search-text'>
                    User selected for the trade:
                </div>
                {
                    props.userSelected ? (
                        <div className='step-search-selected'>
                            {props.userSelected.username} - {props.userSelected.name}
                        </div>
                    ) : (
                        <div className='step-search-warning'>
                            No user selected
                        </div>
                    )
                }
            </div>
            <Modal.Footer className='border-0 w-100'>
                {/* <Button variant="danger" onClick={props.previousStep}>
                    Cancel
                </Button> */}
                <Button disabled={isButtonDisable} onClick={props.nextStep} sx={{ mr: 1 }}>
                    Next
                </Button>
            </Modal.Footer>
        </div>
    );
    };

export default StepOne;