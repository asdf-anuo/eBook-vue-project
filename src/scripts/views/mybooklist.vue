<template>
  <div>
    <Head title="我的书架" :show="false" :hidden="true"></Head>
    <Ad></Ad>

    <!-- 未登录状态 -->
    <div class="ifLogin" v-show="flag2">
      <h3>亲，你还没有登录哦~</h3>
      <button @click="gotoLogin">现 在 去 登 录</button>
    </div>

    <!-- 已登录状态 -->
    <div class="mybooklist" v-show="!flag2">
      <div class="booklist-not-empty">
        <div class="booklist-header">
          <span>
            共
            <span class="booknum">{{booknum}}</span>
            本
          </span>
          <span class="deleteAll" @click="deleteAll">清空书架</span>
          <span @click="manageMybook1" v-show="!flag3">管理书架</span>
          <span @click="manageMybook2" v-show="flag3">完成管理</span>
        </div>

        <!-- 动态生成 收藏的书start -->
        <div class="classify booklist-body">
          <ul>
            <li v-show="flag" v-for="(book,i) in books" :key="i">
              <div class="left">
                <img :src="book.iconUrl" @click="gotoDetail(book.bookid)" />
              </div>
              <div class="right">
                <h3>{{ book.title }}</h3>
                <h4>阅读进度:37%</h4>
                <h4>最新章节:第372章</h4>
                <h6>
                  <span>{{book.readCount}}阅读</span>
                  <span>{{book.showTotalCount}}字</span>
                </h6>
                <button class="btn1" @click="removeBook(book.bookid)" v-show="flag3">
                  <i class="icon iconfont icon-huishouzhan1"></i>
                </button>
                <button class="btn2" @click="downloadBook" v-show="flag3">
                  <i class="icon iconfont icon-huancun"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <!-- 动态生成 收藏的书end -->

        <div class="booklist-goaround" @click="goaround">回到首页 随便逛逛</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from "mint-ui";
import store from "../vuex/store";
export default {
  data() {
    return {
      flag: false,
      flag2: true,
      flag3: false,
      username: store.state.username,
      books: store.state.books
    };
  },
  computed: {
    booknum: {
      get() {
        return this.$store.state.booknum;
      },
      set(val) {
        store.state.booknum = val;
      }
    }
  },
  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      if (this.username != "") {
        this.flag2 = false;
        this.$http
          .get("http://localhost:1810/vue/mybooks", {
            params: {
              username: store.state.username
            }
          })
          .then(res => {
            // console.log(res);
            this.flag = true;
            this.books = res.body.result;
            this.booknum = res.body.result.length;
            this.$store.state.books = this.books;
            this.$store.state.booknum = this.booknum;
            // console.log(this.books);
          });
      } else {
        this.flag2 = true;
      }
    },
    //去登陆页面
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    //管理书籍
    manageMybook1() {
      this.flag3 = true;
    },
    //完成管理
    manageMybook2() {
      this.flag3 = false;
    },
    //删除单个
    removeBook(id) {
      MessageBox.confirm("确定要移除书架吗?").then(action => {
        // alert(id + "要被删除啦");
        this.$http
          .get("http://localhost:1810/vue/deleteOne", {
            params: {
              username: store.state.username,
              bookid: id
            }
          })
          .then(res => {
            // console.log(res);
            this.flag = true;
            this.books = this.books.filter(book => book.bookid !== id);
            this.$store.state.booknum = this.books.length;
          });
      });
    },
    //删除所有
    deleteAll() {
      MessageBox.confirm("确定要删除书架上的所有藏书?").then(action => {
        // alert(id + "要被删除啦");
        this.$http
          .get("http://localhost:1810/vue/deleteAll", {
            params: {
              username: store.state.username
            }
          })
          .then(res => {
            // console.log(res);
            this.flag = true;
            this.books = "";
            this.$store.state.booknum = 0;
          });
      });
      // MessageBox("警告", "确定要删除书架上的所有藏书?");
    },
    //去看书籍详情
    gotoDetail(id) {
      this.$router.push({ name: "bookdetail", params: { id: id } });
    },
    //下载本书
    downloadBook() {
      MessageBox("恭喜你", "下载成功，已保存至本地文件!");
    },
    //去首页
    goaround() {
      this.$router.push({ name: "home" });
    },
    changeBooknum() {
      this.$store.dispatch("changeBooknum");
    }
  }
};
</script>

<style lang="scss" scoped>
.ifLogin {
  width: 100%;
  h3 {
    width: 70%;
    margin-left: 15%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
  }
  button {
    display: block;
    outline: none;
    border: none;
    box-shadow: none;
    background: #ff7575;
    color: #fff;
    border: 1px solid #eceaea;
    width: 90%;
    height: 1rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    padding: 0.1rem 0.4rem;
    box-sizing: border-box;
    margin-left: 5%;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
}
.mybooklist {
  display: flex;
  flex-direction: column;
  .booklist-empty {
    font-weight: 900;
    font-size: 0.4rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  .booklist-not-empty {
    .booklist-header {
      width: 100%;
      height: 0.6rem;
      line-height: 0.8rem;
      background-color: rgb(245, 244, 244);
      color: rgb(99, 159, 249);
      display: flex;
      justify-content: space-between;
      span {
        width: 25%;
        font-size: 0.28rem;
        text-align: center;
        .booknum {
          color: #f86a6a;
        }
      }
    }
  }
  .booklist-goaround {
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: rgb(245, 244, 244);
    color: rgb(99, 159, 249);
    font-size: 0.2rem;
    text-indent: 0.2rem;
    letter-spacing: 0.02rem;
  }
}

// 分类展示
.classify {
  li {
    display: flex;
    background-color: #fff;
    overflow: hidden;
    border: 0.1rem solid #f5f2f2;
    position: relative;
    .left {
      width: 23%;
      margin: 2%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .right {
      width: 65%;
      margin: 5% 3%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 0.34rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h4 {
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
          font-size: 0.16rem;
          color: #666;
          padding: 0.05rem 0.1rem;
          text-align: center;
          border-radius: 0.2rem;
          background-color: rgb(238, 237, 237);
        }
      }
      .btn1,
      .btn2 {
        display: block;
        outline: none;
        border: none;
        box-shadow: none;
        background: #f86a6a;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.4rem;
        box-sizing: border-box;
        position: absolute;
        top: 0.05rem;
        right: 0.1rem;
        i {
          font-size: 0.26rem;
          color: #fff;
        }
      }
      .btn2 {
        position: absolute;
        top: 0.5rem;
      }
    }
  }
}
</style>

