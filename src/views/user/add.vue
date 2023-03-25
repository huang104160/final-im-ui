<template>
    <div class="cent">
        <div class="cent-top"><el-input v-model="query.username" placeholder="请输入用户名"/><el-button @click="getUserTop">搜索</el-button></div>

        <div class="userlist-left">
            <el-scrollbar height="200px">
                <div class="left-list" v-if="userTop.id">
                    <img :src="userTop.image" class="left-list-img">
                    <span class="left-list-title">{{ userTop.username }}</span>
                    <el-button lass="left-list-bu" @click="add(userTop.id)">添加</el-button>
                </div>
            </el-scrollbar>
        </div>
        <el-divider />

        <div class="userlist-left">
            <h4>好友请求列表</h4>
            <div v-if="list.arr.length<=0">还没有人向你发起好友请求</div>
            <el-scrollbar height="300px">
                <div class="left-list" v-for="(item, index) in list.arr">
                    <img :src="item.image" class="left-list-img">
                    <span class="left-list-title">{{ item.username }}</span>
                    <div lass="left-list-bu">
                        <el-button @click="accept(item.id)">接受</el-button>
                        <el-button @click="rejectq(item.id)">拒绝</el-button>
                    </div>
                </div>
            </el-scrollbar>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getUserByUserName } from "../../api/user";
import { addApply, getfriends, agree, reject } from "../../api/apply";
import { ElMessage } from 'element-plus'
import socket from "../../utils/websocket";
import { useRouter } from 'vue-router';
const router = useRouter()
let query = reactive({
    username: ""
});
let userTop = reactive({});
let list = reactive({ arr: [] });
let flag = true

const check = (e) => {
    // console.log(e)
    for (let i = 0; i < list.arr.length; i++) {
        if (list.arr[i].uid == e) {
            flag = false
            break
        }
    }
    return flag
}
const add = (e) => {
    if (e) {
        if (check(e)) {
            addApply({ tid: e }).then(res => {
                if (res) {
                    ElMessage({
                        message: '成功发送请求',
                        type: 'success',
                    })
                }
            })
        } else {
            ElMessage({
                message: '对方已经是你的好友了',
                type: 'warning',
            })
        }
    }
}

const accept = (e) => {

    agree({ fid: e }).then(res => {
        ElMessage({
            message: '接受请求',
            type: 'success',
        })
        getfriends().then(res => {
            list.arr = res.data
        }).then(() => {
            router.go(0)
        })
    })

}

const rejectq = (e) => {
    reject({ fid: e }).then(res => {
        ElMessage({
            message: '拒绝请求',
            type: 'info',
        })
    })
}

const getUserTop = () => {
    getUserByUserName(query).then(res => {
        if (res.data) {
            userTop.id = res.data.id;
            userTop.username = res.data.username;
            userTop.image = res.data.image;
        }
    })
}

onMounted(() => {
    getfriends().then(res => {
        list.arr = res.data
    })
})
</script>

<style scoped>
.cent {

    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.cent-top {
    display: flex;
}

.userlist-left {
    display: flex;
    flex-direction: column;
}



.left-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-template-areas: 'a b c'
        'a b c';
    justify-items: center;
    align-items: center;
    margin-top: 10px;
}

.left-list-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    grid-area: a
}

.left-list-title {
    grid-area: b
}
</style>
