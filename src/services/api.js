import { makeGet, makePost, makePut, makePatch, makeDelete } from './HTTPResource'

export const getListModelApi = async (params) => {
    console.log('getListModelApi called!')
    let res = await makeGet({
        url: '/listModel',
        ...params
    })
    return res.data
}

