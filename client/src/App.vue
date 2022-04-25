<template>
  <section>
    <section>
      <nav class="navbar navbar-expand-lg navbar-light" id="navigationBar">
        <div class="container-fluid">
          <router-link class="navbar-brand the-brand" to="/">PickUp</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav" v-if="getIsUser">
              <li class="nav-item">
                <router-link class="nav-link" to="/userHome">Home</router-link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Activity Management
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <router-link class="dropdown-item" to="/activityCreation"
                      >Create Activity</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/activityList"
                      >My Activity List</router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Personal Center
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <router-link class="dropdown-item" to="/personalInfo"
                      >Personal Information</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/setting">Setting</router-link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="navbar-nav" v-if="getIsAdmin">
              <li class="nav-item">
                <router-link class="nav-link" to="/adminConsole">Manage User Account</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/adminAccountList"
                  >Manage Admin Account</router-link
                >
              </li>
            </ul>
          </div>
          <ul style="list-style-type: none">
            <li class="nav-item" v-if="getIsUser || getIsAdmin">
              <button
                class="btn btn-outline-primary btn-lg"
                @click="logout"
                style="border-width: 1.5px; font-weight: bolder"
              >
                Logout
              </button>
            </li>
            <li class="nav-item" v-if="getIsGuest">
              <button
                class="btn btn-outline-primary btn-lg"
                @click="redirectToLogIn"
                style="border-width: 1.5px; font-weight: bolder"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </section>
    <router-view />
  </section>
</template>

<script>
export default {
  computed: {
    getIsLogIn() {
      return this.$store.getters.getIsLogIn;
    },
    getIsUser() {
      return this.$store.getters.getIsUser;
    },
    getIsGuest() {
      return this.$store.getters.getIsGuest;
    },
    getIsAdmin() {
      return this.$store.getters.getIsAdmin;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setIsLogIn', { isLogIn: false });
      this.$store.dispatch('setIsUser', { isUser: false });
      this.$store.dispatch('setIsAdmin', { isAdmin: false });
      this.$store.dispatch('setUserId', { userId: null });
      this.$store.dispatch('setIsGuest', { isGuest: true });
      this.$router.push('/');
    },
    redirectToLogIn() {
      this.$store.dispatch('setIsGuest', { isGuest: false });
      this.$router.push('/login');
    },
  },
};
</script>

<style>
/* Import google fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Ubuntu&display=swap');

.the-brand {
  font-size: 3rem;
  font-family: 'Montserrat', sans-serif;
}

#navigationBar {
  background-color: #64e6bf;
  background-image: linear-gradient(to bottom, #9198e5, #64e6bf);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
