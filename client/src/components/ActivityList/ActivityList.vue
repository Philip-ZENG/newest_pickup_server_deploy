<template>
  <section>
    <div>
      <activity-list-card
        v-for="activity in activityData"
        :key="activity.activity_id"
        :activity_id="activity.activity_id"
        :title="activity.title"
        :time="activity.time"
        :quota_left="activity.quota_left"
      ></activity-list-card>
    </div>
  </section>
</template>

<script>
import ActivityListCard from './ActivityListCard.vue';

export default {
  components: {
    'activity-list-card': ActivityListCard,
  },
  inject: ['activityData'],
};
</script>
