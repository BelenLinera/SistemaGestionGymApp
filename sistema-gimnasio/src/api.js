import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7224',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;