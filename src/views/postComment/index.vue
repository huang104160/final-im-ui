<template>
    <div class="comment">
        <el-space direction="vertical">
            <el-row>
                <el-col >
                    <el-text truncated>请在下方文本框中输入你任何想对作者说的话吧</el-text>
                </el-col>
            </el-row>
            <hr>
            <div >
                <el-input  v-model="textarea" maxlength="150" placeholder="Please input" :rows="7" show-word-limit type="textarea" />
            </div>
            <div>
                <el-button type="primary" :icon="Edit" @click="submit">提交</el-button>
            </div>
        </el-space>
    </div>
    <div style="padding-left: 5%;">
        <ul>
            <li>
                <b>
                上手敲代码吧，因为这看似简单的东西，实际上要考虑的事情还是挺多的
                </b>
            </li>
            <li>
                <b>项目参考</b> <a href="https://www.bilibili.com/video/BV12v4y1j7dW" target="_blank"><b>哔哩哔哩视频链接</b></a>
            </li>
            <li>
                十分感谢哔哩哔哩up    <b>叫我木杉大人</b>
            </li>
            <li>
                <a href="https://github.com/huang104160/test-im" target="_blank"> <b>本项目开源地址</b> </a>
            </li>
        </ul>
        
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { cristic } from '../../api/cristic'
import { Edit } from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
const textarea = ref('')

const submit = () => {
    if (textarea.value.length <= 0) {
        ElMessage.error('请填写文字，切勿提交空串，走后门的话，后端也会校验的哦')
    } else {

        new Promise((resolve, reject) => {
            cristic({ text: textarea.value }).then(res => {
                ElMessage.success('提交成功！作者看到你的反馈一定会抓紧时间修复完善的。。')
                textarea.value = ''
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    }
}
</script>

<style scoped>
.comment {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
}

li{
    padding: 4px;
}
</style>


  