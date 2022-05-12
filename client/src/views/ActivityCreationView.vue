<template>
  <table class="showTable" cellspacing="0" cellpadding="0" align="center">
    <tr
      height="125px"
      width="100%"
      class="heading p-4"
      style="
        background-color: #b0fce5;
        background-image: linear-gradient(to bottom, #b0fce5, white);
      "
    >
      <td width="50%" align="right"><h1>Post a New Event</h1></td>
      <td width="50%" align="center">
        <button class="postButton" @click="postActivity" style="font-weight: bold; font-size: 20px">
          Post
        </button>
      </td>
    </tr>
    <tr height="75px" width="100%">
      <!--type line-->
      <td width="20%" align="left" class="pt-4">
        <h3 style="margin-left: 200px">Activity Type</h3>
      </td>
      <td width="80%" align="left" class="pt-4">
        <button
          class="singleSelect"
          :class="{ chosen: typeActive('Sports') }"
          @click="getType('Sports')"
        ></button
        ><span>Sports</span>
        <button
          class="singleSelect"
          :class="{ chosen: typeActive('Meals') }"
          @click="getType('Meals')"
        ></button
        ><span>Meals</span>
        <button
          class="singleSelect"
          :class="{ chosen: typeActive('Travel') }"
          @click="getType('Travel')"
        ></button
        ><span>Travel</span>
        <button
          class="singleSelect"
          :class="{ chosen: typeActive('Shop online') }"
          @click="getType('Shop online')"
        ></button
        ><span>Shop online</span>
        <button
          class="singleSelect"
          :class="{ chosen: typeActive('Carpool') }"
          @click="getType('Carpool')"
        ></button
        ><span>Carpool</span>
      </td>
    </tr>
    <tr height="75px" width="100%">
      <!--title line-->
      <td width="20%" align="left" class="pt-2">
        <h3 style="margin-left: 200px">Activity Title</h3>
      </td>
      <td width="80%" align="left" class="pt-2">
        <input
          v-model="title"
          placeholder="Type in your activity title here"
          style="width: 400px"
        />
      </td>
    </tr>
    <tr height="75px" width="100%">
      <!--time line-->
      <td width="20%" align="left"><h3 style="margin-left: 200px">Activity Time</h3></td>
      <td width="80%" align="left">
        <datepicker v-model="dateinput" :disabled-dates="{ to: new Date() }">
          <template v-slot:belowDate>
            <div style="height: 0px"></div>
          </template>
        </datepicker>
        <span> - </span>
        <select v-model="hour" style="height: 50px">
          <option v-for="(h, index) in hours" :key="index">{{ h }}</option>
        </select>
        <span> : </span>
        <select v-model="min" style="height: 50px">
          <option v-for="(m, index) in mins" :key="index">{{ m }}</option>
        </select>
      </td>
    </tr>
    <tr height="75px" width="100%">
      <!--number line-->
      <td width="30%" align="left"><h3 style="margin-left: 200px">No. of Members</h3></td>
      <td width="70%" align="left">
        <button
          class="singleSelect"
          :class="{ chosen: numberActive(2) }"
          @click="getNumber(2)"
        ></button
        ><span>Two</span>
        <button
          class="singleSelect"
          :class="{ chosen: numberActive(3) }"
          @click="getNumber(3)"
        ></button
        ><span>Three</span>
        <button
          class="singleSelect"
          :class="{ chosen: numberActive(4) }"
          @click="getNumber(4)"
        ></button
        ><span>Four</span>
        <button
          class="singleSelect"
          :class="{ chosen: numberActive('other') }"
          @click="
            otherNumSelected = true;
            number = null;
          "
        ></button>
        <span>More</span>
        <input
          v-model="otherNumber"
          style="width: 25px; height: 25px; margin-left: 5px"
          onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          :disabled="!otherNumSelected"
        />
      </td>
    </tr>
    <tr height="75px" width="100%">
      <!--Description line-->
      <td width="20%" align="left"><h3 style="margin-left: 200px">Activity Description</h3></td>
      <td width="80%" align="left">
        <input
          v-model="description"
          placeholder="Type in your activity description here ..."
          style="width: 400px"
        />
      </td>
    </tr>
    <tr height="75px" width="100%">
      <!--location line-->
      <td width="20%" align="left"><h3 style="margin-left: 200px">Activity Location</h3></td>
      <td width="80%" align="left">
        <select v-model="location" :disabled="!typeSelected" style="width: 250px">
          <option disabled value="">Please select one type</option>
          <option v-for="(location, index) in locations" :key="index">{{ location }}</option>
        </select>
      </td>
    </tr>
  </table>
</template>

<script>
/* eslint-disable */
import Datepicker from 'vuejs3-datepicker';

const axios = require('axios').default;

export default {
  components: {
    Datepicker,
  },

  data() {
    return {
      user_id: null, //store the user id
      type: null, //store the type of the activity
      title: null, //store the title of the activity
      number: null, //store the number of members of the activity, we provide 2,3 and 4
      otherNumber: null, //store the number of members of the activity if user want other number of members
      description: null, //store the description of the activity
      location: null, //store the location of the activity
      typeSelected: false, //used to check if the user select one type
      otherNumSelected: false, //used to check if the user want other number of members
      dateinput: new Date(), //store the date of the activity
      hour: '00',
      min: '00',
      hours: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
      ],
      mins: ['00', '15', '30', '45'],
    };
  },

  computed: {
    //return a list of location for a certain type of activitys
    locations() {
      const locs = [
        [
          'Muse Basketball Court',
          'Diligentia Basketball Court',
          'University Sports Hall',
          'Da Yun Sports',
        ],
        [
          'Diligentia Canteen',
          'Muse Canteen',
          'Pandora Canteen',
          'Second Floor of SAC',
          'Harmonia Canteen',
          'Shaw Canteen',
        ],
        ['In Shenzhen', 'Out of Shenzhen'],
        ['Diligentia College', 'Muse College', 'Harmonia College', 'Shaw College'],
        ['Longgang District', 'other District'],
      ];
      if (this.type === 'Sports') return locs[0];
      if (this.type === 'Meals') return locs[1];
      if (this.type === 'Travel') return locs[2];
      if (this.type === 'Shop online') return locs[3];
      if (this.type === 'Carpool') return locs[4];
      return [];
    },
    //return the final number of members of the activity
    finalNumber() {
      if (this.otherNumSelected) {
        if (this.otherNumber === null) return null;
        return this.otherNumber;
      } else {
        if (this.number === null) return null;
        return this.number;
      }
    },
    //return the calculated time of the acitivity which is in the form of yyyy-mm-dd-hh-min
    finalTime() {
      // eslint-disable-next-line
      return this.dateToString(this.dateinput) + ' ' + this.hour + ':' + this.min;
    },
    //return the warning message if the user dose not give enough information of the activity
    warningMessage() {
      if (this.type === null) return 'You need to give the activity type';
      if (this.title === null) return 'You need to give the activity title';
      if (this.finalNumber === null) return 'You need to give the number of members';
      if (this.location === null) return 'You need to give the activity location';
      if (this.description === null) return 'You need to give the activity description';
      return null;
    },
    //get the user id
    userId() {
      return Number(this.$store.getters.getUserId);
    },
  },

  methods: {
    /**
     * @description 
     * *get type input from user
     */
    getType(t) {
      this.typeSelected = true;
      this.type = t;
    },

    /**
     * @description 
     * *get number of member input from user
     */
    getNumber(num) {
      this.number = Number(num);
      this.otherNumSelected = false;
      this.otherNumber = null;
    },

    /**
     * @description 
     * *post a new PickUp proposal
     * *will check if the user has logged in
     * *and if the user provide enough information about the activity
     * @serverFilePath
     * *server\homeServer.js
     * @serverPort
     * *http://54.172.232.138:4001/postActivity
     * @dataPost
     * *title
     * *time
     * *location
     * *description
     * *number
     * *type
     * *user_id
     */
    postActivity() {
      if (this.userId === null || this.userId === 0) {
        alert('Please first login');
        this.switchTo('/login');
      } else {
        if (this.warningMessage != null) {
          alert(this.warningMessage);
        } else {
          axios
            .post('http://54.172.232.138:4001/postActivity', {
              title: this.title,
              time: this.finalTime,
              location: this.location,
              description: this.description,
              number: this.finalNumber,
              type: this.type,
              user_id: this.userId,
            })
            .then((response) => {
              console.log(response);
              alert('successfully post the activity');
              this.switchTo('/userHome');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    /**
     * @description 
     * *change the Date() form variable into string form
     */
    dateToString(date) {
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      let dateTime = '';
      if (month.length === 1) {
        // eslint-disable-next-line
        month = '0' + month; //add 0 to month if the month is of in range of 1-9
      }
      if (day.length === 1) {
        // eslint-disable-next-line
        day = '0' + day; //add 0 to day if the month is of in range of 1-9
      }
      // eslint-disable-next-line
      dateTime = year + '-' + month + '-' + day;
      return dateTime;
    },

    /**
     * @description 
     * *route to other page
     */
    switchTo(path) {
      this.$router.push(path);
    },

    //ckeck if the type is chosen and this will effect the class of css sytle
    typeActive(t) {
      if (t === this.type) return true;
      return false;
    },

    //ckeck if the number of members is chosen and this will effect the class of css sytle
    numberActive(n) {
      if (n === 'other') {
        if (this.otherNumSelected) return true;
        return false;
      }
      if (n === this.finalNumber) return true;
      return false;
    },
  },
};
</script>

<style scoped>
.showTable {
  width: 100%;
  border-width: 0px;
}

.postButton {
  height: 40px;
  width: 100px;
  border-radius: 5px;
  background-color: rgb(149, 193, 247);
  color: black;
  border: 0;
  font-size: 15px;
  box-sizing: content-box;
  border-radius: 15px;
}
.postButton:hover {
  background-color: rgb(131, 168, 253);
}

.singleSelect {
  height: 20px;
  width: 20px;
  margin: 0px 5px 0px 5px;
  background-color: #e3f2fd;
  border: 0;
  /* border-block-color: black; */
  /* font-size: 18px; */
  /* box-sizing: content-box; */
  border-radius: 4px;
}

.chosen {
  background-color: rgb(173, 255, 173);
}

.heading {
  background-color: #b0fce5;
  background-image: linear-gradient(to bottom, #b0fce5, white);
}

input {
  /* display: block; */
  margin-bottom: 5px;
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
</style>
