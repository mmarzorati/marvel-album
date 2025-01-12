import config from '../config.json';
import axios from "axios";

export async function createUser(name, username, email, password) {
    try {
        const response = await axios.post(config.backendUrl + '/api/users', {
            username: username,
            email: email,
            name: name,
            password: password
        });
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Create user API error:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

export async function checkUser(email, password) {
    try {
        const response = await axios.post( config.backendUrl + '/api/users/login', {
            email: email,
            password: password
        });
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Log in API error:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

export async function getUserInfo() {
    try {
        const response = await axios.get( config.backendUrl + '/api/user', {withCredentials: true});
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('get user info API error:', error.response ? error.response.data : error.message);        
        }
        throw error;
    }
}

export async function getUserCards() {
    try {
        const response = await axios.get( config.backendUrl + '/api/users/cards', {withCredentials: true});
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Get user card API error:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

export async function getUserCardsById(id) {
    try {
        const response = await axios.get( config.backendUrl + `/api/cards/${id}`, { withCredentials: true });
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Get user card API error:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

export async function addUserCard( marvelId, name, description, pathImg) {
    try {
        const response = await axios.post(
             config.backendUrl + '/api/users/add-card',
            { marvelId, name, description, pathImg },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Add card API error:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

export async function buyCoins( amount ) {
    try {
        if (amount > 0 ) {
            amount = +amount; 
            const response = await axios.post(
                 config.backendUrl + '/api/users/coins',
                { amount },
                { withCredentials: true }
            );
            return response.data
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Buy coins API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function removeCoins( amount ) {
    try {
        if (amount > 0) {
            amount = -amount;   // rendiamo negativa la cifra
        }
        const response = await axios.post(
             config.backendUrl + '/api/users/coins',
            { amount },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Remove coins API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function searchUsersAPI( query ) {
    try {
        const response = await axios.post(
             config.backendUrl + `/api/users/search?query=${query}`,
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Search users API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function createTrade( receiver_id, rec_cards, sen_cards) {
    try {
        const response = await axios.post(
             config.backendUrl + '/api/trades',
            { receiver_id, rec_cards, sen_cards },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Create trade API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function getUserTrades(status) {
    try {
        const response = await axios.get( config.backendUrl + `/api/trades/${status}`, { withCredentials: true });
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Get Trade API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function changeTradeStatus(status, tradeId) {
    try {
        const response = await axios.patch(
             config.backendUrl + `/api/trades`,
            { status, tradeId },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Change Trade status API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function updateUserInfo(fieldType, inputValue) {

    const payload = {
        email: null,
        name: null,
        username: null
    };

    if (fieldType in payload) {
        payload[fieldType] = inputValue;
    } else {
        throw new Error(`Invalid fieldType: ${fieldType}`);
    }

    try {
        const response = await axios.put(
             config.backendUrl + '/api/users', 
            payload, 
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Update user info API error  :', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function sellCard(cardId) {
    try {
        const response = await axios.delete( config.backendUrl + `/api/cards/${cardId}`, { withCredentials: true });
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Sell card API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}

export async function deleteUser() {
    try {
        const response = await axios.delete( config.backendUrl + `/api/users`, { withCredentials: true });
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.replace('/login');
        } else {
            console.error('Sell card API error:', error.response ? error.response.data : error.message);
        }
        throw error;    
    }
}