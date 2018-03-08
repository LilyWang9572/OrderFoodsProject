<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-text">{{seller.description}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .header {
    position: relative;
    overflow: hidden;
    color: #ffffff;
    background: rgba(7, 17, 27, 0.5);
  }
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .avatar {
    display: inline-block;
  }
  .content {
    display: inline-block;
    margin-left: 16px;
    vertical-align: top;
  }
  img {
    border-radius: 2px;
  }
  .title {
    margin: 2px 0 8px 0;
  }
  .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    bg-image('brand');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .bulletin-wrapper {
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
  }
  .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 14px;
    font-family: "Adobe 黑体 Std R";
    font-weight: 700;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
</style>
