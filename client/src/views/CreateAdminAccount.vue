<template>
  <section>
    <div class="container-fluid p-4"
      style=" background-color: #b0fce5;
      background-image: linear-gradient(to bottom, #b0fce5, white);"
    >
      <h1>Create New Admin Account</h1>
    </div>
    <br />
    <div class="card mx-auto m-4 create_account_block">
      <form @submit.prevent="createAdminAccount">
        <div class="row">
          <div class="col-sm-6 p-4">
            <h3>Admin Email</h3>
          </div>
          <div class="col-sm-6 p-4">
            <label for="admin_email"
              ><input type="text" id="admin_email" v-model="admin_email"
            /></label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 p-4">
            <h3>Admin Password</h3>
          </div>
          <div class="col-sm-6 p-4">
            <label for="admin_password"
              ><input type="password" id="admin_password" v-model="admin_password"
            /></label>
          </div>
        </div>
        <button class="btn btn-primary btn-lg">Register</button>
      </form>
    </div>
    <button class="btn btn-primary btn-lg" @click="goToAdminAccouontManagement">Back</button>
  </section>
</template>

<script>
const axios = require('axios').default;

const CREATE_ADMIN_ACCOUNT = 'http://54.172.232.138:4002/createNewAdminAccount';

export default {
  data() {
    return {
      admin_email: null,
      admin_password: null,
    };
  },
  methods: {
    createAdminAccount() {
      axios
        .post(CREATE_ADMIN_ACCOUNT, {
          admin_email: this.admin_email,
          admin_password: this.admin_password,
        })
        .then((response) => {
          if (response.data.succeed) {
            alert('New Admin Account Created!');
            this.$router.push('/adminAccountList');
          }
        });
    },
    goToAdminAccouontManagement() {
      this.$router.push('/adminAccountList');
    },
  },
};
</script>

<style scoped>
.create_account_block {
  border-radius: 20px;
  padding: 2% 4%;
  width: 50%;
}
</style>
