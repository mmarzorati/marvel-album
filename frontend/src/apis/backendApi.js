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
        console.error('Error creating user:', error.response ? error.response.data : error.message);
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
        console.error('Log in error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getUserInfo() {
    try {
        const response = await axios.get('api/user', {}, {withCredentials: true});
        return response.data
    } catch (error) {
        console.error('Log in error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getUserCards() {
    try {
        const response = await axios.get('api/users/cards', {withCredentials: true});
        return response.data
    } catch (error) {
        console.error('Log in error:', error.response ? error.response.data : error.message);
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
        console.error('Log in error:', error.response ? error.response.data : error.message);
        throw error;
    }
}