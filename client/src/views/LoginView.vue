<template>
  <section>
    <div class="container">
      <div class="box">
        <div class="userInput">
          <header><strong>Log In</strong></header>
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
            <button @click="userLogin" class="btn btn-primary m-1">User Login</button>
            <button @click="adminLogin" class="btn btn-secondary m-1">Admin Login</button>
          </form>
        </div>
        <br>
        <!-- A blue lines for a new user -->
        <p>Don’t have an account? <router-link to="/register">Sign Up</router-link></p>
        <br>
      </div>
    </div>
    <!-- The following buttoms are used for testing -->
    <!-- <button @click="userTest">User Test</button>
    <button @click="adminTest">Amin Test</button>
    <button @click="goToHomeAsGuest">Visit As Guest</button> -->
  </section>
</template>

<script>
const axios = require('axios').default;

const LOGIN_URL = 'http://54.172.232.138:4000/userLogin';
const ADMIN_LOGIN_URL = 'http://54.172.232.138:4000/adminLogin';

export default {
  name: 'LoginView',
  data() {
    return {
      userAccount: null,
      password: null,
    };
  },
  methods: {
    userLogin() {
      const account = this.userAccount;
      const keyword = this.password;
      axios
        .post(LOGIN_URL, { userAccount: account, password: keyword })
        .then((response) => {
          console.log(response);
          this.$store.dispatch('setUserId', { user_id: response.data.user_id });
          this.$store.dispatch('setIsLogIn', { isLogIn: true });
          this.$store.dispatch('setIsUser', { isUser: true });
          this.$store.dispatch('setIsGuest', { isGuest: false });
          this.$router.push('/userHome');
        });
    },
    // login successfully as admin
    adminLogin() {
      const adminEmail = this.userAccount;
      const adminPassword = this.password;
      axios
        .post(ADMIN_LOGIN_URL, { admin_email: adminEmail, admin_password: adminPassword })
        .then((response) => {
          if (response.data.adminLoginSucceed) {
            this.$store.dispatch('setIsLogIn', { isLogIn: true });
            this.$store.dispatch('setIsGuest', { isUser: false });
            this.$store.dispatch('setIsAdmin', { isAdmin: true });
            this.$router.push('/adminConsole');
          } else {
            alert('The email or password is incorrect.');
          }
        });
    },
    userTest() {
      this.$store.dispatch('setUserId', { user_id: 2 });
      this.$store.dispatch('setIsLogIn', { isLogIn: true });
      this.$store.dispatch('setIsGuest', { isGuest: false });
      this.$store.dispatch('setIsUser', { isUser: true });
      this.$router.push('/userHome');
    },
    adminTest() {
      this.$store.dispatch('setAdminId', { admin_id: 1 });
      this.$store.dispatch('setIsLogIn', { isLogIn: true });
      this.$store.dispatch('setIsGuest', { isGuest: false });
      this.$store.dispatch('setIsAdmin', { isAdmin: true });
      this.$router.push('/adminConsole');
    },
    goToHomeAsGuest() {
      this.$store.dispatch('setIsGuest', { isGuest: true });
      this.$router.push('/userHome');
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
  margin: 10% auto;
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
