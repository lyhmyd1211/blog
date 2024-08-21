<script  lang='ts'>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { getAllTime } from '@/api/menu'
// import { gsap } from "gsap";
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
// gsap.registerPlugin(MorphSVGPlugin);
let color = ['#ebedf0', '#40c463', '#30a14e', '#216e39']
export default defineComponent({
  setup() {


    const drawer = ref<Boolean>(false)

    const menuClick = () => {
      drawer.value = !drawer.value
    }
    const openClick = () => {
      // transitionFunc()
    }
    const closeClick = () => {
    }

    // const transitionFunc = () => {
    //   window.TweenLite.to("#shape1", {
    //     duration: 2,
    //     morphSVG: {
    //       shape: "#shape2",
    //       type: "rotational"
    //     }
    //   });
    // }

    const calendarVal = ref<Date>(new Date())
    const calendar = ref()
    const selectDate = (val: string) => {
      calendar.value.selectDate(val)
    }

    const allArticle = ref()
    const fetchData = () => {
      getAllTime().then(res => {
        allArticle.value = res.data
      })
    }
    const close = () => {
      drawer.value = false
    }
    onMounted(() => {
      fetchData()
    })
    watch(calendarVal, (newValue, oldValue) => {
      // 跳转
    })
    return { drawer, calendarVal, calendar, allArticle, color, selectDate, menuClick, openClick, closeClick, close }
  }
})
</script>
<template>
  <div @click="menuClick" class="menu-btn"></div>
  <!-- <el-button @click="menuClick" class="menu-btn">菜单</el-button> -->
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :with-header="false"
    direction="ltr"
    :lock-scroll="true"
    close-on-press-escape
    destroy-on-close
    :append-to-body="true"
    size="330px"
    custom-class="menu-drawer"
    @open="openClick"
    @close="closeClick"
  >
    <div class="top">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="80"
      ></el-avatar>
      <div class="name">
        <span>一寒</span>
      </div>
      <div class="name ename">
        <span>Ehame</span>
      </div>
      <div class="name ename">
        <span>Idong</span>
      </div>
    </div>
    <ul @click="close">
      <li>
        <router-link to="home">首页</router-link>
      </li>
      <li>
        <router-link to="category">分类</router-link>
      </li>
      <li>
        <router-link to="timeList">归档</router-link>
      </li>
    </ul>

    <el-calendar v-model="calendarVal" ref="calendar" class="person-calendar">
      <template #header="{ date }">
        <el-tooltip effect="dark" content="前一年" placement="top">
          <el-button
            size="mini"
            class="calendar-btn change-year-btn"
            @click="selectDate('prev-year')"
          >&lt;&lt;</el-button>
        </el-tooltip>

        <el-tooltip effect="dark" content="前一月" placement="top">
          <el-button
            size="mini"
            class="calendar-btn change-month-btn"
            @click="selectDate('prev-month')"
          >&lt;</el-button>
        </el-tooltip>

        <span>{{ date }}</span>

        <el-tooltip effect="dark" content="后一月" placement="top">
          <el-button
            size="mini"
            class="calendar-btn change-month-btn"
            @click="selectDate('next-month')"
          >></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="后一年" placement="top">
          <el-button
            size="mini"
            class="calendar-btn change-year-btn"
            @click="selectDate('next-year')"
          >>></el-button>
        </el-tooltip>
      </template>
      <template #dateCell="{ data }">
        <div
          class="day-content"
          :style="{ backgroundColor: color[allArticle[data.day] > 2 ? 3 : allArticle[data.day]], color: allArticle[data.day] ? '#fff' : '#000' }"
        >
          <div class="date">{{ data.day.split('-').slice(2).join('-') }}</div>
          <div class="paper-num" v-if="allArticle[data.day]">{{ allArticle[data.day] }}篇</div>
        </div>
      </template>
    </el-calendar>
  </el-drawer>
</template>
<style lang='scss' scoped>
.menu-btn {
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 1000;
  cursor: pointer;
  background: url('@/assets/images/menu.png') no-repeat;
  width:56px;
  height: 56px;
  background-size: cover;
}
.top {
  height: 230px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.name {
  font-size: 14px;
  margin-top: 10px;
}
.ename {
  font-size: 10px;
  margin-top: 0px;
}
.change-month-btn {
  cursor: pointer;
}
.calendar-btn {
  border: none;
  font-size: 12px;
}
.day-content {
  height: 100%;
  .date {
    font-size: 14px;
  }
  .paper-num {
    font-size: 12px;
    text-align: right;
    margin-top: 5px;
  }
}
</style>
<style lang="scss">
// .menu-drawer {
//   background: rgba(0, 0, 0, 0);
//   box-shadow: none;
//   .el-drawer__body {
//     padding: 0;
//     background: rgba(0, 0, 0, 0);
//   }
// }

.menu-drawer {
  // cubic-bezier(.5,.5,.98,.43)
  // cubic-bezier(0.175, 0.885, 0.32, 1.275)
  // cubic-bezier(0.68, -0.55, 0.265, 1.55)
  animation: radius 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;

  .el-drawer__body {
    padding: 0;
  }
}
@keyframes radius {
  0% {
    border-radius: 0;
    transform: translate3d(-325px, 0, 0);
  }
  60% {
    border-radius: 0;
    transform: translate3d(-10px, 0, 0);
  }
  100% {
    border-radius: 0;
    transform: translate3d(0, 0, 0);
  }
}
.el-popup-parent--hidden {
  padding-right: 0 !important;
  overflow: hidden;
}
.person-calendar {
  .el-calendar-table td.is-selected {
    background-color: #fff;
  }
  .el-calendar-day {
    height: 40px;
    padding: 0px;
  }
  .el-calendar__body {
    padding: 0px 20px 35px;
  }
  .el-calendar__header {
    padding: 0px 20px;
  }
}
</style>