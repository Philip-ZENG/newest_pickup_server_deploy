<template>
  <div class="card mt-2">
    <div class="row">
      <div class="col">
        <h4>{{ user_id }}</h4>
      </div>
      <div class="col">
        <h4>{{ user_name }}</h4>
      </div>
      <div class="col">
        <h4>{{ user_email }}</h4>
      </div>
      <div class="col">
        <button
          class="btn btn-primary btn-lg"
          type="button"
          @click="toUserManagement"
        >
          Manage
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user_id: { type: Number, required: true },
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
  },
  methods: {
    toUserManagement() {
      this.$store.dispatch('userManagement/setUserId', { user_id: this.user_id });
      console.log('user_id is', this.$store.getters['userManagement/getUserId']);
      this.$router.push('/userManagement');
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  padding: 1% 5%;
  margin: 1% 10%;
}
</style>
