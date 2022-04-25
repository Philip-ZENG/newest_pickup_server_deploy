<template>
  <div class="home">
    <h1>This is the Notification page</h1>
    <form @submit.prevent="setUserId">
      <label for="user_id">Set user_id<input type="text" id="user_id" v-model="user_id" /></label>
      <button>Set</button>
    </form>
    <br>
    <form @submit.prevent="setIsLogIn">
      <label for="user_token"
        >Set isLogIn<input type="checkbox" id="user_token" v-model="isLogIn"
      /></label>
      <button>Set</button>
    </form>
    <br>
    <form @submit.prevent="setIsUser">
      <label for="user_token"
        >Set isUser<input type="checkbox" id="user_token" v-model="isUser"
      /></label>
      <button>Set</button>
    </form>
    <br>
    <p>Get user_id : {{ get_user_id }}</p>
    <p>Get isLogIn : {{ get_isLogIn }}</p>
    <p>Get isUser : {{ get_isUser }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: null,
      isLogIn: null,
      isUser: null,
    };
  },
  computed: {
    get_user_id() {
      return this.$store.getters.getUserId;
    },
    get_isLogIn() {
      return this.$store.getters.getIsLogIn;
    },
    get_isUser() {
      return this.$store.getters.getIsUser;
    },
  },
  methods: {
    setUserId() {
      this.$store.dispatch('setUserId', { user_id: this.user_id });
    },
    setIsLogIn() {
      this.$store.dispatch('setIsLogIn', { isLogIn: this.isLogIn });
    },
    setIsUser() {
      this.$store.dispatch('setIsUser', { isUser: this.isUser });
    },
  },
};
</script>
