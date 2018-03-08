<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="str in listImg" :style="{backgroundImage: 'url(' + str.url + ')'}"></div>
    </div>
    <div class="swiper-pagination swiper-pageination-white"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    props: ['listImg'],
    mounted() {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 4000,
        onTouchEnd: function () {
          swiper.startAutoplay();
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .swiper-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .swiper-container .swiper-wrapper {
    flex: 1;
    width: 100%;
    height: 100%;
  }
  .swiper-container .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
  .swiper-container .swiper-pageination-bullet {
    width: 0.833rem;
    height: 0.833rem;
    display: inline-block;
    background: #ffffff;
  }
</style>
