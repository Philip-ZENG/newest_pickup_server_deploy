<template>
<section>
  <div class="row">
    <div class="col-sm-5 p-3">
      <h3>Member List</h3>
    </div>
    <div class="col-sm-7 p-3">
      <div v-if="!isManager">
        <member-item-for-member
          v-for="member in memberInfo[0]"
          :key="member.user_id"
          :memberName="member.user_name"
          :memberId="member.user_id"
        ></member-item-for-member>
      </div>
      <div v-else>
        <member-item-for-manager
          v-for="member in memberInfo[0]"
          :key="member.user_id"
          :memberName="member.user_name"
          :memberId="member.user_id"
        ></member-item-for-manager>
      </div>
    </div>
  </div >
</section>
</template>

<script>
import MemberItemForManager from './MemberItemForManager.vue';
import MemberItemForMember from './MemberItemForMember.vue';

export default {
  components: {
    'member-item-for-manager': MemberItemForManager,
    'member-item-for-member': MemberItemForMember,
  },
  inject: ['memberInfo', 'userRole'],
  computed: {
    isManager() {
      if (this.userRole[0] === 'MANAGER') {
        return true;
      }
      return false;
    },
  },
};
</script>
