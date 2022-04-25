<template>
  <div class="card mt-2">
    <div class="row">
      <div class="col">
        <h5>{{ admin_id }}</h5>
      </div>
      <div class="col">
        <h5>{{ admin_email }}</h5>
      </div>
      <div class="col">
        <button
          class="btn btn-primary btn-lg"
          type="button"
          @click="toAdminAccountManagement"
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
    admin_id: { type: Number, required: true },
    admin_email: { type: String, required: true },
  },
  methods: {
    toAdminAccountManagement() {
      this.$store.dispatch('adminAccountManagement/setAdminId', { admin_id: this.admin_id });
      this.$router.push('/adminAccountManagement');
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
