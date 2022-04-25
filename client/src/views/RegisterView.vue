<template>
<div class="container">
  <br>
  <div class="box">
    <div class="about">
      <header><strong>Sign Up</strong></header>
    </div>
    <form  @submit.prevent>
      <p class="m-2">Email Address</p>
      <label for="email"
        ><input v-model="userAccount" id="email" placeholder="Email" />
      </label>
      <p class="m-2">Password</p>
      <label for="password"
        ><input type="password" id="password" v-model="password" placeholder="Password" />
      </label>
      <br><br>
      <button v-on:click="postMessage" class="btn btn-primary">Sign Up</button>
    </form>
    <br>
    <p>Already have an account? <router-link to="/login">Log In</router-link></p>
    <br>
  </div>
</div>
</template>

<script>
const axios = require('axios').default;

const REGISTER_URL = 'http://54.172.232.138:4000/register';

export default {
  name: 'RegisterView',
  data() {
    return {
      email: null,
      count: null,
      userAccount: null,
      password: null,
    };
  },
  methods: {
    postMessage() {
      const account = this.userAccount;
      const keyword = this.password;
      axios.post(REGISTER_URL, { userAccount: account, password: keyword });
      setTimeout(this.pageUpdate(), 500);
    },
  },
};
</script>

<style scoped>
header {
  top: 25px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #ff4c68;
  color: white;
  text-align: center;
  width: 80%;
  max-width: 40rem;
}
.box {
  height: 40%;
  width: 33%;
  margin: 0% auto;
  position: relative;
  background-color: #eaf1ff;
  border-radius: 10px;
}
.container {
  position: relative;
}
input {
  /* display: block; */
  margin-bottom: 10px;
  border:1px solid #ccc;
  padding:7px 0px;
  border-radius:7px;
  padding-left:5px;
  -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition:border-color ease-in-out .15s,
  -webkit-box-shadow ease-in-out .15s;
  -o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s
  }
  input:focus{
  border-color:#66afe9;outline:0;
  -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
</style>
