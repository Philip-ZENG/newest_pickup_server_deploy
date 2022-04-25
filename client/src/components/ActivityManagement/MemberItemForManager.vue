<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn btn-primary dropdown-toggle m-1 btn-lg"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ memberName }}
    </button>
    <ul class="dropdown-menu" v-if="showDropdown">
      <li>
        <button class="dropdown-item" @click="deleteAMember">Delete</button>
      </li>
      <li>
        <button class="dropdown-item" @click="modifyManager">
          Set As Manager
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    memberName: { type: String, required: true },
    memberId: { type: Number, required: true },
  },
  inject: [
    // Data
    'userId',
    'userRole',
    // Methods
    'deleteMember',
    'changeManager',
  ],
  computed: {
    /**
     * @description
     * Only show the dropdown(delete/change manager option) when the member iterm is not the user
     * And when the user is activity manager
     */
    showDropdown() {
      console.log(this.memberId);
      console.log(this.userId[0]);
      return this.memberId !== this.userId[0];
    },
  },
  methods: {
    /**
     * @description
     * Give the users' Manager authority/identity to others
     */
    modifyManager() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to transfer your Manager identity to others?')) {
        this.changeManager(this.memberId);
        this.$router.push('/activityList');
      }
    },
    /**
     * @description
     * Delete a member from an activity with provided activity_id
     */
    deleteAMember() {
      // eslint-disable-next-line
      if (confirm('Are you sure that you want to delete this member from this activity?')) {
        this.deleteMember(this.memberId);
        this.$router.push('/activityList');
      }
    },
  },
};
</script>
