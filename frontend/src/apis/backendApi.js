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
        console.log('User created successfully:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
}