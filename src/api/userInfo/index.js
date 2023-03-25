import request from '../../utils/request.js'

// 用户密码重置
export function updateUserPwd(uid,oldPassword, newPassword) {
    const data = {
        uid,
        oldPassword,
        newPassword,
    }
    return request({
        url: '/userInfo/updatePwd',
        method: 'put',
        params: data
    })
}

