// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from "pinia";
import defAva from '../../assets/head.jpg'
import { login, logout } from '../../api/login/index'
import { getUser } from "../../api/user/index";
import { ElMessage } from 'element-plus'


const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      name: '',
      avatar: '',
      uid: '',
      appInfoCount:0,
    }),
    actions: {
      // 登录
      login(userInfo) {
        return new Promise((resolve, reject) => {
          login(userInfo).then(res => {
            // console.log(res==undefined)
            if(res==undefined){
            }else{
              localStorage.setItem("mushan-token", res.data);
              localStorage.setItem("appInfoCount", '0');
            }
            resolve()
          }).catch(error => {
            // ElMessage.error('请填写数据')
            reject(error)
          })
        })
      },

      // 退出系统
      logOut() {
        return logout()
      },

      getUserDetail() {
        return new Promise((resolve, reject) => {
          getUser().then(res => {
            // console.log(res)
            const avatar = res.data.image == null ? defAva : res.data.image
            this.avatar = avatar

            const uid =  res.data.id
            this.uid = uid

            const name = res.data.username
            this.name = name
            // url.value = res.data.image == null ? imageT : res.data.image
            // uid.value = res.data.id
            // console.log(res.data)       
            localStorage.setItem("im-userid", res.data.id)
          }).then(() => {
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })

export default useUserStore
