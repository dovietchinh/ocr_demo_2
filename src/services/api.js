import { makeGet, makePost, makePut, makePatch, makeDelete } from './HTTPResource'

export const getListModelApi = async (params) => {
    let res = await makeGet({
        url: '/listModel',
        ...params
    })
    return res.data
}

