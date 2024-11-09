import config from '../config.json';
import axios from "axios";

export async function createUser(name, username, email, password) {
    try {
        const response = await axios.post('api/users', {
            username: username,
            email: email,
            name: name,
            password: password
        });
        return response.data
    } catch (error) {
        console.error('Create user API error  :', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function checkUser(email, password) {
    try {
        const response = await axios.post('api/users/login', {
            email: email,
            password: password
        });
        return response.data
    } catch (error) {
        console.error('Log in API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getUserInfo() {
    try {
        const response = await axios.get('api/user', {}, {withCredentials: true});
        return response.data
    } catch (error) {
        console.error('get user info API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getUserCards() {
    try {
        const response = await axios.get('api/users/cards', {withCredentials: true});
        return response.data
    } catch (error) {
        console.error('Get user card API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getUserCardsById(id) {
    try {
        const response = await axios.get(`api/cards/${id}`, { withCredentials: true });
        return response.data
    } catch (error) {
        console.error('Get user card API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function addUserCard( marvelId, name, description, pathImg) {
    try {
        const response = await axios.post(
            'api/users/add-card',
            { marvelId, name, description, pathImg },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        console.error('Add card API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function buyCoins( amount ) {
    try {
        const response = await axios.post(
            'api/users/coins',
            { amount },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        console.error('Buy coins API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function removeCoins( amount ) {
    try {
        if (amount > 0) {
            amount = -amount;   // rendiamo negativa la cifra
        }
        const response = await axios.post(
            'api/users/coins',
            { amount },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        console.error('Remove coins API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function searchUsersAPI( query ) {
    try {
        const response = await axios.post(
            `api/users/search?query=${query}`,
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        console.error('Serach users API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function createTrade( receiver_id, rec_cards, sen_cards) {
    try {
        const response = await axios.post(
            'api/trades',
            { receiver_id, rec_cards, sen_cards },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        console.error('Create trade API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getUserTrades(status) {
    try {
        const response = await axios.get(`api/trades/${status}`, { withCredentials: true });
        return response.data
    } catch (error) {
        console.error('Get Trade API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function changeTradeStatus(status, tradeId) {
    try {
        const response = await axios.patch(
            `api/trades`,
            { status, tradeId },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.error('Get Trade API error:', error.response ? error.response.data : error.message);
        throw error;
    }
}