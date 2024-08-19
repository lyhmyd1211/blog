<script  lang='ts'>
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import katex from 'katex';
import 'katex/dist/katex.min.css';
import highlight from 'highlight.js';
import 'highlight.js/styles/github.css';
//  import 'highlight.js/styles/monokai-sublime.css';
import * as marked from 'marked'
import ArticleHead from '@/components/ArticleHead.vue';
import FixedButton from '@/components/FixedButton.vue';
import AnimationBg from '@/components/animationBg.vue'
import { getArticleById } from '@/api/detail'
import ForecastCard from '@/components/ForecastCard.vue';
// import {marked} from 'marked';
// const marked = require("marked");
export default defineComponent({
  components: {
    ArticleHead,
    FixedButton,
    AnimationBg,
    ForecastCard
  },
  setup() {
    const contentRf = ref();
    const articleData = ref<articleData>({ id: '' })
    const customMarkdownParser: (plainText: string) => string = function (plainText: string) {
      try {
        const text = plainText
          .replace(/\$\$(.*?)\$\$/g, function (match, p1) {
            return (
              "<p class='text-center'>" + katex.renderToString(p1, { displayMode: true }) + '</p>'
            );
          })
          .replace(/\$(.*?[^\\])\$/g, function (match, p1) {
            return katex.renderToString(p1, { displayMode: false });
          })
          .replace(/```math\n([\s\S]*)(.*?)([\s\S]*)\n```/g, function (match, p1) {
            return katex.renderToString(p1, { displayMode: true });
          });
        return text || '';
      } catch (error) {
        return error + '' || '';
      }
    };
    const fetchArticle = async () => {
      const route = useRoute()
      if (route.query.id) {
        const res = await getArticleById({ id: route.query.id })
        let data = marked.marked(customMarkdownParser(res.data.content), {
          renderer: new marked.marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: (code) => {
            return highlight.highlightAuto(code).value;
          },
        });
        articleData.value = { ...res.data, content: data }
        nextTick(() => {
          if (contentRf.value) {
            option.ch = contentRf.value.clientHeight + 20
            option.cw = document.body.clientWidth
            option.ds = Math.ceil(option.cw * option.ch / 22000)
          }
        })
      }
    }

    const option = reactive({
      dom: 'J_dotLine',//画布id
      cw: 1920,//画布宽
      ch: 500,//画布高
      ds: 200,//点的个数
      r: 3,//圆点半径
      cl: '#c0c4cc',//粒子线颜色
      dis: 150//触发连线的距离 
    })
    onMounted(() => {
      fetchArticle();
    })

    return { articleData, contentRf, option }
  }
})
</script>
<template>
  <ForecastCard></ForecastCard>
  <ArticleHead :articleData="articleData"></ArticleHead>
  <AnimationBg :option="option"></AnimationBg>
  <div class="article-detail-main">
    <div class="article-detail" ref="contentRf">
      <div v-html="articleData.content"></div>
    </div>
  </div>
  <fixed-button></fixed-button>
</template>
<style lang='scss' scoped>
.article-detail-main {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  pointer-events: none;
}
.article-detail {
  min-height: 800px;
  width: 1100px;
  margin: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  pointer-events: all;
}
</style>
<style lang='scss'>
.article-detail {
  @media screen and (max-width: 1100px) {
    img {
      max-width: 100vw;
    }
  }
  img {
    max-width: 1100px;
  }
  pre {
    background: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }

  table {
    border-collapse: collapse;
  }
  table td,
  table th {
    border: 1px solid #ddd;
    padding: 5px;
  }
}
</style>