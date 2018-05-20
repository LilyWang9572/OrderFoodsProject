<template>
  <!-- 商品列表中的增加和减少按钮和数字 -->
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol {
    font-size: 0;
  }
  .cartcontrol .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .cartcontrol .cart-decrease .inner {
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: #f7a812;
    transition: all 0.4s linear;
    transform: rotate(0);
  }
  .cartcontrol .cart-decrease move-enter-active {
    transition: all 0.4s linear;
  }
  .cartcontrol .cart-decrease move-leave-active {
    transition: all 0.4s linear;
  }
  .cartcontrol .cart-decrease move-enter {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }
  .cartcontrol .cart-decrease move-leave-active {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }
  .cartcontrol .cart-decrease .move-enter .inner {
    transform: rotate(180deg);
  }
  .cartcontrol .cart-decrease .move-leave-active .inner {
    transform: rotate(180deg);
  }
  .cartcontrol .cart-count {
    display: inline-block;
    vertical-align: top;
    padding-top: 6px;
    width: 12px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: #f7a812;
  }
  .cartcontrol .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #f7a812;
  }
</style>
