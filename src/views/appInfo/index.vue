<template>
         <div class="someTips">
        <!-- <el-row>
            <el-button :plain="true">success</el-button>
            <el-button :plain="true" @click="open3">warning</el-button>
            <el-button :plain="true" @click="open1">message</el-button>
            <el-button :plain="true" @click="open4">error</el-button>
        </el-row> -->
        <!-- <ul>
            <li>
                aaa
            </li>
        </ul> -->
        <div>
            <h3>已经实现了的</h3>
        </div>
        <div>
            <ul>
                <li>
                    前台转后台数据加密传输
                </li>
                <li>
                    用户注册，登录，修改密码，好友添加，文本聊天，局域网内视频通话等等
                </li>
                <li>
                    头像随机生成（云服务器带宽小，没办法，CDN懒得搞了）
                </li>
                <li>
                    反馈信息提交
                </li>
            </ul>
        </div>
    </div>
    <div class="someTips2">
        <!-- <el-row>
            <el-button :plain="true">success</el-button>
            <el-button :plain="true" @click="open3">warning</el-button>
            <el-button :plain="true" @click="open1">message</el-button>
            <el-button :plain="true" @click="open4">error</el-button>
        </el-row> -->
        <h3>预计以后会实现的</h3>
        <div>
            <ul>
                <li>
                    前台页面调整，美化，特别是聊天记录页面的修改
                </li>
                <li>
                    避免同时登录，实现登录冲突下线功能
                </li>
                <li>
                    域名目前还在审核，等通过后再申请https，然后部署测试公网视频通话
                </li>
                <li>
                    后台转前台加密传输，选一种合适的加密方式，同时前台也改下
                </li>
                <li>
                    密码暗文保存，这个其实主要是懒的做，额
                </li>
                <li>
                    redis缓存处理短信息，如聊天记录、token、jwt
                </li>
                <li>
                    修改前台样式，或者vue3转React
                </li>
                <li>
                    根据用户反馈改bug
                </li>
                <li>
                    用go语言实现下后端
                </li>
            </ul>
        </div>
    </div>
   
    <div class="appInfo">
        <div>
            <el-space direction="vertical">
                <el-text>
                    <el-icon>
                        <Expand />
                    </el-icon>
                    点击下方按钮获取对开发者的随机评价
                </el-text>

                <el-text>
                    <el-button :plain="true" @click="open">你觉得软件开发者怎么样呢？</el-button>
                </el-text>
                <el-row>
                    <!-- <el-button :plain="true" >success</el-button>
                <el-button :plain="true" @click="open3">warning</el-button>
                <el-button :plain="true" @click="open1">message</el-button>
                <el-button :plain="true" @click="open4">error</el-button> -->
                </el-row>
                <el-row>

                </el-row>
            </el-space>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { Bell, ElementPlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { random, reject } from 'lodash';
import { cristic } from '../../api/cristic'
import { reactive, ref } from 'vue'
import useUserStore from '../../store/modules/user';
let messages = ["这个人挺厉害的，年纪轻轻就能写出这么年轻的程序，但不管怎么说，这还是太年轻了",
    "这个人一般般吧，其实也不太行，密码居然是明文保存在数据库的",
    "这个人挺菜的，视频对话都没有完善好，加密传输居然只实现了前端传后端，后端传前端都没有实现",
    "这个人太菜了，真的是，我大三下都会各种框架了，各种高并发，多线程，高可用，作者还在写curd，有时居然不熟练，还得去csdn，太拉了真的是"];
// let count = ref(0);
const userStore = useUserStore()
// const types = ['success','warning','error','message'] 
const messageInfo = ref('')

const open2 = () => {
    let index = Math.floor((Math.random() * 100) + 1) % 4;
    // console.log(count)

    ElMessage({
        message: messages[index],
        type: 'success',
        showClose: true,
        duration: 6000,
    })
    return index
}

const open = () => {
    let count = Number(localStorage.getItem("appInfoCount"))
    count += 1
    localStorage.setItem("appInfoCount", count.toString())
    // console.log(localStorage.getItem("appInfoCount"))
    if (Number(localStorage.getItem("appInfoCount")) < 10) {
        new Promise((resolve, reject) => {
            {
                let x = open2()
                messageInfo.value = messages[x]
                cristic({ text: messageInfo.value })
                resolve(x)
            }
        })

    } else if (Number(localStorage.getItem("appInfoCount")) > 12) {
        ElMessage({
            message: "重新登录即可获得10次随机评价机会哦。",
            type: 'success',
            showClose: true,
            duration: 5000,
        })
    }
    else {
        ElMessage({
            message: "再点服务器就存不下你的评价了啊啊啊啊啊",
            type: 'warning',
            showClose: true,
            duration: 5000,
        })
    }
}
</script>


<style scoped>
.appInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
}

.someTips{
    /* display: flex; */
    margin-left: 10%;
    margin-top: 2%;
    justify-content: center;
    align-items: center;
    height: 30%;
}
.someTips2{
    /* display: flex; */
    margin-left: 10%;
    margin-top: 2%;
    justify-content: center;
    align-items: center;
    height: 50%;
}
li{
    padding: 4px;
}
</style>