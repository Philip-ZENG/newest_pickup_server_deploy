<template>
  <section>
    <div
      class="container-fluid p-4"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <h1>Admin Account Management</h1>
    </div>
    <br />
    <div class="card mx-auto m-4 admin_info_block">
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Admin Id</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ admin_id }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Admin Email</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ admin_email }}</h3>
        </div>
      </div>
    </div>

    <div class="card mx-auto m-4 action_block">
      <form @submit.prevent="setNewAdminPassword">
        <div class="row">
          <div class="col-sm-5 p-3">
            <h3>Set New Password For Admin Account</h3>
          </div>
          <div class="col-sm-6 p-3">
            <label for="user_id">
              <input type="password" v-model="new_admin_password" style="margin-left: 100px"
            /></label>
            <button class="btn btn-primary m-3 btn-lg" style="height: 40px; text-align: center">
              Set
            </button>
          </div>
        </div>
      </form>

      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Action</h3>
        </div>
        <div class="col-sm-7 p-3">
          <button class="btn btn-danger btn-lg" @click="deleteAdmin" style="width: 100px">
            Delete
          </button>
          <button class="btn btn-primary btn-lg" @click="toAdminAccountList" style="width: 100px">
            Back
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const axios = require('axios').default;

const ADMIN_DATA_URL = 'http://54.172.232.138:4002/getAdminData';
const SET_NEW_ADMIN_PASSWORD = 'http://54.172.232.138:4002/setNewAdminPassword';
const DELETE_ADMIN_ACCOUNT = 'http://54.172.232.138:4002/deleteAdmin';

export default {
  data() {
    return {
      admin_id: null,
      ADMIN_ACCOUNT_INDEX: 0,
      new_admin_password: '',
      ADMIN_DATA: [
        {
          admin_id: null,
          admin_email: null,
        },
      ],
    };
  },
  computed: {
    admin_email() {
      return this.ADMIN_DATA[this.ADMIN_ACCOUNT_INDEX].admin_email;
    },
  },
  methods: {
    /**
     * @description
     * Redirect to admin management page
     */
    toAdminAccountList() {
      this.$router.push('/adminAccountList');
    },
    /**
     * @description
     * Return user info of a specific admin account with the provided admin_id
     */
    getAdminData() {
      const that = this;
      axios.post(ADMIN_DATA_URL, { admin_id: this.admin_id }).then((response) => {
        that.ADMIN_DATA.push(response.data);
        that.ADMIN_ACCOUNT_INDEX = 1;
      });
    },
    /**
     * @description
     * Set admin account password to a new valleu
     */
    setNewAdminPassword() {
      axios
        .post(SET_NEW_ADMIN_PASSWORD, {
          admin_id: this.admin_id,
          new_admin_password: this.new_admin_password,
        })
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
    deleteAdmin() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to delete this admin account?')) {
        axios.post(DELETE_ADMIN_ACCOUNT, { admin_id: this.admin_id }).then((response) => {
          if (response.data.succeed) {
            alert('Admin Account Deleted');
            this.$router.push('/adminAccountList');
          }
        });
      }
    },
  },
  mounted() {
    this.getAdminData();
  },
  created() {
    this.admin_id = this.$store.getters['adminAccountManagement/getAdminId'];
  },
};
</script>

<style scoped>
.admin_info_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 80%;
}
.btn {
  margin: 0 20px;
}
.action_block {
  border-radius: 30px;
  padding: 0 5%;
  width: 80%;
}

input {
  /* display: block; */
  margin-bottom: 5px;
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 7px;
  padding-left: 5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
