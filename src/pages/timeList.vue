<script  lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { getMonth } from '@/api/timeList'
import commContent from '@/components/commonContent.vue'
interface dayList {
  day: string, title: string, id: string, time: string
}

interface pList {
  month: string,
  list: dayList[]
}

export default defineComponent({
  components: {
    commContent
  },
  setup() {
    const paperList = ref<pList[]>([])
    const fetchData = () => {
      getMonth().then(res => {
        let data = res.data
        Object.keys(data).map(item => {
          let list: dayList[] = []
          if (data[item]) {
            data[item].map((el: dayList) => {
              list.push({ day: el.day, title: el.title, id: el.id, time: el.time })
            })

          }
          paperList.value.push({ month: item, list })
        })
      })
    }
    onMounted(() => { fetchData() })
    return { paperList }
  }
})
</script>
<template>
  <commContent title="归档">
    <template v-if="paperList.length > 0">
      <div v-for="(item,index) in paperList" :key="index" class="time-list-box">
        <el-divider content-position="left" class="title">{{ item.month }}</el-divider>
        <div class="paper-list" v-for="(e,eindex) in item.list" :key="eindex">
          <span class="day">{{ e.day }}</span>
          <span class="day time">{{ e.time }}</span>
          <el-link :href="'#/detail?id=' + e.id" target="_self" type="primary">{{ e.title }}</el-link>
        </div>
      </div>
    </template>
    <el-empty description="暂无文章" v-else></el-empty>
  </commContent>
</template>
<style lang='scss' scoped>
.paper-list {
  line-height: 25px;
}
.day {
  font-size: 14px;
  margin-right: 10px;
}
</style>
<style lang='scss' >
.time-list-box {
  .title {
    .el-divider__text {
      font-size: 22px;
      font-weight: 600;
    }
  }
}
</style>