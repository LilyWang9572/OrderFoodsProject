<template>

</template>

<script type="text/ecmascript-6">
var userId = '';
var orderList = [];
var state = '';

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
function getId() {
  return userId;
}
function getState() {
  return state;
}
function setState(str) {
  state = str;
}
export default {
  getId,
  setId,
  setList,
  getList,
  getState,
  setState
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
