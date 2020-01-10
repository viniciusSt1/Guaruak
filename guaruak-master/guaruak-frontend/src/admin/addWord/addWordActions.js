import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';

const initialValues = { word: "", language: "guarani", translation: "" };
const baseUrl = 'http://localhost:3001';

export function init() {
    return initialize('addWordForm', initialValues);
}

export function create(values, audio){

    return dispatch => {
        axios.post(`${baseUrl}/dictionary/`, { ...values, audio })
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.');
            })
            .catch(err => {
                toastr.error('Erro', err.response.data.error);
            });
    }
}