<template>
  <commContent title="分类">
    <template v-if="paperList.length > 0">
      <div  class="category-list-box">
        <!-- <el-divider content-position="left" class="title">{{ item.category }}</el-divider> -->
        <el-check-tag
          class="tag-item"
          v-for="(item,index) in paperList" :key="index"
          effect="dark"
          round
          :checked="checked==item.code" @change="onChange($event,item)"
        >
          {{ item.text }}
        </el-check-tag>
      </div>
      <div class="paper-list" ref="mainBoxRef">
        <div v-for="(item,index) in articleData.data" :key="index" class="card-box">
        <!-- <div class="left">
        <img :src="item.cover" />
        </div>-->
        <div class="right">
          <div>
            <span @click="detail(item.id)" class="title" v-html="item.title"></span>
          </div>
          <div class="sub">
            <span :style="{ marginRight: '30px' }">阅读：{{ item.viewTimes }}</span>
            <!-- <span>评论：{{ item.viewTimes }}</span> -->
          </div>
          <div class="abstract" v-html="item.abstract"></div>
          <div class="bottom">
            <div class="more" @click="detail(item.id)">阅读全文>></div>
            <div class="time">
              <!-- <span>最新修改于：{{ day(item.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span> -->
              <span>发表于：{{ day(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        </div>
        <div style="text-align: right;">
          <el-pagination layout="prev, pager, next" :total="articleData.total" background @current-change="pageChange"/>
        </div>
      </div>
    </template>
    <el-empty description="暂无分类" v-else></el-empty>
  </commContent>
</template>
<script setup  lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { getArticleTypeList,getListByType } from '@/api/category'
import commContent from '@/components/commonContent.vue'
import day from 'dayjs'
import { useRouter } from 'vue-router';
interface dayList {
  code: string, text: string, id: string, 
}


const paperList = ref<dayList[]>([])
const first = ref()
const fetchData = (callback:any) => {
  getArticleTypeList().then(res => {
    let data = res.data
    if (data&&data.length>0) {
      data.map((item:any)=>{
        paperList.value.push(item)
      })
      first.value = data[0]
      callback&&callback()
    }
  })
}
const checked = ref()
const articleData = ref()
const fecthList = ()=>{
  getListByType({type:checked.value}).then(res => {
    articleData.value = res
  })
}
const onChange = (status:boolean,item:any)=>{
  checked.value = item.code
  fecthList()
}
const router = useRouter()
const detail = (id: string) => {
      router.push({ path: '/detail', query: { id } })
}
const page = ref(1)
const mainBoxRef = ref(null)
const pageChange = (curPage:number)=>{
  page.value = curPage
  fecthList()
  let top = mainBoxRef.value.offsetTop
  window.scrollTo({
    top,
    behavior:'smooth'
  });
}

onMounted(() => { 
  fetchData(()=>{
    onChange(true,first.value)
  })
  })
</script>
<style lang='scss' scoped>
.paper-list {
  line-height: 25px;
}
.day {
  font-size: 14px;
  margin-right: 10px;
}
.tag-item{
  margin: 0 10px;
  cursor: pointer;
}
.category-list-box {
  display: flex;
}
.card-box {
  // display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 15px;
  // height: 150px;

  .left {
    img {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      width: 300px;
      height: 100%;
    }
  }
  .right {
    // padding: 20px 50px;
    width: 100%;
    text-align: left;
    position: relative;
    .title {
      font-size: 30px;
      // padding: 20px 0;
      margin: 0;
      font-weight: bold;
      color: #4a4a4a;
      &:hover {
        color: #000;
      }
      cursor: pointer;
    }
    .sub {
      font-size: 14px;
      margin: 10px 0;
    }
    .abstract {
      height: 40px;
      font-size: 18px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      margin-top: 20px;
    }
    .more {
      font-feature-settings: "liga" 1, "onum" 1, "kern" 1;
      font-size: 16px;
      text-decoration: underline;
      color: #555;
      &:hover {
        color: #000;
      }
      cursor: pointer;
    }
    .time {
      // margin-top: 20px;
      text-align: right;
      // position: absolute;
      // bottom: 20px;
      // right: 20px;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>