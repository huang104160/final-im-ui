import axios from 'axios'
import { ElMessage } from 'element-plus'
import { encrypt, decrypt } from './crypt/index'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://localhost:28080',
    // 超时
    timeout: 10000,
})

// export const createAPI = (url, method, data) => {
//     let config = {};
//     if (method === "get") {
//         config.params = data;
//     } else {
//         config.data = data;
//     }
//     config.headers = {
//         "Content-Type": "application/json;charset=UTF-8"
//     };
//     return instance({
//         url,
//         method,
//         ...config
//     });
// };
//请求拦截
service.interceptors.request.use((config) => {
    const token = localStorage.getItem("mushan-token");
    // console.log(token)
    if (token) {
        config.headers['Authorization'] = token
    }
    config.headers['Content-Type'] = "application/json;charset=UTF-8"
    config.data = encrypt(JSON.stringify(config.data))
    return config;
}, (error) => {
    return Promise.reject(error);
})


service.interceptors.response.use((response) => {
    // response.data = decrypt(response.data)
    let data = response.data;
    if (data.errno == 0) {
        return response.data
    } else if (response.data.errno == 501) {
        ElMessage.error("请重新登录！！！")
        window.location.href = "/login"
    } else if (response.data.errno == 600) {
        ElMessage.error("请输入数据")
    }else {
        ElMessage.error(response.data.errmsg)
    }
}, (error) => {
    return Promise.reject(error)
})

export default service
