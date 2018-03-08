<template>
  <div class="list">
    <div class="background"></div>
    <div class="list-wrapper">
      <div class="list-title-wrapper">
        <div class="list-title">我的订单</div>
      </div>
      <div class="list-num-wrapper">
        <div class="list-num-title">订单号</div>
        <div class="list-num-content">{{$userId}}</div>
      </div>
      <div class="list-content-wrapper">
        <div class="list-content-title">点餐内容</div>
        <div class="list-content-goods-wrapper">
          <div v-for="item in orderList" class="list-content-good">
            <div class="good-name">{{item.name}}</div>
            <div class="good-price">{{item.price}}元</div>
            <div class="good-count">X{{item.count}}</div>
          </div>
        </div>
      </div>
      <div class="list-state-wrapper">
        <div class="list-state-title">订单状态</div>
        <div class="list-state-content">{{listState}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        orderList: []
      };
    },
    created() {
      var list = this.GLOBAL.getList();
      list.forEach((food) => {
        console.log(food.name);
        this.orderList.push(food);
      });
    },
    computed: {
      listState() {
        var list = this.GLOBAL.getList();
        if (list.length > 0) {
          return '进行中';
        } else {
          return '没有订单';
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .list {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 174px;
    bottom: 0;
  }
  .list .background {
    images('background');
    filter: blur(3px);
  }
  .list .list-wrapper {
    flex: 0 0 300px;
    margin: 20px;
    width: 100%;
    bottom: 40px;
    background: #ffffff;
  }
  .list .list-wrapper .list-title-wrapper {
    display: flex;
    width: 100%;
    border-bottom: 3px solid #DFDFDF;
  }
  .list-title-wrapper .list-title {
    flex: 1;
    text-align: center;
    margin: 5px;
    font-weight: bold;
  }
  .list-num-wrapper {
    display: flex;
    width: 100%;
    border-bottom: 3px solid #DFDFDF;
  }
  .list-num-wrapper .list-num-title {
    flex: 0 0 50%;
    text-align: left;
    margin: 4px 0 4px 2px;
    font-size: 14px;
    font-weight: bold;
  }
  .list-num-wrapper .list-num-content {
    flex: 1;
    text-align: right;
    margin: 4px 2px 4px 0;
    font-size: 14px;
  }
  .list-content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 3px solid #DFDFDF;
  }
  .list-content-wrapper .list-content-title {
    flex: 0 0 25px;
    font-size: 14px;
    font-weight: bold;
    margin: 4px 0 4px 2px;
    border-bottom: 1px solid #DFDFDF;
  }
  .list-content-wrapper .list-content-goods-wrapper {
    flex: 1;
    display: inline-block;
    width: 100%;
  }
  .list-content-goods-wrapper .list-content-good {
    display: flex;
    inline-height: 16px;
    width: 230px;
    margin-left: 50px;
    border-bottom: 1px dotted #DFDFDF;
  }
  .list-content-good .good-name {
    flex: 0 0 60%;
    font-size: 10px;
  }
  .list-content-good .good-price {
    flex: 0 0 25%;
    text-align: center;
    font-size: 10px;
  }
  .list-content-good .good-count {
    flex: 1;
    text-align: center;
    font-size: 10px;
  }
  .list-state-wrapper {
    display: flex;
    width: 100%;
  }
  .list-state-wrapper .list-state-title {
    flex: 0 0 50%;
    text-align: left;
    margin: 4px 0 4px 2px;
    font-size: 14px;
    font-weight: bold;
  }
  .list-state-wrapper .list-state-content {
    flex: 1;
    margin: 4px 2px 4px 0;
    text-align: right;
    font-size: 14px;
  }
</style>
