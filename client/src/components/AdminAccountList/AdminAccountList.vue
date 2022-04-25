<template>
  <section>
    <admin-account-list-head></admin-account-list-head>
    <admin-account-list-card
      v-for="admin in adminData"
      :key="admin.admin_id"
      :admin_id="admin.admin_id"
      :admin_email="admin.admin_email"
    ></admin-account-list-card>
  </section>
</template>

<script>
import AdminAccountListHead from './AdminAccountListHead.vue';
import AdminAccountListCard from './AdminAccountListCard.vue';

export default {
  components: {
    'admin-account-list-head': AdminAccountListHead,
    'admin-account-list-card': AdminAccountListCard,
  },
  inject: ['adminData'],
};
</script>
