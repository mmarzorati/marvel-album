import config from '../config.json';
import axios from "axios";

export async function getCharacters( limit, offset ) {
    try {
        const response = await axios.get(config.marvelUrl + '/characters', {
        params: {
            ts: 1,
            apikey: config.publicKey,
            hash: config.hash,
            limit: limit,
            offset: offset
        }
    })
        return response.data.data
    } catch (error) {
        console.error('Error calling Marvel Characters API:', error.response ? error.response.data : error.message);
        throw error;
    }
}