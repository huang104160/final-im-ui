<template>
    <div class="chat">
        <h3 align="center">{{ title }}</h3>
        <el-scrollbar ref="scrollbarRef">
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
                <el-button type="primary" @click="call">视频通话</el-button>
                <hr>
                <el-button type="primary" @click="send">发送文本</el-button>
            </el-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref,  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from "vue-router";
import { list, addMessage, delMessage } from "../../api/message";
import { websocketStore } from "../../store/websokcet.js";
import { ElScrollbar as ElScrollbarType } from 'element-plus'
import socket from "../../utils/websocket";
// import { nextTick } from 'process';
import { nextTick } from 'vue';
let route = useRoute();

const scrollbarRef = ref<InstanceType<typeof ElScrollbarType>>()
const innerRef = ref<HTMLDivElement>()
// const   scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const query = reactive({ to: '', pageNum: 1, pageSize: 100 })
let total = ref('');
let arr = reactive({ list: [] });
let text = ref('');
const web = websocketStore();
const title = ref('聊天');
const router = useRouter();



web.$subscribe((mutations, state) => {
    let msg = JSON.parse(state.msg);
    // console.log("hhh")
    if (msg.type == 2) {
        getlist();
    }
    nextTick(()=>{
        getlist()
    })
    // console.log("zhixll")
    // scrollbarRef.value!.setScrollTop(arr.list.length*200)
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
            // getlist();  //每次发数据过去你都查一次数据库？不行的哦。这里可以优化。
            getlist();  //每次发数据过去你都查一次数据库？不行的哦。这里可以优化。
            console.log("第一次")
            // console.log(query.to)
        }).then(() => {
            // console.log("hhh")
            socket.send({ from: localStorage.getItem("im-userid"), to: query.to, message: text.value, type: 2 })
            text.value = ''
            // console.log(scrollbarRef.value)
            // if (scrollbarRef) {
            //     // console.log(12342352354)
            //     scrollbarRef.value!.setScrollTop(arr.list.length * 200)
            // }
            getlist();  //每次发数据过去你都查一次数据库？不行的哦。这里可以优化。
            
            //这里我不明白为什么得要两个getlist才能实现发过去消息立刻显示，怪怪的
            console.log("第二次")

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
        if (arr.list.length >= 100) {
            ElMessage.error("聊天记录已经达到100条，无法继续啦，请注册账号重来吧")
        }
        // console.log(scrollbarRef.value)
        if (scrollbarRef) {
            // console.log(12342352354)
            scrollbarRef.value!.setScrollTop(arr.list.length * 200)
        }
        // scrollbarRef.value!.setScrollTop(100 * 100)
        // scrollbarRef.value!.setScrollTop(arr.list.length * 200)
    }
    )
}




onMounted(() => {
    getuid();
    loginWebsocket();
    // scrollbarRef.value!.setScrollTop(arr.list.length*200)
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
    height: 70px;
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
