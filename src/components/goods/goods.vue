<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!--food-list-hook用于dom操作，获取整体容器的高度-->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="price">
                  <span class="now">{{food.price}}元</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        index: 0
      };
    },
    computed: {
      currentIndex() {
        for (var i = 0; i < this.listHeight.length; i++) {
          var height = this.listHeight[i];
          var height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        var foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        var foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        var el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
        console.log(index);
      },
      //用来对左右两侧dom结构进行初始化
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 实时监测滚动的位置
        });

        // 监听事件 获取位置
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        var foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        var height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          var item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #faf9f5;
  }
  .menu-item {
    display: table;
    padding: 0 12px;
    height: 54px;
    width: 56px;
    line-height: 14px;
  }
  .current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    font-weight: 700;
    color: #f08200;
  }
  .menu-item .current .text {
    border-none()
  }
  .text {
    display: table-cell;
    border-1px(rgba(7, 17, 27, 0.1));
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }
  .foods-wrapper {
    flex: 1;
  }
  .foods-wrapper .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }
  .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-1px(rgba(7, 17, 27, 0.1));
  }
  .food-item:last-child {
    border-none();
    margin-bottom: 0;
  }
  .foods-wrapper .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .foods-wrapper .content {
    flex: 1;
  }
  .foods-wrapper .content .name {
    margin: 2px 0 8px 0;
    line-height: 14px;
    height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .foods-wrapper .content .price {
    font-weight: 700;
    line-height: 24px;
  }
  .foods-wrapper .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: #f0ad4e;
  }
  .foods-wrapper .content .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
</style>
