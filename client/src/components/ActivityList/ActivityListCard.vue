<template>
  <div class="card mt-2">
    <div class="row">
      <div class="col">
        <h5>{{ title }}</h5>
      </div>
      <div class="col">
        <h5>{{ time }}</h5>
      </div>
      <div class="col">
        <h5>{{ quota_left }}</h5>
      </div>
      <div class="col">
        <button
          class="btn btn-primary btn-lg"
          type="button"
          @click="toActivityManagement"
        >
          Detail
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description
 * This is an activity card component, used to display information of a specific component
 */
export default {
  props: {
    activity_id: { type: Number, required: true },
    title: { type: String, required: true },
    time: { type: String, required: true },
    quota_left: { type: Number, required: true },
  },
  inject: ['userId'],
  methods: {
    /**
     * @description
     * Redirect to the activity management page
     */
    toActivityManagement() {
      // eslint-disable-next-line
      this.$store.dispatch('activityManagement/setActivityId', { activity_id: this.activity_id });
      this.$router.push('/activityManagement');
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  padding: 1% 5%;
}
</style>
