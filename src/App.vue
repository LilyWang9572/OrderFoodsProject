/* eslint-disable */
// eslint-disable-next-line
<template>
  <div>
    <v-header :seller = "seller"></v-header>
    <div class="tab border-1px" >
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <div class="tab-item">
        <router-link to="/home">首页</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/goods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/list">订单</router-link>
      </div>
    </div>
    <!--路由外链-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  @import "./common/stylus/icon.styl";
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f7a901;
    border-1px(rgba(7, 17, 29, 0.1))
  }
  .tab-item {
    flex: 1;
    text-align: center;
  }
  router-link {
    display: block;
    font-size: 14px;
    font-family: "Adobe 黑体 Std R";
    font-weight: 800;
    color: #000000;
  }
  .active{
    color: #ffffff;
  }

</style>
