import axios from 'axios';
import { GET_STORED_ACCESS_TOKEN, } from '../util/storage';

export const BASE_URL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

const authInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

axiosInstance.interceptors.request.use(config => {
    config.headers['x-access-token'] = GET_STORED_ACCESS_TOKEN
    return config;
});

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async function (error) {

        const status = error?.response?.status || null;
        const data = error?.response?.data || {};

        if (status !== 401) {
            return Promise.reject(data);
        }

        // const { config } = error
        if (status === 401) {
            // wipe_login_data();

            // return Promise.resolve(response);
        }
        return Promise.resolve(data);
    }
)

authInstance.interceptors.response.use(
    response => {
        return response;
    },
    async function (error) {

        const status = error?.response?.status || null;
        const data = error?.response?.data || {};

        if (status !== 401) {
            return Promise.reject(data);
        }

        // const { config } = error
        if (status === 401) {
            // wipe_login_data();

            // return Promise.resolve(response);
        }

        return Promise.resolve(data)
    }
)

export {
    axiosInstance,
    authInstance
};