import request from '../../utils/request.js'



export function cristic(data) {
    return request({
        url: '/return/cristic',
        method: 'post',
        data:data
    })
}