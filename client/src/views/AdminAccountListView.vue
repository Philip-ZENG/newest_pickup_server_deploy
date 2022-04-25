<template>
  <section>
    <div
      class="container-fluid p-4"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <h1>Admin Account List</h1>
    </div>
    <br />
    <button class="btn btn-primary btn-lg" @click="createNewAdminAccount">
      Create New Admin Account
    </button>
    <br />
    <br />
    <admin-account-list></admin-account-list>
  </section>
</template>

<script>
import AdminAccountList from '../components/AdminAccountList/AdminAccountList.vue';

const ALL_ADMIN_ACCOUNT_URL = 'http://54.172.232.138:4002/getAllAdminAccount';

const axios = require('axios').default;

export default {
  components: {
    'admin-account-list': AdminAccountList,
  },
  data() {
    return {
      ADMIN_DATA: [],
    };
  },
  provide() {
    return {
      adminData: this.ADMIN_DATA,
    };
  },
  methods: {
    /**
     * @description
     * Load all the user data from database, data is stored in
     */
    loadAdminData() {
      axios.get(ALL_ADMIN_ACCOUNT_URL).then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i += 1) {
          this.ADMIN_DATA.push(response.data[i]);
        }
        console.log(this.ADMIN_DATA);
      });
    },
    /**
     * @description
     * Create new admin account
     */
    createNewAdminAccount() {
      this.$router.push('/createAdminAccount');
    },
  },
  mounted() {
    this.loadAdminData();
  },
};
</script>
