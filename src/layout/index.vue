<template>
    <div class="home">
        <div class="home-cont">
            <div class="home-cont-left">
                <div class="home-cont-left-top">
                    <!--  -->
                    <!-- <router-link tag="div" to="/userInfo" replace>
                        <img :src="url" class="home-cont-left-img">
                    </router-link> -->
                    <div style="margin-top: 20px;">
                        用户ID: {{ userStore.uid }}
                    </div>
                    <div style="margin-top: 20px;">
                        用户名: {{ userStore.name }}
                    </div>
                    <router-link tag="div" :to="'/userInfo/' + userStore.uid" replace>
                        <img :src="userStore.avatar" class="home-cont-left-img">
                    </router-link>
                    <router-link tag="div" to="/list" class="home-icon" replace>
                        <el-icon size="25" color="#9F9D99">
                            <ChatDotRound />
                        </el-icon>
                    </router-link>
                    <router-link tag="div" to="/add" class="home-icon">
                        <el-icon size="25" color="#9F9D99">
                            <User />
                        </el-icon>
                    </router-link>
                    <router-link tag="div" to="/appInfo" class="home-icon">
                        <el-icon size="25" color="#9F9D99">
                            <Promotion />
                        </el-icon>
                    </router-link>
                    <router-link tag="div" to="/postComment" class="home-icon">
                        <el-icon size="25" color="#9F9D99">
                            <Plus/>
                        </el-icon>
                    </router-link>
                </div>
                <div class="home-cont-left-boom">

                    <el-button text @click="logoutConfirm">
                        <el-icon size="25">
                            <SwitchButton />
                        </el-icon>退出登录
                    </el-button>
                </div>
            </div>
            <div class="home-cont-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useObjectUrl } from '@vueuse/core';
import useUserStore from '../store/modules/user';
import { useRouter } from 'vue-router'
const router = useRouter();
const url = ref('')
const userStore = useUserStore()
const details = () => {
    userStore.getUserDetail()
}

const logoutConfirm = () => {
    ElMessageBox.confirm(
        '您要退出当前登录吗？',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            // loginout()
            userStore.logOut()
            router.replace("/login");
            ElMessage({
                type: 'success',
                message: '成功退出登录',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '我反悔了',
            })
        })
}
onMounted(() => {
    details()
})


</script>

<style scoped>
.home {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home-cont {
    border-radius: 10px;
    width: 850px;
    height: 650px;
    background: #FFFFFF;
    display: flex;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.home-cont-left {
    flex: 1;
    border-right: 1px solid #eeeeee;
    background-color: rgb(247, 247, 247);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
}

.home-cont-left-boom {
    text-align: center;
}

.home-cont-right {
    flex: 9;
}

.home-cont-left-img {
    border-radius: 5px;
    margin-top: 20px;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
}

.home-cont-left-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
}

.home-icon {
    margin-top: 20px;
    cursor: pointer;
    flex: 1;
}

.router-link-active i {
    color: red;
}


</style>
