<template>
  <section>
    <user-management-console></user-management-console>
  </section>
</template>

<script>
import UserManagementConsole from '../components/UserManagement/UserManagementConsole.vue';

export default {
  components: {
    'user-management-console': UserManagementConsole,
  },
};
</script>
