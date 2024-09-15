import config from '../config.json';
import axios from "axios";

export async function getAllCharacters() {
    try {
        const response = await axios.get(config.marvelUrl + '/characters', {
        params: {
            ts: 1,
            apikey: config.publicKey,
            hash: config.hash
        }
    })
        return response
    } catch (error) {
    console.error('Error calling Marvel Characters API:', error);
    }
}