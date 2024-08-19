<script  lang='ts'>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const getMachineIp = () => { 
      let city = {};
      try {
        city = window.returnCitySN;
        console.log('city',city)
      } catch (e) {
        console.log(e);
      }
    }
    onMounted(()=>{
      getMachineIp()
    })
  }
})
</script>
<template>
  <div class="forecast-box">
    <img src="@/assets/images/location/changsha.jpg" class="city-img" />
  </div>
</template>
<style lang='scss' scoped>
.forecast-box {
  position: fixed;
  bottom: 0;
  left: 0;
  pointer-events: all;
  &:hover {
    opacity: 0;
  }
}
</style>  