import axios from "axios";

// const BASE_URL = 'http://127.0.0.1:8000'
const BASE_URL = 'https://tk2-server.herokuapp.com'


export async function _getStaff() {
    try {
        const response = await axios.get(BASE_URL + '/api/staff');
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}

export async function _createStaff(data) {
    try {
        const response = await axios.post(BASE_URL + '/api/staff', data);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}

export async function _updateStaff(data) {
    try {
        const newData = { ...data, _method: 'put' }
        const response = await axios.post(BASE_URL + '/api/staff/' + data.id, newData);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}

export async function _deleteStaff(data) {
    try {
        const newData = { _method: 'delete' }
        const response = await axios.post(BASE_URL + '/api/staff/' + data.id, newData);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}
