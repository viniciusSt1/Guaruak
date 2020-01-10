import { toastr } from 'react-redux-toastr';
import axios from 'axios';

const base_url = 'http://localhost:3001/admin';

export function login(values) {
    return submit(values, `${base_url}/`);
}

export function signup(values) {
    return submit(values, `${base_url}/registrar`);
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if(resp.data.error){
                    toastr.error('Erro', resp.data.error);
                }else{
                    dispatch({ type: 'USER_FETCHED', payload: resp.data });
                }
            })
            .catch(error => {
                toastr.error('Erro', error.response ? error.response.data.error : 'Erro');
            });
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false };
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${base_url}/validateToken`, { token: `Bearer ${token}` })
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }));
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false });
        }
    }
}