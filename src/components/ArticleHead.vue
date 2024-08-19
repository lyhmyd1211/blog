<script  lang='ts'>
import { defineComponent, onMounted } from 'vue'
import day from 'dayjs'
export default defineComponent({
  props: ['articleData'],
  setup(prop) {
    onMounted(() => {
      console.log('object', prop.articleData);
    })
    return { day }
  }
})
</script>
<template>
  <div class="head-title">
    <div class="title">{{ articleData.title }}</div>
    <div class="time com-mg">
      <span>更新于：{{ day(articleData.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      <span>发表于：{{ day(articleData.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>
    <div class="view com-mg">
      <span>阅读：{{ articleData.viewTimes }}</span>
      <!-- <span>评论：{{ articleData.viewTimes }}</span> -->
    </div>
    <div class="tag com-mg">
      <el-tag
        v-for="item in articleData.types"
        :key="item.label"
        type="success"
        effect="dark"
      >{{ item.label }}</el-tag>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.head-title {
  position: relative;
  text-align: center;
  height: 350px;
  display: table-cell;
  width: 100vw;
  background: rgb(197, 197, 197);
  font-family: "Open Sans", sans-serif;
  color: #fff;
  span {
    margin-right: 10px;
  }
  .title {
    font-size: 2em;
    font-weight: bold;
    position: relative;
    width: 80%;
    margin: 120px auto 10px auto;
  }
  .com-mg {
    margin: 10px 0;
  }
}
</style>