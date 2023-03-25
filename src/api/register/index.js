import request from '../../utils/request.js'

export function register(data) {
    return request({
        url: '/register',
        method: 'post',
        data:data
    })
}
