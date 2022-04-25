<template>
 <!-- eslint-disable -->
  <div class="actCard">
    <div class="firstCol">
      <div class="out">
        <img src="../../../public/Sports.png" v-show="type === 'Sports'" class="in">
        <img src="../../../public/Meals.png" v-show="type === 'Meals'" class="in">
        <img src="../../../public/Travel.png" v-show="type === 'Travel'" class="in">
        <img src="../../../public/Carpool.png" v-show="type === 'Carpool'" class="in">
        <img src="../../../public/Shoponline.png" v-show="type === 'Shop online'" class="in">
      </div>
    </div>
    <div class="secondCol">
      <div class="row">title: {{title}}</div>
      <div class="row">type: {{type}}</div>
      <div class="row">time: {{time}}</div>
      <div class="row">location: {{location}} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityCard',
  props: {
    type: { type: String },
    title: { type: String },
    time: { type: String },
    location: { type: String },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.actCard{
  float: left;
  width: 275px; height: 125px;
  border-radius: 10px; border-style:solid; border-width:2px;
  margin: 15px;
  box-shadow: 2px 1px 3px #858de6;
  border-color: #9198e5;
}

.firstCol{
  float:left;
  width: 10%;
  height: 100%;
}

.out{
  width:20px;
  height: 20px;
}

.in{
  max-width:20px;
  max-height: 20px;
}

.secondCol{
  float:left;
  width:90%;
  height: 100%;
}

.row {
  margin-left: 10px;
  height: 25%;
  width: 100%;
  text-align: center;
  overflow: hidden;
}
</style>
