import request from '../../utils/request.js'

export function list(data) {
    return request({
        url: '/message/list',
        method: 'get',
        params:data,
    })
}


export function addMessage(data) {
    return request({
        url: '/message/add',
        method: 'post',
        data:data,
    })
}


export function delMessage(data) {
    return request({
        url: '/message/del',
        method: 'post',
        data:data,
    })
}