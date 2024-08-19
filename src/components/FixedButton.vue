<script  lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          key: 'back-to-top',
          icon: '',
        }
      }
    }
  },
  setup(props) {
    const router = useRouter()
    const backPrev = () => {
      history.back()
      // router.push({ path: '/home' })
    }
    const back = () => {
      window.scrollTo({
        top: isTop.value ? 0 : (document.body.clientHeight - document.documentElement.clientHeight),
        behavior: 'smooth'
      })
    }
    const isTop = ref<Boolean>(false)
    const getscroll = () => {
      window.scrollTo({
        top: 0
      })
      window.addEventListener('scroll', () => {
        isTop.value = document.documentElement.scrollTop > 350
      })
    }
    onMounted(() => getscroll())
    return { isTop, backPrev, back }
  }

})
</script>
<template>
  <div class="fixed-box">
    <el-tooltip class="item" effect="dark" content="返回上一页" placement="left">
      <div class="icon-box" @click="backPrev">
        <el-icon class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
            <path
              fill="currentColor"
              d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
            />
          </svg>
        </el-icon>
      </div>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" :content="isTop ? '返回顶部' : '跳至底部'" placement="left">
      <div class="icon-box" @click="back">
        <el-icon class="icon" :class="isTop ? 'top' : 'bottom'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
            <path
              fill="currentColor"
              d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
            />
          </svg>
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<style lang='scss' scoped>
$myFont: 180deg;
.fixed-box {
  position: fixed;
  right: 5px;
  bottom: 50px;
  pointer-events: all;
  z-index: 1000;
  .icon-box {
    width: 35px;
    height: 35px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // text-indent: -1px;
    color: #929090;
    &:hover {
      .icon {
        &.top {
          animation: cuteweave1 1s ease-in-out;
        }
        // &.bottom {
        //   animation: cuteweave 1s ease-in-out;
        // }
        animation: cuteweave 1s ease-in-out;
      }
    }
    &.item {
      margin-bottom: 10px;
    }
  }
  .icon {
    font-size: 25px;
    &.top {
      transform: rotate(180deg);
      transition: transform 1s ease-out;
    }
    &.bottom {
      transform: rotate(0);
      transition: transform 1s ease-out;
    }
  }
}

@keyframes cuteweave {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(30deg);
  }
  70% {
    transform: rotate(-20deg);
  }
  80% {
    transform: rotate(20deg);
  }
  90% {
    transform: rotate(-10deg);
  }
  95% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0);
  }
}
@keyframes cuteweave1 {
  0% {
    transform: rotate(0+180deg);
  }
  25% {
    transform: rotate(-30deg+180deg);
  }
  50% {
    transform: rotate(30deg+180deg);
  }
  70% {
    transform: rotate(-20deg+180deg);
  }
  80% {
    transform: rotate(20deg+180deg);
  }
  90% {
    transform: rotate(-10deg+180deg);
  }
  95% {
    transform: rotate(10deg+180deg);
  }

  100% {
    transform: rotate(180deg);
  }
}
</style>