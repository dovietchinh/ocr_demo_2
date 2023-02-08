import { makeGet, makePost, makePut, makePatch, makeDelete } from './HTTPResource'

export const getListModelApi = async (params) => {
    let res = await makeGet({
        url: '/api/v1/models/list_models',
        ...params
    })
    return res.data
}

