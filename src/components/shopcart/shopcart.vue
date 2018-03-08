<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'enough':totalCount>0}" @click="pay">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
        },
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
      }
    },
    methods: {
      pay() {
        console.log(this.selectFoods);
        this.addList();
        window.alert('支付' + this.totalPrice + '元');
      },
      addList() {
        var userId = window.prompt("输入您的手机号码");
        this.GLOBAL.setId(userId);
        var id = this.GLOBAL.getId();
        console.log(id);
        this.GLOBAL.setList(this.selectFoods);
        console.log(this.GLOBAL.getList());
        this.selectFoods.forEach((food) => {
          var foodName = food.name;
          var foodPrice = food.price;
          var foodCount = food.count;
          console.log(foodName);
          //this.GLOBAL.setFood(foodName, foodPrice, foodCount);
          //console.log(this.GLOBAL.getFood());

          this.$http.post('/api/list/addList', {
            id: userId,
            name: foodName,
            price: foodPrice,
            count: foodCount
          }, {}).then((response) => {
            console.log(response);
          })
        })

      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  .enough {
    background: #eeb23b;
    color: #ffffff;
  }
</style>
