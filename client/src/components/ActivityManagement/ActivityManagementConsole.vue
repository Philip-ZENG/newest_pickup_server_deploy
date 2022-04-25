<template>
  <section>
    <div
      class="container-fluid p-4 heading"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <h1>Activity Management</h1>
    </div>
    <div class="card mx-auto m-4 acctivity_info_block">
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Title</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ title }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Time</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ time }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Location</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ location }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Type</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ type }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Description</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ description }}</h3>
        </div>
      </div>
    </div>
    <div class="card mx-auto m-4 quota_info_block">
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Max Capacity</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ max_capacity }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Quota Left</h3>
        </div>
        <div class="col-sm-7 p-3">
          <h3>{{ quota_left }}</h3>
        </div>
      </div>
    </div>
    <div class="card mx-auto m-4 quota_info_block">
      <member-list></member-list>
      <div class="row">
        <div class="col-sm-5 p-3">
          <h3>Actions</h3>
        </div>
        <div class="col-sm-7 p-3">
          <button class="btn btn-danger m-2 btn-lg" type="button" @click="quitActivity">
            Quit
          </button>
          <button class="btn btn-primary m-2 btn-lg" type="button" @click="toActivityList">
            Back
          </button>
          <div v-if="showTerminate">
            <button class="btn btn-danger btn-lg" type="button" @click="terminate">
              Terminate
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import MemberList from './MemberList.vue';

export default {
  /** Manager Functionality
   * *Change manager: OK
   * *Quit from the activity : OK
   * *Terminate the activity: OK
   * *Delete member : OK
   * *Activate activity
   * *Deactivate activity
   * *Go back to activity list page: OK
   */
  /** Member Functionality
   * *Quit from the activity: OK
   * *Go back to activity list page: OK
   */
  components: {
    'member-list': MemberList,
  },
  props: {
    title: { type: String, required: true },
    time: { type: String, required: true },
    quota_left: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    max_capacity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  inject: [
    // Data
    'userId',
    'userRole',
    'activityInfo',
    // Methods
    'deleteMember',
    'terminateActivity',
  ],
  computed: {
    /**
     * @description
     * Return the activity data, since loading takes time, we need to use a dummy data to prevent
     * the error of accessing undefined attributes
     */
    activityData() {
      if (this.activityInfo.length === 1) {
        return this.activityInfo[0];
      }
      return this.activityInfo[1];
    },
    /**
     * @description
     * Show the terminate button if the user is the manager
     */
    showTerminate() {
      return this.userRole[0] === 'MANAGER';
    },
  },
  methods: {
    /**
     * @description
     * Navigate back to the activity list page of the user
     */
    toActivityList() {
      // eslint-disable-next-line
      this.$router.push('/activityList');
    },
    /**
     * @description
     * Quit from the activity
     */
    quitActivity() {
      // Check whether the manager is the user
      if (this.userRole[0] === 'MANAGER') {
        alert('Set another member as Manager before yuo quit.');
      } else {
        // eslint-disable-next-line
        if (confirm('Are you sure that you want to quit this activity?')) {
          this.deleteMember(this.userId);
          this.$router.push('/activityList');
        }
      }
    },
    /**
     * @description
     * Terminate the activity
     */
    terminate() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to terminate this activity?')) {
        this.terminateActivity();
        this.$router.push('/activityList');
      }
    },
  },
};
</script>

<style scoped>
.acctivity_info_block {
  border-radius: 20px;
  padding: 0 5%;
  width: 60%;
}
.quota_info_block {
  border-radius: 20px;
  padding: 0 5%;
  width: 60%;
}
</style>
