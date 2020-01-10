import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getWords = () => {
    const request = axios.get(`${baseUrl}/dictionary`);
    return {
        type: 'WORDS_FETCHED',
        payload: request
    };
}

export const sumSearch = () => {
    return {
        type: 'SUM_SEARCH'
    };
}

export const resetSearch = () => {
    return {
        type: 'RESET_SEARCH'
    };
}