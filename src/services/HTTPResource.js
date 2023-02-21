import axios from 'axios';
import { ACCESS_TOKEN, BASE_URL, EVENT_LOADING } from '~/utils/constants';
const UNAUTHORIZED = 401;
const TOKEN_EXPIRED = 403;
const BAD_REQUEST = 400;
const moveToLogin = () => {
    window.location.href = '/logout';
};

const getToken = () => localStorage.getItem(ACCESS_TOKEN) 


let instance = null 

const init = () => {
    instance = axios.create({
        baseURL :  BASE_URL,
        timeout: 100 * 1000
    })
    instance.interceptors.request.use(
        async (config) => {
            if (config.url && config.url.indexOf('http')<0){
                config.url = config.baseURL + config.url;
            }
            config.headers = {
                ...config.headers,
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + getToken()
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    
    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (axios.isCancel(error)) {
                const newError = new Error('canceled');
                return Promise.reject(newError);
            }
            if (error.response && error.response.config && error.response.config.noAuth) {
                //
            } else if (error.response && error.response.code === 'ECONNABORTED') {
            } else {
            switch (error?.response?.status) {
                case UNAUTHORIZED:
                    if (!error.response.config.noAuth) moveToLogin();
                    break;
                case TOKEN_EXPIRED:
                    if (!error.response.config.noAuth) moveToLogin();
                    break;
                default:
                    break;
            }
            }
            return Promise.reject(error);
        }
    )
}

const getInstance = () => {
    if(!instance) init()
    return instance
}

const makeApi = (requestConfig) => {
    const controller = new AbortController();
    const promise = getInstance()(
        {
          ...requestConfig,
          signal: controller.signal
        }
    );
    return {
        promise,
        controller
    }
}


const makeGet = (request) => {
    return makeApi({
        ...request,
        method: 'get'
    }).promise
}

const makePost = (request) => {
    return makeApi({
        ...request,
        method: 'post'
    }).promise
}

const makePut = (request) => {
    return makeApi({
        ...request,
        method: 'put'
    }).promise
}

const makePatch = (request) => {
    return makeApi({
        ...request,
        method: 'patch'
    }).promise
}

const makeDelete = (request) => {
    return makeApi({
        ...request,
        method: 'delete'
    }).promise
    
}

export {
    makeGet,
    makePost,
    makePut,
    makePatch,
    makeDelete
}

// export default instance