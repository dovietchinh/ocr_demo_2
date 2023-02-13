import { makeGet, makePost, makePut, makePatch, makeDelete } from './HTTPResource'

export const getListModelApi = async (params) => {
    let res = await makeGet({
        url: '/api/v1/models/list_models',
        ...params
    })
    return res.data
}

export const getModelStatusApi = async (params) => {
    let res = await makePost({
        url: '/api/v1/models/get_status',
        data: params
    })
    return res.data
}

export const inferenceImgApi = async (params) => {
    let res = await makePost({
        url: '/api/v1/models/inference_img',
        data: params
    })
    return res.data
}


export const startTrainingApi = async (params) => {
    let res = await makePost({
        url: '/api/v1/models/start_training',
        data: params
    })
    return res.data
}

export const deleteModelApi = async (params) => {
    let res = await makePost({
        url: '/api/v1/models/delete_model',
        data: params
    })
    return res.data
}

export const activeModelApi = async (params) => {
    let res = await makePost({
        url: '/api/v1/models/activate_model',
        data: params
    })
    return res.data
}
export const deactiveModelApi = async (params) => {
    let res = await makePost({
        url: '/api/v1/models/deactivate_model',
        data: params
    })
    return res.data
}