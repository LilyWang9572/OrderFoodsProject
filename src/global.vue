<template>

</template>

<script type="text/ecmascript-6">
var userId = 1;
var orderList = new Array(10);
function setFood(foodName, foodPrice, foodCount) {
  this.food.name = foodName;
  this.food.price = foodPrice;
  this.food.count = foodCount;
}
function getFood() {
  food;
}
function setList(foods) {
  foods.forEach((food) => {
    orderList.push(food);
  });
}
function getList() {
  return orderList;
}

function setId(id) {
  userId = id;
}
function getId(){
  return userId;
}
export default {
  userId,
  setId,
  getId,
  setList,
  getList,
  getFood,
  setFood
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
