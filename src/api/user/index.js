import request from '../../utils/request.js'

export function getUser() {
    return request({
        url: '/user',
        method: 'get',
    })
}


export function getUserByUserName(data) {
    return request({
        url: '/user/getUserByUserName',
        method: 'get',
        params:data,
    })
}

export function getUserByUserId(data){
    return request({
        url: '/user/getUserByUserId',
        method: 'get',
        params: data,
    })
}
