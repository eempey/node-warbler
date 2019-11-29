import axios from 'axios';

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
        .then(response => {
            return resolve(response.data);
        })
        .catch(error => {
            return reject(error.response.data.error);
        })
    })
}