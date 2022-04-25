# CSC4001 PROJECT



### Project directory specification

- Node.js Express Server: `/server`
  - Server: `server/index.js`
- Vue.js Client: `/client`
  - Home page: `client/src/views/HomeView.vue`
  - Activity creation page: `client/src/views/ActivityCreationView.vue`
  - Login page: `client/src/views/LoginView.vue`
  - Register page: `client/src/views/PersonalInfoView.vue`
  - Personal info page: `client/src/views/PersonalInfoView.vue`
  - Setting page: `client/src/views/SettingView.vue`
  - Activity list page: `client/src/views/ActivityListView.vue`
  - Activity Management page: `client/src/views/ActivityManagementView.vue`
  - Notification page: `client/src/views/NotificationView.vue`
- Database: `/database`
  - Database creatinon: `database/DatabaseCreation.sql`
  - Testing data creation: `database/TestingData.sql`
  - Fake data generation: `database/RandomDataGeneration`



### Development Stack & Environment Setup

- Graphical Demonstration

  ![](D:\MySQL\pickup\report\vue-node-express-mysql-architecture.png)

- JavaScript Runtime Environment: Node.js
  
  - Version: v14.18.0
  
- Front-end Framework: Vue.js 
  - Version: v3.2.13
  - Development Server
    - Vue CLI
  
- Front-end UI Component Library: Boostrap
  - Version: v5.1.3

- Back-end Framework: Express.js
  - Version: v4.17.3

- Database: MySQL
  - Version: v8.0.27 
  - Cloud Deployment: Amazon Web Service Remote Database System




### Database

- We can use either local mysql database or AWS Remote Database System

- AWS RDS info

  - AWS Cloud Console

    - https://console.aws.amazon.com

  - AWS ADMIN Account

    - ID: 888747168322
    - User Name: philip-admin
    - Password: CSC4001admin

  - AWS RDS "database-2 North Virginia", mySQL account

    - ```
      HOST: database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com
      username: admin
      password: qweasdzxc
      ```
  
  - Login to AWS RDS From terminal
  
    - ```shell
      mysql --host=database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com --user=admin --password=qweasdzxc
      ```



### Implication Specification

#### Database Specification

Attributes are list below; Constrains are listed after the attribute

- Implemented table

  - Database: pickup
  - Table Name: activity_user
    - activity_id: `INT`, `NOT NULL`, `FOREIGN KEY`, **ON DELETE CASCADE / ON UPDATE CASCADE**
    - user_id: `INT`, `NOT NULL`, `FOREIGN KEY`, **ON DELETE CASCADE / ON UPDATE CASCADE**
    - role: `VARCHAR(20)`, `NOT NULL`, value can only be one of the two`[MANAGER, MEMBER]`
  - Table Name: user_info
    - user_id: `INT`, `AUTO_INCREMENT`, `PRIMARY KEY`, `NOT NULL`
    - email: `VARCHAR(255)`, `UNIQUE`, `NOT NULL`
    - password: `VARCHAR(255)`, `NOT NULL`
    - user_name: `VARCHAR(255)`, `NOT NULL`
    - gender: `VARCHAR(20)`, value can only be one of the two `[MALE,FEMALE]`
    - contact_info: `VARCHAR(20)`
    - personal_intro: `VARCHAR(255)`
    - profile_photo: `VARCHAR(255)`
  - Table Name: activity_info
    - activity_id: `INT`, `AUTO INCREMENT`, `PRIMARY KEY`, `NOT NULL`
    - title: `VARCHAR(255)`, `NOT NULL`
    - time: `DATETIME`, `NOT NULL`
    - location: `VARCHAR(255)`
    - description: `VARCHAR(255)`
    - max_capacity: `INT`, `NOT NULL`
    - quota_left: `INT`
    - type:`VARCHAR(255)`, `NOT NULL`, value can only be one of the five `[Sports,Meals,Travel,GroupShopping,Carpool]`
  - Table Name: admin_account
    - admin_id: `INT`, `AUTO_INCREMENT`, `PRIMARY KEY`, `NOT NULL`
    - admin_email: `VARCHAR(255)`, `UNIQUE`, `NOT NULL`
    - admin_password: `VARCHAR(255)`, `NOT NULL`

- Table to implement

  - Following
    - Follower-id
    - Followee-id
  - Comment
    - Activity-id
    - User-id
    - Content
  - View History
    - User-id
    - Activity-id: list of viewed activity

- Fake data generation

  - Use `faker` package
  - Code can be see in `database\RandomDataGenerator`

  


#### Functions Specification

- User register/ User login (骆锴)
- User information editing (骆锴)
  - Change email
  - Change password
- Email Verification (骆锴)
  - Send verification code to user email and server
  - Verify the two code
  - Expire within 60 seconds
  - After verification succeed, store user account info into the database
- Create Activity (博一)
  - Time: minimum time unit every 15/30 minutes
- Activity Management (焯儒）
  - Edit existing activity information
  - Add/delete participants
  - Change manager: initiator is the default manager
- Activity Search (博一)
  - Given tag
  - Create Time (Ascending/Descending)
  - Need the least member to join
  - Heat
- Notification (焯儒)
  - Auto notify participants
  - Inform the participants 0.5 hour ahead
- User data isolation
  - Each user can only see his/her own personal data




#### Page Specification

- Main Page (博一)
  - Display and searching
  - Activity Creation
- Login Page (骆锴)
- Personal Information (骆锴)
- Activity Management (焯儒)
  - Activity Creation
  - Management
- Notification (焯儒)
- Navigation Bar (焯儒)




### How to run the demo

- Run the Express server

  - Run the following under the `/server` directory

    ```shell
    node index.js
    ```

- Run the Vue client

  - Run the following under the `/client` directory

    ```shell
    npm run serve
    ```

- Generate Fake data and insert into database

  - Run the following under the `/database/RandomDataGenerator` directory for the three files: `user_info.js`, `activity_info.js`, `activity_user.js`

    ```shell
    node file_name.js
    ```

    

### About the packages

Notice: All the packages should be installed under the project directory

#### For Express server

- cors

  - Allows the client to talk to the front end

  - Package link

    ```
    https://github.com/expressjs/cors
    ```

  - Install package

    ```shell
    npm install cors --save
    ```

- morgan

  - HTTP request logger middleware for node.js

  - Package link

    ```
    https://github.com/expressjs/morgan
    ```

  - Install package

    ```shell
    npm install morgan --save
    ```

- Body Parser

  - Serves for the communication of data package between the client and server. Usually for receiving client side data.

  - Package link

    ```
    https://github.com/expressjs/body-parser
    ```

  - Install package

    ```shell
    npm install body-parser --save
    ```

- MySQL

  - Package link

    ```
    https://github.com/mysqljs/mysql
    ```

  - Install the package that can link MySQL with NodeJS. Run the code under the project root directory.

    ```shell
    npm install mysql --save
    ```

    - Remark: This command `npm install` will install the package locally. Only to this project, in this path.

#### For Vue Client

- Default packages from vue cli project setup

The only extra package used is 

- Axios

  - For communication between Vue client and Express server

  - Package link

    ```
    https://github.com/axios/axios
    ```

  - Install package

    ```shell
    npm install axios --save
    ```

- Boostrap 5

  - UI Component library

  - Website

    ```
    https://getbootstrap.com/
    ```

  - Install library

    ```shell
    npm install bootstrap --save
    ```

- Vuex

  - Local data management center

  - Install package

    ```shell
    npm install vuex --save
    ```

    


### Testing

- API testing tool
  - Postman (Can initiate post and get request)



### Version control

- To avoid version control problems, please follow the procedure:

  - For every commit, commit to a new sub-branch other than the main branch
  - Setup a PULL REQUEST from github website after pushing
  - Conduct merge action from the github website

- Pushing command from terminal

  - Check current status

    - ```shell
      git status
      ```

  - Create a new branch

    - ```shell
      git checkout -b my_new_branch
      ```

  - Stage files

    - ```shell
      git add .
      ```

  - Commit

    - ```shell
      git commit -m "message"
      ```

  - Push

    - ```shell
      git push
      ```

- For conflicting version

  - Try pulling from the repository before pushing

- We can try to write `.gitignore` files to avoid uploading all the module files and we can download module files after pulling from github locally by

  ```shell
  npm install
  ```

  

### Learning Highlight

- JavaScript Asynchronous function
  - Callback
  - Promise
  - async\await
- DOM API
  - Insertion of vue components into the page
- Vue component
  - Reusable vue function block
  - Creation of vue component instance
- Scope of `this` in vue
  - In arrow function and normal function, `this` has different reference
    - In arrow function, `this` point to the JS context
    - In normal function, `this` refer to vue instance
  - In Promises, `this` does not refer to vue instance
    - Define `const that=this;` before entering a promise and use `that` inside promise, can solve this reference error



### Documentation

- For VS Code commenting, we use `Better Comments` plug-in
