<script   lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import day from 'dayjs'
import { getArticleList, search } from '@/api/home'
interface resultData {
  total: number;
  data: articleData[];
}
export default defineComponent({
  setup() {
    const articleData = ref<resultData>({ data: [], total: 0 })
    const searchData = ref<any>('')
    const page = ref(1)
    const fetchData = async () => {
      await getArticleList({page:page.value,size:5}).then(res => {

        articleData.value = res
      })
    }

    const router = useRouter()
    const detail = (id: string) => {
      router.push({ path: '/detail', query: { id } })
    }
    onMounted(fetchData)


    const isSearch = ref<Boolean>(false)
    const searchOpen = () => {
      isSearch.value = true
      if (isSearch.value && searchDom.value) {
        searchDom.value.focus()
      }
      if (searchData.value) {
        searchEnter()
      }
    }
    const searchBlur = () => {
      if (!searchData.value) {
        isSearch.value = false
      }
    }

    const searchEnter = () => {
      let params = {
        page: page.value,
        size: 5,
        search: searchData.value
      }
      search(params).then(res => {
        articleData.value.data = res.data
      })
    }
    const mainBoxRef = ref(null)
    const pageChange = (curPage:number)=>{
      page.value = curPage
      fetchData()
      let top = mainBoxRef.value.offsetTop
      console.log('top',top);
      window.scrollTo({
        top,
        behavior:'smooth'
      });
    }

    const searchDom = ref<null | HTMLInputElement>(null)
    return { articleData, day, detail, searchOpen, searchData, isSearch, searchDom, searchBlur, searchEnter,pageChange,page,mainBoxRef }
  },
})

</script>

<template>
  <div class="home-picture"></div>
  <div class="article-main" ref="mainBoxRef">
    <div class="search">
      <el-input
        @blur="searchBlur"
        ref="searchDom"
        v-model="searchData"
        placeholder="输入关键词搜索..."
        class="search-input"
        :class="isSearch ? 'open' : 'hide'"
        @keyup.enter="searchEnter"
        maxlength="50"
      >
        <template #suffix>
          <el-tooltip class="item" effect="dark" content="关键字搜索" placement="right">
            <el-icon class="search-icon" @click="searchOpen" :class="isSearch ? 'open' : ''">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
                <path
                  fill="currentColor"
                  d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
                />
              </svg>
            </el-icon>
          </el-tooltip>
        </template>
      </el-input>
      <!-- <el-icon class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b>
          <path
            fill="currentColor"
            d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
          />
        </svg>
      </el-icon>-->
    </div>
    <el-divider></el-divider>
    <template v-if="articleData.data && articleData.data.length > 0">
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
      <div style="text-align: right;" v-if="articleData.total&&articleData.total.length>0">
        <el-pagination layout="prev, pager, next" :total="articleData.total" background @current-change="pageChange"/>
      </div>
    </template>
    <el-empty description="暂无文章" v-else></el-empty>
  </div>
</template>

<style lang="scss" scoped>
.home-picture {
  height: 100vh;
  width: 100%;
  // background:url('@/assets/images/home/bg1.webp') no-repeat;
  background-size: cover;
}
.article-main {
  width: 1200px;
  // min-height:100vh;
  margin:10px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  padding: 20px;
  background-color: rgb(240, 239, 239);
}
.search {
  text-align: right;
  cursor: pointer;

  .search-icon {
    font-size: 20px;
    color: #555;
    cursor: pointer;
    &.open {
      // pointer-events: none;
      color: #000;
      cursor: pointer;
    }
  }
}
.card-box {
  // display: flex;

  margin-bottom: 20px;
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
<style lang="scss">
.search {
  .el-input__suffix-inner {
    margin-top: 10px;
  }
  .el-input__inner {
    padding: 0;
    border: none;
  }
  .search-input {
    justify-content: end;
    cursor: auto;
    .el-input__inner {
      width: 0px;
      transition: all 0.5s ease-in-out;
      opacity: 0;
      border-radius: 20px;
      text-indent: 10px;
    }
    &.open {
      .el-input__inner {
        width: 500px;
        background-color: #fff;
        transition: all 0.5s ease-in-out;
        opacity: 1;
      }
    }
  }
}
.article-main {
  em {
    color: rgb(189, 7, 7);
    font-style: normal;
    font-weight: 600;
  }
}
</style>