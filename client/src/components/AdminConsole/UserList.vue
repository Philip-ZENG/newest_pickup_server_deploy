<template>
  <section>
    <div
      class="container-fluid p-4"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <h1>User List</h1>
    </div>
    <br />
    <user-list-header></user-list-header>
    <user-list-card
      v-for="user in userData"
      :key="user.user_id"
      :user_id="user.user_id"
      :user_name="user.user_name"
      :user_email="user.email"
    ></user-list-card>
  </section>
</template>

<script>
import UserListHeader from './UserListHeader.vue';
import UserListCard from './UserListCard.vue';

export default {
  components: {
    'user-list-header': UserListHeader,
    'user-list-card': UserListCard,
  },
  inject: ['userData'],
};
</script>
