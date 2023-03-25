import request from '../../utils/request.js'
import { useRouter } from 'vue-router'
// import useUserStore from '../../store/modules/user.js'
const router = useRouter()
// const userStore = useUserStore()


export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data:data
    })
}



export function logout() {
    localStorage.removeItem("mushan-token")
    localStorage.removeItem("im-userid")
}