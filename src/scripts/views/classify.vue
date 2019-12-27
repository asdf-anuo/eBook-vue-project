<template>
  <div class="classify">
    <Head title="分类" :show="false" :hidden="true"></Head>

    <div class="classify-box">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">仙侠</mt-tab-item>
        <mt-tab-item id="2">都市</mt-tab-item>
        <mt-tab-item id="3">现言</mt-tab-item>
        <mt-tab-item id="4">穿越</mt-tab-item>
        <mt-tab-item id="5">宫斗</mt-tab-item>
        <mt-tab-item id="6">悬疑</mt-tab-item>
        <mt-tab-item id="7">古言</mt-tab-item>
      </mt-navbar>

      <Ad></Ad>
      <div class="ranktype">
        <button @click="rankByClicks">热度</button>
        <button @click="rankByPraise">好评</button>
      </div>

      <div>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="classify" v-if="flag1">
              <ul>
                <li v-for="(item,i)  in xianxia" :key="i" @click="gotoDetail(item._id)">
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
          </mt-tab-container-item>

          <mt-tab-container-item id="2">
            <div class="classify" v-if="flag2">
              <ul>
                <li @click="gotoDetail(item._id)" v-for="(item,i) in city" :key="i">
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
          </mt-tab-container-item>

          <mt-tab-container-item id="3">
            <div class="classify" v-if="flag3">
              <ul>
                <li @click="gotoDetail(item._id)" v-for="(item,i) in love" :key="i">
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
          </mt-tab-container-item>

          <mt-tab-container-item id="4">
            <div class="classify" v-if="flag4">
              <ul>
                <li @click="gotoDetail(item._id)" v-for="(item,i) in ChuanYue" :key="i">
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
          </mt-tab-container-item>

          <mt-tab-container-item id="5">
            <div class="classify" v-if="flag5">
              <ul>
                <li @click="gotoDetail(item._id)" v-for="(item,i) in GongDou" :key="i">
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
          </mt-tab-container-item>

          <mt-tab-container-item id="6">
            <div class="classify" v-if="flag6">
              <ul>
                <li @click="gotoDetail(item._id)" v-for="(item,i) in XuanYi" :key="i">
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
          </mt-tab-container-item>

          <mt-tab-container-item id="7">
            <div class="classify" v-if="flag7">
              <ul>
                <li @click="gotoDetail(item._id)" v-for="(item,i) in GuYan" :key="i">
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
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>


<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      selected: "1",
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      flag6: false,
      flag7: false
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      Indicator.open({
        text: "拼命加载中...",
        spinnerType: "triple-bounce"
      });
      //1
      this.$http.get("http://localhost:1810/vue/typeXianXia").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.xianxia = res.data.result;
          this.flag1 = true;
        });
      });
      //2
      this.$http.get("http://localhost:1810/vue/typecity").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.city = res.data.result;
          this.flag2 = true;
        });
      });
      //3
      this.$http.get("http://localhost:1810/vue/typelove").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.love = res.data.result;
          this.flag3 = true;
        });
      });
      //4
      this.$http.get("http://localhost:1810/vue/typeChuanYue").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.ChuanYue = res.data.result;
          this.flag4 = true;
        });
      });
      //5
      this.$http.get("http://localhost:1810/vue/typeGongDou").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.GongDou = res.data.result;
          this.flag5 = true;
        });
      });
      //6
      this.$http.get("http://localhost:1810/vue/typeXuanYi").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.XuanYi = res.data.result;
          this.flag6 = true;
        });
      });
      //7
      this.$http.get("http://localhost:1810/vue/typeGuYan").then(res => {
        // console.log(res);
        this.$nextTick(() => {
          this.GuYan = res.data.result;
          this.flag7 = true;

          Indicator.close();
          Toast({
            message: "加载成功",
            iconClass: "icon icon-goodsfill iconfont",
            duration: 1000
          });
        });
      });
      //all
      this.$http
        .get("http://localhost:1810/vue/allBooks")
        .then(res => {
          // console.log(res);
          this.$nextTick(() => {
            this.allBooks = res.data.result;
            Indicator.close();
          });
        })
        .catch(err => {
          Toast({
            message: "加载失败",
            duration: 1000
          });
          Indicator.close();
        });
    },
    gotoDetail(id) {
      this.$router.push({ name: "bookdetail", params: { id: id } });
    },
    rankByPraise() {
      Toast({
        message: "根据好评度排序",
        duration: 1000
      });
    },
    rankByClicks() {
      Toast({
        message: "根据点击量排序",
        duration: 1000
      });
    }
  }
};
</script>


<style lang="scss" scoped>
//导航栏 字体设置

//排序
.ranktype {
  width: 100%;
  margin: 0.1rem 0;
  button {
    outline: none;
    border: none;
    box-shadow: none;
    background: #ff7575;
    width: 1rem;
    height: 0.4rem;
    border-radius: 0.4rem;
    margin-left: 1%;
    font-size: 0.22rem;
    box-sizing: border-box;
    color: #fff;
  }
}
// 分类展示
.classify {
  li {
    display: flex;
    background-color: #fff;
    overflow: hidden;
    border: 0.1rem solid #f5f2f2;
    .left {
      width: 28%;
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
  li:first-child {
    border-top: 0.2rem solid #f5f2f2;
  }
}
</style>

