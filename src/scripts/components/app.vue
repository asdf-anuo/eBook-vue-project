<template>
  <div class="homepage">
    <Head title="首页" :show="false" :hidden="true"></Head>

    <div class="main">
      <!-- 轮播图start -->
      <div>
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(img,i) in imgs" :key="i">
            <img :src="img" class="img-banner" @click="gotoXiaoyuan" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 轮播图end -->

      <Ad></Ad>

      <!-- 为你优选start -->
      <div class="bigtitle">
        <h2>为你优选</h2>
        <p>大家都说好，应该错不了!</p>
      </div>
      <div class="choose-for-you">
        <ul>
          <li @click="gotoRecommond">
            <i class="icon iconfont icon-bianjidizhi"></i>
            <p>主编推荐</p>
          </li>
          <li @click="gotoRank">
            <i class="icon iconfont icon-paihangbang"></i>
            <p>本周打榜</p>
          </li>
          <li @click="gotoClassic">
            <i class="icon iconfont icon-shujiashugui"></i>
            <p>经典外文</p>
          </li>
          <li @click="gotoSuccess">
            <i class="icon iconfont icon-jingxuan"></i>
            <p>成长励志</p>
          </li>
        </ul>
      </div>
      <!-- 为你优选end -->

      <!-- 推荐start -->
      <div class="bigtitle">
        <h2>青涩校园</h2>
        <p @click="gotoXiaoyuan">查看更多 >></p>
      </div>
      <div class="recommond-for-you" v-if="flag1">
        <ul>
          <li v-for="(item,i) in xiaoyuan" :key="i" @click="gotoDetail(item._id)">
            <img :src="item.iconUrl" />
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
      <!-- 推荐end -->

      <!-- 好好谈恋爱start -->
      <div class="bigtitle">
        <h2>好好谈恋爱</h2>
        <p @click="goSex">查看更多 >></p>
      </div>
      <div class="classify" v-if="flag2">
        <ul>
          <li v-for="(item,i) in sex" :key="i" @click="gotoDetail(item._id)">
            <div class="left">
              <img :src="item.iconUrl" />
            </div>
            <div class="right">
              <h3>{{item.title}}</h3>
              <h4>{{item.author}}</h4>
              <h5>{{item.description}}</h5>
              <h6>
                <span>{{item.readCount}}阅读</span>
                <span>{{item.category}}</span>
                <span>{{item.showTotalCount}}字</span>
              </h6>
            </div>
          </li>
        </ul>
      </div>
      <!-- 好好谈恋爱end -->

      <!-- 男生都在看start -->
      <div class="bigtitle">
        <h2>男生都在看</h2>
        <p @click="goBoys">查看更多 >></p>
      </div>
      <div class="classify" v-if="flag3">
        <ul>
          <li v-for="(item,i) in boys" :key="i" @click="gotoDetail(item._id)">
            <div class="left">
              <img :src="item.iconUrl" />
            </div>
            <div class="right">
              <h3>{{item.title}}</h3>
              <h4>{{item.author}}</h4>
              <h5>{{item.description}}</h5>
              <h6>
                <span>{{item.readCount}}阅读</span>
                <span>{{item.category}}</span>
                <span>{{item.showTotalCount}}字</span>
              </h6>
            </div>
          </li>
        </ul>
      </div>
      <!-- 男生都在看end -->

      <!-- 女生都在看start -->
      <div class="bigtitle">
        <h2>女生都在看</h2>
        <p @click="goGirls">查看更多 >></p>
      </div>
      <div class="classify" v-if="flag4">
        <ul>
          <li v-for="(item,i) in girls" :key="i" @click="gotoDetail(item._id)">
            <div class="left">
              <img :src="item.iconUrl" />
            </div>
            <div class="right">
              <h3>{{item.title}}</h3>
              <h4>{{item.author}}</h4>
              <h5>{{item.description}}</h5>
              <h6>
                <span>{{item.readCount}}阅读</span>
                <span>{{item.category}}</span>
                <span>{{item.showTotalCount}}字</span>
              </h6>
            </div>
          </li>
        </ul>
      </div>
      <!-- 女生都在看end -->
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      imgs: [
        require("../../assets/image/banner1.jpg"),
        require("../../assets/image/banner2.jpg"),
        require("../../assets/image/banner3.jpg"),
        require("../../assets/image/banner4.jpg")
      ],
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      Indicator.open({
        text: "努力加载中",
        spinnerType: "fading-circle"
      });
      // 获取校园类型数据
      this.$http
        .get("http://localhost:1810/vue/typeXiaoYuan", {
          params: {
            limit: 3
          }
        })
        .then(res => {
          this.xiaoyuan = res.data.result;
          this.flag1 = true;
          Indicator.close();
        });
      // 获取两性类型数据
      this.$http
        .get("http://localhost:1810/vue/typeSex", {
          params: {
            limit: 4
          }
        })
        .then(res => {
          this.sex = res.data.result;
          this.flag2 = true;
          Indicator.close();
        });
      // 获取都市类型数据
      this.$http
        .get("http://localhost:1810/vue/typecity", {
          params: {
            limit: 4
          }
        })
        .then(res => {
          this.boys = res.data.result;
          this.flag3 = true;
          Indicator.close();
        });
      // 获取言情类型数据
      this.$http
        .get("http://localhost:1810/vue/typelove", {
          params: {
            limit: 4
          }
        })
        .then(res => {
          this.girls = res.data.result;
          this.flag4 = true;
          Indicator.close();
        })
        .catch(err => {
          Toast({
            message: "数据加载失败",
            duration: 1000
          });
          Indicator.close();
        });
    },
    gotoXiaoyuan() {
      this.$router.push({ name: "xiaoyuan" });
      // alert("接口未打通");
    },
    goSex() {
      this.$router.push({ name: "sex" });
      // alert("接口未打通");
    },
    gotoRecommond() {
      this.$router.push({ name: "waiguo" });
    },
    gotoRank() {
      this.$router.push({ name: "classify" });
    },
    gotoClassic() {
      this.$router.push({ name: "waiguo" });
    },
    gotoSuccess() {
      this.$router.push({ name: "success" });
    },
    goBoys() {
      this.$router.push({ name: "classify" });
    },
    goGirls() {
      this.$router.push({ name: "classify" });
    },
    gotoDetail(id) {
      // alert(id);
      this.$router.push({ name: "bookdetail", params: { id: id } });
    }
  }
};
</script>


<style lang="scss" scoped>
.mint-swipe {
  width: 100%;
  height: 300px;
  .img-banner {
    width: 100%;
    height: 100%;
  }
}

.bigtitle {
  margin: 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  overflow: hidden;
  h2 {
    float: left;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.36rem;
    font-weight: 800;
  }
  p {
    float: right;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.2rem;
    color: #666;
  }
}

// 为你优选
.choose-for-you {
  margin: 2%;
  overflow: hidden;
  li {
    float: left;
    width: 22%;
    margin: 1%;
    text-align: center;
    i {
      font-size: 0.6rem;
      color: #ff4834;
    }
    p {
      line-height: 0.8rem;
      font-size: 0.26rem;
      letter-spacing: 0.02rem;
    }
  }
}

// 重磅推荐
.recommond-for-you {
  ul {
    margin: 0.2rem 0 0.4rem;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    li {
      width: 30%;
      height: 3rem;
      img {
        width: 100%;
        height: 90%;
        border-radius: 8px;
      }
      p {
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.24rem;
      }
    }
  }
}

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

.homepage {
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}
</style>


