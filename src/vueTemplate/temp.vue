<script setup lang="ts">
import { dayjs } from 'element-plus';
import { ElScrollbar as ElScrollbarType } from 'element-plus';
import { reactive, ref } from 'vue'

const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbarType>>()
const items = ref<string[]>([])
 
const handleClick = () => {
  items.value.push(dayjs().format('YYYY-MM-DD HH:mm:ss SSS'));
  nextTick(() => {
    if (innerRef.value!.clientHeight > 200) {
      scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
    }
  })
}
 
</script>
<template>
  <el-scrollbar height="200px" ref="scrollbarRef" always>
    <div ref="innerRef">
      <p v-for="item in items" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </div>
  </el-scrollbar>
  <el-button type="primary" @click="handleClick">add</el-button>
</template>
 
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #409eff;
}
</style>