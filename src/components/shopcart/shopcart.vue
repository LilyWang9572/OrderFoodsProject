<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="{'enough':totalCount>0}">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      }
    },
    data() {
      return {
        fold: true
      }
    },
    computed: {
      totalPrice() {
        var total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        var count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice > 0) {
          return '选好了';
        }
      },
      listShow() {
        //没有商品时
        if(!this.totalCount) {
          this.fold = true;
          return false;
        }
        //取反
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      pay() {
        console.log(this.selectFoods);
        this.addList();
        window.alert('支付' + this.totalPrice + '元');
      },
      addList() {
        //根据时间生成订单号
        var date = new Date();
        var hh = date.getHours().toString();
        var mm = date.getMinutes().toString();
        var ss = date.getSeconds().toString();
        var ms = date.getMilliseconds().toString();
        var userId = hh+mm+ss+ms;
        this.GLOBAL.setId(userId);
        console.log(this.GLOBAL.getId());
        this.GLOBAL.setList(this.selectFoods);
        this.GLOBAL.setState('进行中');
        console.log(this.GLOBAL.getState());
        this.selectFoods.forEach((food) => {
          var foodName = food.name;
          var foodPrice = food.price;
          var foodCount = food.count;
          console.log(foodName);

          // 数据存入MySQL数据库
          this.$http.post('/api/list/addList', {
            id: userId,
            name: foodName,
            price: foodPrice,
            count: foodCount,
            instate: 0
          }, {}).then((response) => {
            console.log(response);
          });
        });
      },
      toggleList() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      }
    },
    components: {
      cartcontrol
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #eeb23b;
    color: #ffffff;
  }
  .shopcart .content {
    display: flex;
    background: #eeb23b;
    font-size: 0;
  }
  .shopcart .content .content-left {
    flex: 1;
  }
  .shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #eeb23b;
  }
  .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #eeb23b;
  }
  .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #ffffff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }
  .icon-shopping_cart {
    line-height: 44px;
    font-size: 24px;
    color: #ffffff;
  }
  .shopcart .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 700;
  }
  .price .highlight {
    color: #ffffff;
  }
  .shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
    border-left: 1px solid rgba(255, 255, 255, 0.8);
  }
  .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
  }
  .shopcart .shopcart-list {
    position: absolute;
    left:0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }
  .shopcart-list fold-enter-active, fold-leave-active {
    transition: all 0.5s;
  }
  .shopcart-list fold-enter, fold-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .list-header .title {
    float: left;
    font-size: 14px;
    font-weight: 200;
    color: rgb(7, 17, 27);
  }
  .list-header .empty {
    float: right;
    font-size: 12px;
    color: #eeb23b;
  }
  .shopcart-list .list-content {
    width: 100%;
    padding: 0;
    max-height: 217px;
    overflow: hidden;
    background: #ffffff;
  }
  .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-1px(rgba(7, 17, 27, 0.1));
  }
  .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: #eeb23b;
  }
  .list-content .food .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7,17,27,0.6);
  }
  .list-mask fade-enter-active, fade-leave-active {
    transition: all 0.5s;
  }
  .list-mask fade-enter, fade-leave-to {
    opacity: 0;
    background: rgba(7,17,27,0);
  }
</style>
