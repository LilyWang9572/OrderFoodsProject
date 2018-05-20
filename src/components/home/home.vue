<template>
  <div class="home">
    <div class="banner-wrapper">
      <banner :listImg="listImg"></banner>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from './banner';
  import a from './b.png';
  import b from './c.png';
  export default {
    data() {
      return {
        listImg: [{
          url: a
        }, {
          url: b
        }]
      };
    },
    components: {
      banner
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .home {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 174px;
    bottom: 0;
    background-color: #333333;
  }
  .home .banner-wrapper {
    flex: 1;
    display: block;
    width: 100%;
  }
</style>
