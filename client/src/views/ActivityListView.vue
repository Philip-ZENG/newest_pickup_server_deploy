<template>
  <div>
    <div
      class="container-fluid p-4 heading"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <h1>Activity List</h1>
    </div>
    <div class="container mt-3" style="align: center">
      <activity-list-title></activity-list-title>
      <activity-list></activity-list>
    </div>
  </div>
</template>

<script>
import ActivityList from '../components/ActivityList/ActivityList.vue';
import ActivityListTitle from '../components/ActivityList/ActivityListTitle.vue';

const axios = require('axios').default;

const ACTIVITY_INFO_URL = 'http://54.172.232.138:4003/getActivityList';

export default {
  components: {
    'activity-list-title': ActivityListTitle,
    'activity-list': ActivityList,
  },
  data() {
    return {
      user_id: [],
      ACTIVITY_DATA: [], // Stores all the activity information of a user
    };
  },
  provide() {
    return {
      userId: this.user_id,
      activityData: this.ACTIVITY_DATA,
    };
  },
  methods: {
    /**
     * @description
     * Loads all the activity information of a user with given user_id
     * Data is loaded into the local variable ACTIVITY_DATA
     * @var ID_LIST_INDEX @var DATA_INDEX
     * Data package is sent in the form: {[ACTIVITY_ID_LIST],[ACTIVITY_DATA]}
     * @param {*} callback
     * This callback function is used to pass data from async function
     */
    loadActivityRecord() {
      axios.post(ACTIVITY_INFO_URL, { user_id: this.user_id }).then((response) => {
        const DATA_INDEX = 0;
        for (let i = 0; i < response.data[DATA_INDEX].length; i += 1) {
          this.ACTIVITY_DATA.push(response.data[DATA_INDEX][i]);
        }
      });
    },
  },
  // lIFE Cycle mounted, will be executed after app setup
  mounted() {
    this.loadActivityRecord();
  },
  created() {
    // get the route parameter 'id' from router
    this.user_id.push(this.$store.getters.getUserId);
  },
};
</script>

<style>
.save_button {
  min-width: 110px;
  max-width: 110px;
}
.heading {
  background-color: #b0fce5;
  background-image: linear-gradient(to bottom, #b0fce5, white);
}
</style>
