<template>
  <div class="userlist">

    <div class="userlist-left">
      <div>
          好友列表
      </div>
      <hr />
      <div>
        <table>
          <td style="padding-left: 10px;">头像</td>
          <td style="padding-left: 25px;">用户名</td>
        </table>
      </div>
      <hr />
      <el-scrollbar>
        <div class="left-list" v-for="(item, index) in list.arr" :class="{ 'left-list-bg': active == item.id }"
          @click="startCall(item)" :key="index">
          <img :src="item.image" class="left-list-img">
          <span class="left-list-title">{{ item.username }}</span>
        </div>
        <div v-if="list.arr.length <= 0">
          快去添加好友吧。。。
        </div>
      </el-scrollbar>
    </div>

    <div class="userlist-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*
ref和reactive是Vue3中用来实现数据响应式的API
一般情况下，ref定义基本数据类型，reactive定义引用数据类型
（我喜欢用它来定义对象，不用它定义数组，原因后面讲）
我理解的ref本质上是reactive的再封装
*/
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getlist } from "../../api/friend";

let list = reactive({ arr: [] });
const active = ref('');
const router = useRouter();

const startCall = (e) => {
  active.value = e.id  // 赋值 为了css
  router.push({ path: 'chat', query: { uid: e.id } })
}


onMounted(() => {
  getlist().then(res => {
    list.arr = res.data
  })
})

</script>

<style scoped>
.userlist {
  display: flex;
  height: 100%;
  width: 100%;
}

.userlist-left {
  padding-top: 15px;
  padding-left: 10px;
  flex: 1;
  border-right: #dbd6d6 1px solid;
  text-align: center;
}

.userlist-right {
  flex: 4;
}


.left-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas: 'a b'
    'a b';
  justify-items: center;
  align-items: center;
  margin-top: 10px;
}

.left-list-bg {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas: 'a b'
    'a b';
  justify-items: center;
  align-items: center;
  margin-top: 10px;

  background-color: #eaeaea;
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
