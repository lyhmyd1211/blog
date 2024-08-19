<script  lang='ts'>
import { defineComponent, ref } from 'vue'
import ArticleHead from '@/components/ArticleHead.vue';
import FixedButton from '@/components/FixedButton.vue';
export default defineComponent({
  components: {
    ArticleHead,
    FixedButton
  },
  props: ['title'],
  setup() {
    // const title = ref<string>('')
  }
})
</script>
<template>
  <div class="content-main">
    <div class="heads">
      <div class="title">{{ title }}</div>
    </div>
    <div class="content-center">
      <slot></slot>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.content-main {
  position: relative;
  background-color: #ddd;
  height: 100vh;
  .heads {
    text-align: center;
    height: 150px;
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
      margin: 50px auto 10px auto;
    }
  }
  .content-center {
    min-height: 750px;
    width: 1100px;
    margin: auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>