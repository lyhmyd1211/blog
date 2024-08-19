<script  lang='ts'>
import { defineComponent, onMounted, watch } from 'vue'
import Dotline from "@/utils/line";
export default defineComponent({
  props: ['option'],
  setup(prop) {
    // const { option } = toRefs(prop)
    watch(() => [prop.option.ch, prop.option.cw, prop.option.ds], (cur, prev) => {
      console.log('cur', cur);
      const dotline = new Dotline({ ...prop.option, ch: cur[0], cw: cur[1], ds: cur[2] }).start();
    })
    onMounted(() => {
      const dotline = new Dotline(prop.option).start();
    })
  }
})
</script>
<template>
  <canvas id="J_dotLine"></canvas>
</template>
<style lang='scss' scoped>
#J_dotLine {
  position: absolute;
  z-index: 1;
}
</style>