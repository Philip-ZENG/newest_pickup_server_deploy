<template>
  <div class="personalInfo">
    <div class="container-fluid p-4 heading">
      <!-- style="background-image: linear-gradient(to bottom, #64e6bf, #9198e5)" -->
      <h1>Settings</h1>
    </div>
    <div class="card mx-auto m-4 w-50">
      <h5 class="card-header text-center p-2">Password Settings</h5>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form @submit.prevent="checkOldPassword">
          <label for="OriginPassword">
            <p>Origin Password</p>
            <input
              type="password"
              id="OriginPassword"
              v-model="originPassword"
              placeholder="original password"
              class="mt-2"
            />
          </label>
        </form>
        <form @submit.prevent="checkAndResetPassword">
          <label for="password1">
            <p>Password</p>
            <input
              type="password"
              id="password1"
              v-model="password"
              placeholder="new password"
              class="mt-2"
            />
          </label>
          <br />
          <label for="password2">
            <p>Confirm new Password</p>
            <input
              type="password"
              id="password2"
              v-model="passwordVerify"
              placeholder="new password"
              class="mt-2"
            />
          </label>
          <br />
          <button type="submit" class="mx-auto m-3" v-on:click="updatePassword">
            Reset password
          </button>
        </form>
      </div>
    </div>

    <div class="card mx-auto m-4 w-50">
      <h5 class="card-header text-center p-3">User Name</h5>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form @submit.prevent="updateUserName">
          <label for="userName">
            <p>New User name</p>
            <input id="userName" v-model="userName" placeholder="Your new user name" class="mt-2" />
          </label>
          <br />
          <button type="submit" class="mx-auto m-3">Reset User Name</button>
        </form>
      </div>
    </div>

    <div class="card mx-auto m-4 w-50">
      <h5 class="card-header text-center p-3">Contact</h5>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form @submit.prevent="updateContact">
          <label for="contact">
            <p>New Contact</p>
            <input
              id="contact"
              v-model="contact"
              placeholder="Your new contact Information"
              class="mt-2"
            />
          </label>
          <br />
          <button type="submit" class="mx-auto m-3">Reset contact</button>
        </form>
      </div>
    </div>
    <div class="card mx-auto m-4 w-50">
      <h5 class="card-header text-center p-3">Gender</h5>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form @submit.prevent="updateGender">
          <label for="gender">
            <p>Your Gender</p>
            <input
              id="gender"
              v-model="gender"
              placeholder="Describe Your Gender"
              class="mt-2"
            />
          </label>
          <br />
          <button type="submit" class="mx-auto m-3">Reset Gender</button>
        </form>
      </div>
    </div>
    <div class="card mx-auto m-4 w-50">
      <h5 class="card-header text-center p-3">Bio</h5>
      <div class="card-body">
        <div id="alert" v-if="alert">{{ alert }}</div>
        <form @submit.prevent="updateBio">
          <label for="Bio">
            <p>New Bio</p>
            <textarea id="Bio" v-model="Bio" placeholder="Show Yourself more!" class="mt-2" />
          </label>
          <br />
          <button type="submit" class="mx-auto m-3">Update Bio</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;

const SETTING_PASSWORD_URL = 'http://54.172.232.138:4004/setting/password';
const SETTING_NAME_URL = 'http://54.172.232.138:4004/setting/name';
const SETTING_CONTACT_URL = 'http://54.172.232.138:4004/setting/contact';
const SETTING_GENDER_URL = 'http://54.172.232.138:4004/setting/gender';
const SETTING_BIO_URL = 'http://54.172.232.138:4004/setting/bio';
// Initialize Userfront
// Userfront.init("demo1234");

export default {
  data() {
    return {
      originPassword: null, // the originPassword gets from the input box
      password: null, // the new gets from the input box
      userName: '', // the new username gets from the input box
      Bio: '', // the updated biography gets from the input box
      contact: '', // the new contact information gets from the input box
      passwordVerify: '', // the verify new password
      alert: '', // the alert information if the new password and the verify password is different
      gender: '', // the new gender information gets from the input box
    };
  },

  computed: {
    userId() {
      return Number(this.$store.getters.getUserId); // to get the user_id of the current user from the server
    },
  },

  methods: {
    checkAndResetPassword() {
      this.alert = '';
// check whether the new password and verify password is the same
      if (this.password !== this.passwordVerify) {
        this.alert = 'Passwords must match';
      }
    },
    /**
     * @description 
     * * upload the new data to the server if the operation is allowed
     * @serverFilePath
     * * server\profileAndSetting.js
     * @dataGet
     * * new Password
     */
    updatePassword() {
      const keyword = this.password;
      const id = this.$store.getters.getUserId;
      // send the new password and user_id to the server
      axios.post(SETTING_PASSWORD_URL, { password: keyword, user_id: id }).then((response) => {
        if (response.data.succeed) {
          alert('Password successfully chaged!');
        } else {
          alert('Failed to update password');
        }
      });
    },

    updateUserName() {
      const userNewName = this.userName;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_NAME_URL, { userName: userNewName, user_id: id }).then((response) => {
        if (response.data.succeed) {
          alert('User name successfully chaged!');
        } else {
          alert('Failed to update user name');
        }
      });
    },

    updateContact() {
      const contactInfo = this.contact;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_CONTACT_URL, { contact: contactInfo, user_id: id }).then((response) => {
        if (response.data.succeed) {
          alert('Contact info successfully chaged!');
        } else {
          alert('Failed to update contact info');
        }
      });
    },

    updateGender() {
      const genderInfo = this.gender;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_GENDER_URL, { gender: genderInfo, user_id: id }).then((response) => {
        if (response.data.succeed) {
          alert('Gender info successfully chaged!');
        } else {
          alert('Failed to update gender info');
        }
      });
    },

    updateBio() {
      const BioInfo = this.Bio;
      const id = this.$store.getters.getUserId;
      axios.post(SETTING_BIO_URL, { Bio: BioInfo, user_id: id }).then((response) => {
        if (response.data.succeed) {
          alert('Personal description successfully chaged!');
        } else {
          alert('Failed to update personal description');
        }
      });
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 7px;
  padding-left: 5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
#alert {
  color: red;
  margin-bottom: 10px;
}
button {
  background-color: #f66f6a;
  color: white;
  width: 175px;
  height: 50px;
  border: 0;
  font-size: 18px;
  box-sizing: content-box;
  border-radius: 20px;
}
button:hover {
  background-color: #f89998;
}
.heading {
  background-color: #b0fce5;
  background-image: linear-gradient(to bottom, #b0fce5, white);
}

#Bio {
  height: 300px;
  width: 500px;
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 7px;
  padding-left: 5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

#Bio:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
