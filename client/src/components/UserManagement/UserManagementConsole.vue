<template>
  <section>
    <div
      class="container-fluid p-4"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <h1>User Management</h1>
    </div>

    <div class="card mx-auto m-4 user_info_block">
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>User ID</h3>
        </div>
        <div class="col-sm-7 p-4">
          <h3>{{ user_id }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>Email</h3>
        </div>
        <div class="col-sm-7 p-4">
          <h3>{{ email }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>User Name</h3>
        </div>
        <div class="col-sm-7 p-4">
          <h3>{{ user_name }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>Gender</h3>
        </div>
        <div class="col-sm-7 p-4">
          <h3>{{ gender }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>Contact Info</h3>
        </div>
        <div class="col-sm-7 p-4">
          <h3>{{ contact_info }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>Personal Introduction</h3>
        </div>
        <div class="col-sm-7 p-4">
          <h3>{{ Personal_intro }}</h3>
        </div>
      </div>
    </div>
    <div class="card mx-auto m-4 action_block">
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>Set New Password For User</h3>
        </div>
        <div class="col-sm-7 p-4">
          <form @submit.prevent="setNewUserPassword">
            <label for="user_id"><input type="password" v-model="new_user_password" /></label>
            <button class="btn btn-primary m-2 btn-lg">Set</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-4">
          <h3>Action</h3>
        </div>
        <div class="col-sm-7 p-4">
          <button class="btn btn-danger m-2 btn-lg" @click="deleteUser">Delete</button>
          <button class="btn btn-primary m-2 btn-lg" @click="toAdminConsole">Back</button>
        </div>
      </div>
    </div>
    <br />
  </section>
</template>

<script>
const axios = require('axios').default;

const USER_INFO_URL = 'http://54.172.232.138:4002/getUserInfo';
const SET_NEW_PASSWORD = 'http://54.172.232.138:4002/setNewPassword';
const DELETE_USER = 'http://54.172.232.138:4002/deleteUser';

export default {
  data() {
    return {
      user_id: null,
      USER_INFO_INDEX: 0,
      new_user_password: '',
      // dumy data is to prevent loading error (loading from database needs time)
      USER_INFO: [
        {
          user_id: null,
          email: null,
          password: null,
          user_name: null,
          gender: null,
          contact_info: null,
          personal_intro: null,
        },
      ],
    };
  },
  computed: {
    email() {
      return this.USER_INFO[this.USER_INFO_INDEX].email;
    },
    user_name() {
      return this.USER_INFO[this.USER_INFO_INDEX].user_name;
    },
    gender() {
      return this.USER_INFO[this.USER_INFO_INDEX].gender;
    },
    contact_info() {
      return this.USER_INFO[this.USER_INFO_INDEX].contact_info;
    },
    Personal_intro() {
      return this.USER_INFO[this.USER_INFO_INDEX].personal_intro;
    },
  },
  methods: {
    /**
     * @description
     * Redirect to admin console page
     */
    toAdminConsole() {
      this.$router.push('/adminConsole');
    },
    /**
     * @description
     * Return user info of a specific user with the provided user_id
     */
    getUserInfo() {
      const that = this;
      axios.post(USER_INFO_URL, { user_id: this.user_id }).then((response) => {
        that.USER_INFO.push(response.data);
        that.USER_INFO_INDEX = 1;
      });
    },
    /**
     * @description
     * Set user password to a new valleu
     */
    setNewUserPassword() {
      axios
        .post(SET_NEW_PASSWORD, { user_id: this.user_id, new_password: this.new_user_password })
        .then((response) => {
          if (response.data.succeed) {
            alert('Password Change succeed!');
          }
        });
    },
    /**
     * @description
     * Delete User
     */
    deleteUser() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to delete this user?')) {
        axios.post(DELETE_USER, { user_id: this.user_id }).then((response) => {
          if (response.data.succeed) {
            alert('User Deleted');
            this.$router.push('/adminConsole');
          }
        });
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    this.user_id = this.$store.getters['userManagement/getUserId'];
  },
};
</script>

<style scoped>
.user_info_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 60%;
}
.action_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 60%;
}
</style>
