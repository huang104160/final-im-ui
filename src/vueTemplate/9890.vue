<template>
    <div class="chat">
        <h3 align="center">{{ title }}</h3>
        <el-scrollbar ref="scrollbarRef" always @scroll="scroll">
            <div ref="innerRef" class="chat-list" v-for="(item, index) in arr.list" :key="index">
                <div :class="[item.from == query.to ? 'chat-list-left' : 'chat-list-right']">
                    <img :src="item.image" class="list-img">
                    <div :class="item.from == query.to ? 'left-msg' : 'right-msg'">{{ item.content }}</div>
                </div>
            </div>
        </el-scrollbar>
        <div class="chat-boom">
            <el-input class="textarea" type="textarea" :rows="7" placeholder="Please input" v-model="text" />
            <el-space direction="vertical">
                <el-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
                    <el-button type="warning" disabled>视频通话</el-button>
                </el-tooltip>
                <!-- <el-button type="primary" @click="call" >视频通话</el-button> -->
                <hr>
                <el-button type="primary" @click="send">发送文本</el-button>

            </el-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref, onBeforeUnmount, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from "vue-router";
import { list, addMessage, delMessage } from "../api/message";
import { websocketStore } from "../store/websokcet.js";
import { ElScrollbar as ElScrollbarType } from 'element-plus'
import socket from "../utils/websocket";
import { Brush } from '@element-plus/icons-vue';
import { nextTick } from 'vue'

// ref['scrollbarRef'].wrap.scrollTop = ref['scrollbarRef'].wrap.scrollHeight;

let route = useRoute();
// const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbarType>>()
const innerRef = ref<HTMLDivElement>()

const query = reactive({ to: '', pageNum: 1, pageSize: 100 })
let total = ref('');
let arr = reactive({ list: [] });
let text = ref('');
const web = websocketStore();
const title = ref('聊天记录');
const router = useRouter();




web.$subscribe((mutations, state) => {
    let msg = JSON.parse(state.msg);
    if (msg.type == 2) {
        getlist();
    }
});



const loginWebsocket = () => {
    Promise.resolve().then(() => {
        socket.init()
    }).then(() => {
        socket.send({ uid: localStorage.getItem("im-userid"), type: 1 })
    })
}
const send = () => {
    if (text.value) {
        addMessage({ to: query.to, content: text.value }).then(res => {
            getlist();  //每次发数据过去你都查一次数据库？不行的哦。这里可以优化。
        }).then(() => {
            socket.send({ from: localStorage.getItem("im-userid"), to: query.to, message: text.value, type: 2 })
            text.value = ''
            // scrollbarRef.value!.setScrollTop(innerRef.value!.scrollHeight)
            // scrollbarRef.value!.scrollTo({ top: innerRef.value!.scrollHeight, behavior: 'smooth' });
        })
    } else {
    }
}
const call = () => {
    router.push({ path: "call", query: { from: query.to, type: 1 } }) // type 1 为开始请求通话  2 为回应通话
}



onBeforeRouteUpdate((to) => {
    query.to = to.query.uid
    getlist();
})

const getuid = () => {
    query.to = route.query.uid
    getlist();
}





const getlist = () => {
    list(query).then(res => {
        let data = res.data;
        arr.list = data.list;
        // scrollbarRef.value!.setScrollTop(100 * 100)
        // if (arr.list.length >= 100) {
        //     ElMessage.error("聊天记录已经达到100条，请删除")
        // }
    }
    )
}




onMounted(() => {
    getuid();
    loginWebsocket();
})



</script>

<style scoped>
.chat {
    background: rgb(247, 247, 247);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.chat-boom {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.list-img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
}

.chat-list {
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    height: 60px;
}

.chat-list-left {
    padding: 20px;
    display: flex;
    flex-direction: row;
}

.chat-list-right {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
}

.left-msg {
    margin-left: 5px;
    background-color: #ffffff;
    font-size: 15px;
    border-radius: 6px;
    max-width: 200px;
    word-wrap: break-word
}

.right-msg {
    margin-right: 7px;
    background-color: #ffffff;
    font-size: 15px;
    border-radius: 6px;
    max-width: 200px;
    word-wrap: break-word
}
</style>
