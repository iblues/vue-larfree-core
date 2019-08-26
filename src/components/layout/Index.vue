<template>
  <div id="main-box">
    <layout-nav @toTab="toTab" :isCollapse="isCollapse"></layout-nav>
    <div id="page-wrapper" class="gray-bg dashbard-1">
      <div id="layout-top" ref="top">
        <layout-top-nav v-model="isCollapse"></layout-top-nav>
        <!--<affix-->
        <!--relative-element-selector="#content-main"-->
        <!--&gt;-->
        <layout-tab
          :isCollapse="isCollapse"
          :tabs.sync="tabs"
          :tabsIndex.sync="tabsIndex"
          @clickTab="clickTab"
          @removeTab="removeTab"
        >
        </layout-tab>
        <!--</affix>-->
      </div>

      <div id="content-main">
        <transition name="slide-fade">
          <router-view @toTab="toTab"></router-view>
        </transition>

        <!--<div   v-for="tab in tabs">-->
        <!--<keep-alive>-->
        <!--<router-view v-if="tab.name == tabsIndex " ></router-view>-->
        <!--</keep-alive>-->
        <!--</div>-->
        <img src="../../assets/img/shuoming.png" alt="" class="shuoming" />
      </div>
      <div v-for="(item, index) in dialogs" :key="index">
        <el-dialog
          top="5vh"
          :custom-class="isPhone ? 'margno ' + item.dWidth : item.dWidth"
          :title="item.title"
          :visible.sync="!!item && item.visible"
          :append-to-body="false"
          @closed="closeEnd"
        >
          <component
            :is="item.id"
            @dialogTitle="changeDialogTitle"
            :dialog="item"
            :params="item.params"
            @closeDialog="item.closeDialog(index)"
            v-if="!!item && item.visible"
          ></component>
        </el-dialog>
      </div>

      <notice-dispatch
        v-if="needNoticeDispatch"
        :isPhone="isPhone"
      ></notice-dispatch>
      <web-socket :isPhone="isPhone"></web-socket>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import WebSocket from "../../components/module/WebSocket.vue";
import NoticeDispatch from "../../components/dialogModel/NoticeDispatch.vue";

export default {
  components: {
    WebSocket,
    NoticeDispatch
  },
  data() {
    return {
      userInfo: {},
      params: {},
      dialogConfirmCancel: false,
      dialogWidth: 0,
      scolling: false,
      navWidth: 0,
      isCollapse: false,
      tabsIndex: "home",
      tabs: [
        {
          title: "主页",
          name: "home",
          content: "/",
          url: "Tab 1 content"
        }
      ],
      modelIndex: "",
      dialogs: [],
      isPhone: false,
      // dialogTitle: [],

      needNoticeDispatch: false,
      notices4dispatch: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path.indexOf("dialog") > 0) {
      let id = "dialog" + Math.floor(Math.random() * 1000000000000000);
      Vue.component(id, to.matched[1].components.default);
      this.dialogs.push({
        id: id,
        visible: true,
        dWidth: to.meta.width,
        params: to.params,
        title: to.meta.title,
        closeDialog: i => {
          Vue.set(this.dialogs[i], "visible", false);
          this.dialogs.splice(i, 1);
          // this.closeEnd();
        }
      });
      return false;
    }
    next();
  },
  mounted() {
    let ua = navigator.userAgent;
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
    // console.info('isMobile',isMobile);
    if (isMobile) {
      this.isPhone = true;
      // this.isCollapse = true;
    } else {
      this.isPhone = false;
      // this.isCollapse = false;
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (this.userInfo && this.userInfo.admin && this.userInfo.admin.roles) {
      for (let role of this.userInfo.admin.roles) {
        if (1 === role.id) {
          //id:1 角色为站长
          this.needNoticeDispatch = true;
          break;
        }
      }
    }
    // this.openNotice();
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    // this.navWidth = this.$refs.top.clientWidth;
    // this.setBodyWidth();
    // window.onresize = () => {
    //     this.navWidth = this.$refs.top.clientWidth;
    //     this.setBodyWidth();
    // };
  },
  computed: {
    // dialogVisible: function () {
    //     return this.$store.state.dataRefreshEvents.test;
    // },
  },

  watch: {
    isCollapse: function() {
      //                console.log(this.isCollapse);
    }
  },
  methods: {
    changeDialogTitle(data) {
      // this.dialogTitle.push(val);
      if (data.dialog && data.title) {
        data.dialog.title = data.title;
      }
    },
    closeEnd: function() {
      // this.$store.commit('refreshDialog');
      // let wappers=document.getElementsByClassName("el-dialog__wrapper");
      // for(let i=0;i<wappers.length;i++){
      //     (wappers[i].style.display=="none")&&(wappers[i].remove());
      // }
    },
    dialogConfirmClose: function(done) {
      if (this.dialogConfirmCancel) {
        this.$confirm("是否放弃编辑内容？")
          .then(() => {
            this.$router.go(-1);
            done();
          })
          .catch(() => {});
      } else {
        this.$router.go(-1);
        done();
      }
    },
    openNotice() {
      this.$notify({
        title: "待完成功能,当前为体验版",
        dangerouslyUseHTMLString: true,
        message:
          "1.所有统计功能 <br /> 2.调度功能完善 <br/> 3.推送消息自定义 <br/>" +
          "  4.权限功能 <br/> 5.运力规则定制相关 <br/> " +
          "6.消息订阅机制 <br/>7.客服相关 <br/>8.所有功能测试",
        duration: 0
      });

      setTimeout(() => {
        this.$notify({
          title: "待处理通知",
          message: "新的运单需要处理",
          type: "warning",
          duration: 2000,
          onClick: () => {
            this.$router.push("/express/dispatch/");
          }
        });
      }, 2000);
    },
    dialogChange(visible) {
      this.$store.commit("dialog", visible);
    },
    toTab(option) {
      let targetName = option.url;
      let has = false;
      //如果有标签就切换到那个去
      this.tabs.forEach((tab, index) => {
        // console.log(index);
        if (tab.name === targetName) {
          this.$router.push(tab.content);
          this.tabsIndex = targetName;
          has = true;
        }
      });
      if (has) return;
      //没有就新增一个新标签
      this.tabs.push({
        title: option.name,
        name: option.url,
        content: option.url
      });
      if (this.tabs.length > 9) {
        this.tabs.shift();
      }
      this.$router.push(option.url);
      this.tabsIndex = option.url;
    },

    removeTab(tabsIndex) {
      this.changeToTab(tabsIndex);
    },
    clickTab(tabsIndex) {
      this.changeToTab(tabsIndex);
    },
    changeToTab(tabsIndex) {
      this.tabs.forEach((tab, index) => {
        // console.log(index);
        if (tab.name === tabsIndex) {
          this.tabsIndex = tabsIndex;
          this.$router.push({
            path: tab.content,
            query: { rand: Math.random() }
          });
        }
      });
    }
  }

  //        beforeRouteLeave (to, from, next) {
  //            console.log(to);
  //            if (to.matched.some(record => record.meta.target)) {
  //                alert(1);
  //            }else{
  ////                    next();
  //            }
  //        },
  //        beforeRouteUpdate (to, from, next) {
  //            console.log(to);
  //            next();
  //        },
};
</script>
<style lang="less">
.slide-fade-enter-active {
  transition: 0.4s all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate3d(40px, 0, 0);
  opacity: 0;
}
#main-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#page-wrapper {
  padding: 0;
}
#content-main {
  padding-top: 96px;
  min-height: 99vh;
  overflow: scroll;
  position: relative;
  .shuoming {
    position: fixed;
    bottom: 0px;
    right: 0px;
    z-index: 1000;
    width: 60px;
  }
  .shuoming:hover {
    cursor: pointer;
  }
}
.el-dialog {
  border-radius: 10px !important;
  overflow: hidden;
}
.w400 {
  width: 400px !important;
}
.w500 {
  width: 500px !important;
}
.w600 {
  width: 600px !important;
}
.w700 {
  width: 700px !important;
}
.w800 {
  width: 800px !important;
}
.w900 {
  width: 900px !important;
}
.w1000 {
  width: 1000px !important;
}
.el-dialog__headerbtn {
  top: 8px !important;
  right: 8px !important;
}
.el-dialog__headerbtn .el-dialog__close {
  font-size: 26px !important;
  color: #000 !important;
}
.el-dialog__body {
  padding: 0 0px 20px !important;
}
.el-dialog__header {
  text-align: center;
  background: #f5f7fa;
  padding: 8px 0px !important;
  color: #000 !important;
}
.margno {
  margin: 10px 0 0 140px !important;
}
input[type="file"] {
  display: none;
}

@media screen and (max-width: 768px) {
  #main-box {
    width: 1460px;
    /*height: 2300px !important;*/
  }
  #content-main {
    padding-top: 0px;
    min-width: 1200px;
  }
}
@media screen and (min-width: 768px) {
  #layout-top {
    height: auto;
    width: 100%;
    z-index: 300;
    top: 0px;
    left: 0px;
    position: fixed;
  }
}

.mini-navbar .navbar-static-side {
  width: 70px;
  transition: width 0.5s;
  background-color: rgb(57, 61, 73);
}
</style>

