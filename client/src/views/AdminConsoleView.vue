<template>
  <section>
    <user-list></user-list>
  </section>
</template>

<script>
import UserList from '../components/AdminConsole/UserList.vue';

const axios = require('axios').default;

const ALL_USER_INFO_URL = 'http://54.172.232.138:4002/getAllUserInfo';

export default {
  components: {
    'user-list': UserList,
  },
  data() {
    return {
      USER_DATA: [],
    };
  },
  provide() {
    return {
      userData: this.USER_DATA,
    };
  },
  methods: {
    /**
     * @description
     * Load all the user data from database, data is stored in
     */
    loadUserData() {
      axios
        .get(ALL_USER_INFO_URL)
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.length; i += 1) {
            this.USER_DATA.push(response.data[i]);
          }
          console.log(this.USER_DATA);
        });
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>
