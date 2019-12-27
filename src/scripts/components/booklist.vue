<template>
  <div>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="100"
      >
        <li v-for="(book,i) in list" :key="i" >{{book}}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>


<script>
import { Indicator, Toast } from "mint-ui";

export default {
  props: ["type", "books", "allbooks"],
  data() {
    return {
      allLoaded: false,
      list: [],
      loading: false
    };
  },
  methods: {
    loadTop() {
      console.log("下拉刷新");
      // ajax
      setTimeout(() => {
        this.list = this.list.reverse();
        
        Toast({
          message: "下拉刷新成功",
          iconClass: "icon icon-goodsfill iconfont",
          duration: 500
        });
      }, 1500);
    }
  },
  mounted() {
    this.list = this.allbooks.filter(
      (item, index) => item.type.value == this.type.value
    );
    console.log(this.list);
  }
};
</script>


<style lang="scss" scoped>
// 分类展示
.classify {
  border-top: 0.1rem solid #f5f2f2;
  li {
    display: flex;
    background-color: #fff;
    overflow: hidden;
    border: 0.1rem solid #f5f2f2;
    .left {
      width: 30%;
      margin: 2%;
      img {
        display: block;
        width: 100%;
        height: 98%;
        border-radius: 10px;
      }
    }
    .right {
      width: 60%;
      margin: 5% 3%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 0.38rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h4 {
        font-size: 0.24rem;
        color: #333;
      }
      h5 {
        font-size: 0.16rem;
        color: #666;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
      h6 {
        span {
          display: inline-block;
          font-size: 0.2rem;
          color: #666;
          padding: 0.05rem 0.1rem;
          text-align: center;
          border-radius: 0.2rem;
          background-color: rgb(238, 237, 237);
        }
      }
    }
  }
}

</style>
