<template>
    <div class="userInfo">
        <div>
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
                <el-form-item label="用户头像">
                    <div class="userhead-context">
                        <img :src="formLabelAlign.image" class="userhead-img">
                    </div>
                </el-form-item>
                <el-form-item label="用户id">
                    <el-input v-model="formLabelAlign.uid" />
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="formLabelAlign.username" />
                </el-form-item>
            </el-form>
            <!-- <div class="change-pwd">
                <el-button type="primary" plain >Primary</el-button>
            </div> -->
            <div class="change-pwd">
                <el-button text @click="dialogFormVisible = true">
                    修改密码
                </el-button>

                <el-dialog width="500px" v-model="dialogFormVisible" title="修改密码">
                    <el-form  ref="ruleFormRef" :model="form" :rules="rules">
                        <!-- <el-form-item label="原密码" :label-width="formLabelWidth">
                            <el-input v-model="form.oldpwd" type="password"  clearable show-password/>
                        </el-form-item>
                        <el-form-item label="新密码" :label-width="formLabelWidth">
                            <el-input v-model="form.newpwd" type="password"  clearable show-password/>
                        </el-form-item>
                        <el-form-item label="新密码确认" :label-width="formLabelWidth">
                            <el-input v-model="form.newpwd2" type="password" clearable show-password />
                        </el-form-item> -->
                        <div>
                            <el-form-item prop="oldpwd" label="原密码" :label-width="formLabelWidth">
                                <el-input type="password" v-model="form.oldpwd" clearable show-password>
                                    <template #prefix>
                                        <el-icon>
                                            <Lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="newpwd" label="新密码" :label-width="formLabelWidth">
                                <el-input type="password" v-model="form.newpwd" clearable show-password>
                                    <template #prefix>
                                        <el-icon>
                                            <Lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="newpwd2" label="新密码确认" :label-width="formLabelWidth">
                                <el-input type="password" v-model="form.newpwd2" clearable show-password>
                                    <template #prefix>
                                        <el-icon>
                                            <Lock />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false, load = false">取消</el-button>
                            <el-button :loading="load" type="primary" @click="submitForm(ruleFormRef)">确认</el-button>

                            <!-- <el-button type="primary" @click="dialogFormVisible = false">
                                确认
                            </el-button> -->
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserByUserId } from '../../api/user';
import { onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { updateUserPwd } from '../../api/userInfo/index'
import imageT from '../../assets/head.jpg'
import useUserStore from '../../store/modules/user';
import { ElMessage } from 'element-plus'
import { promiseTimeout } from '@vueuse/shared';
const userStore = useUserStore()
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const load = ref(false);
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

// const query = reactive({
//     uid:'',
// })
// import userAvatar from "./components/userAvatar.vue";
// import resetPwd from "./components/resetPwd.vue";
const labelPosition = ref('right')
const formLabelAlign = reactive({
    username: '',
    uid: '',
    image: '',
})

const form = reactive({
    oldpwd: '',
    newpwd: '',
    newpwd2: '',
})


let route = useRoute();
onMounted(() => {
    getUserByUserId(route.params).then(res => {
        // console.log(res)
        formLabelAlign.username = res.data.username
        formLabelAlign.uid = res.data.id
        formLabelAlign.image = res.data.image == null ? imageT : res.data.image
    })
})

// function getUser(){
//     formLabelAlign.username = userStore.name
//     formLabelAlign.uid = userStore.uid
//     formLabelAlign.image = userStore.avatar
//     console.log(userStore)
// }
// getUser()
const rules = reactive<FormRules>({
    oldpwd: [
        { required: true, message: '旧密码不能为空', trigger: 'blur' },
    ],
    newpwd: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
    ],
    newpwd2: [
        { required: true, message: '新密码确认不能为空', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (form.newpwd.valueOf() == form.newpwd2.valueOf()) {
                load.value = true
                new Promise((resolve, reject) => {
                    updateUserPwd(formLabelAlign.uid, form.oldpwd, form.newpwd).then(res => {
                        // console.log(res)
                        load.value = false
                        if(res==undefined){
                        }else{
                            dialogFormVisible.value = false
                            ElMessage.success('密码成功修改，请重新登录')
                            userStore.logOut()
                            router.replace("/login");
                        }
                        resolve(res)
                        // userStore.logOut()
                        // ElMessage.success('密码成功修改，请重新登录')
                        // // router.push({path:'login',query:{uid:formLabelAlign.uid}})
                        // 
                        // load.value = false
                        // router.replace("/login");
                    }).catch(error => {
                        // console.log(error)
                        reject()
                    })
                })
                // new Promise((resolve, reject) => {
                //     updateUserPwd(formLabelAlign.uid, form.oldpwd, form.newpwd).then(res => {
                //         console.log(res)
                //         resolve(res)
                //     }).catch(error => {
                //         reject(error)
                //     })
                // })

            } else {
                ElMessage.error('两次新密码输入不一致，请重新输入')
                form.newpwd = ''
                form.newpwd2 = ''
            }
        } else {
            ElMessage.error('请填写数据')
        }
    })
}
</script>

<style scoped>
.userInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.userhead-img {
    border-radius: 5px;
    width: 50px;
    height: 50px;
}

.change-pwd {
    text-align: center;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}



.dialog-footer button:first-child {
    margin-right: 10px;
}


</style>
