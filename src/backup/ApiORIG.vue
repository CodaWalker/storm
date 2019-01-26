<script>
  import root from './../../main'
export default {
    //components: {root},
    data: () => ({

           showingModal:false,
           showingeditModal: false,
           showingdeleteModal: false,
           errorMessage : "",
           successMessage : "",
           users: [],
           newUser: {nickName: "", email: "", password: ""},
           clickedUser: {},


    }),
    mounted: function () {
        console.log("Hi KK");
        this.getAllUsers();
    },
    methods: {
        getAllUsers: function(){
            root.axios.get("http://storm/api2.php?action=read&obj=users")
                .then(response => {
                    if (response.data.error) {
                        this.errorMessage = response.data.message;
                    } else {
                        this.users = (response.data.users);
                        //console.log(this.users);
                        //return this.users
                    }
                });
        },
        saveUser:function(){

            let formData = this.toFormData(this.newUser);
            root.axios.post("http://storm/api2.php?action=create&obj=users", formData)
                .then(response => {
                    console.log(response);
                    this.newUser = {nickName: "", email: "", password: ""};
                    if (response.data.error) {
                        this.errorMessage = response.data.message;
                    }else{
                        this.successMessage = response.data.message;
                        this.getAllUsers();
                    }
                });
        },
        updateUser:function(){

            let formData = this.toFormData(this.clickedUser);
            root.axios.post("http://storm/api2.php?action=update&obj=users", formData)
                .then(response => {
                    console.log(response);
                     this.clickedUser = {};
                    if (response.data.error) {
                        this.errorMessage = response.data.message;
                    }else{
                        this.successMessage = response.data.message;
                        this.getAllUsers();
                    }
                });
        },
        deleteUser:function(){

            let formData = this.toFormData(this.clickedUser);
            root.axios.post("http://storm/api2.php?action=delete&obj=users", formData)
                .then(response => {
                    console.log(response);
                    this.clickedUser = {};
                    if (response.data.error) {
                        this.errorMessage = response.data.message;
                    }else{
                        this.successMessage = response.data.message;
                        this.getAllUsers();
                    }
                });
        },
        selectUser(user){
            this.clickedUser = user;
        },

        toFormData: function(obj){
            let form_data = new FormData();
            for ( let key in obj ) {
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
        clearMessage: function(){
            this.errorMessage = "";
            this.successMessage = "";
        },

    }
  }

</script>
<template>
  <div>
    <div class="crud_header">
      <h1 class="left">Список пользователей зарегестрированных в системе:</h1>
      <button class="right addnew" @click="showingModal = true;">Add New</button>
      <div class="fix"></div>
    </div>

    <hr>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
    <p class="successMessage" v-if="successMessage">{{successMessage}}</p>

    <table class="list">
      <tr>
        <th>ID</th>
        <th>nickName</th>
        <th>Email</th>
        <th>Password</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.nickName}}</td>
        <td>{{user.email}}</td>
        <td>{{user.password}}</td>
        <td><button @click="showingeditModal = true; selectUser(user)">Edit</button></td>
        <td><button @click="showingdeleteModal = true; selectUser(user)" >Delete</button></td>
      </tr>
    </table>
    <div class="fix"></div>
    <div class="modal col-md-6" id="addmodal" v-if="showingModal">
      <div class="modalheading">
        <p class="left">Add new user</p>
        <p class="right close" @click="showingModal = false;">x</p>
        <div class="fix"></div>
      </div>
      <div class="modalbody">
        <div class="modalcontent">
          <table class="form">
            <tr>
              <th>Usename</th>
              <th>:</th>
              <td><input type="text" placeholder="Usename" v-model="newUser.nickName"></td>
            </tr>
            <tr>
              <th>Email Adress</th>
              <th>:</th>
              <td><input type="email" placeholder="Email" v-model="newUser.email"></td>
            </tr>
            <tr>
              <th>Password</th>
              <th>:</th>
              <td><input type="text" placeholder="Password"  v-model="newUser.password"></td>
            </tr>
          </table>
          <div class="margin"></div>
          <button class="center"  @click="showingModal = false; saveUser();" >Add User</button>
        </div>
      </div>
    </div>
    <div class="modal col-md-6" id="editmodal" v-if="showingeditModal">
      <div class="modalheading">
        <p class="left">Edit user</p>
        <p class="right close" @click="showingeditModal = false;">x</p>
        <div class="fix"></div>
      </div>
      <div class="modalbody">
        <div class="modalcontent">
          <table class="form">
            <tr>
              <th>Usename</th>
              <th>:</th>
              <td><input type="text" placeholder="nickName" v-model="clickedUser.nickName"></td>
            </tr>
            <tr>
              <th>Email Adress</th>
              <th>:</th>
              <td><input type="email" placeholder="Email Adress" v-model="clickedUser.email"></td>
            </tr>
            <tr>
              <th>Password</th>
              <th>:</th>
              <td><input type="text" placeholder="Password"  v-model="clickedUser.password"></td>
            </tr>
          </table>
          <div class="margin"></div>
          <button class="center"  @click="showingeditModal = false; updateUser()">Update User</button>
        </div>
      </div>
    </div>
    <div class="modal col-md-6" id="deletemodal" v-if="showingdeleteModal">
      <div class="modalheading">
        <p class="left">Delete user</p>
        <p class="right close" @click="showingdeleteModal = false;">x</p>
        <div class="fix"></div>
      </div>
      <div class="modalbody">
        <div class="modalcontent">

          <div class="margin"></div>
          <h3 class="center">Are you sure to Delete?</h3>
          <div class="margin"></div>
          <h4 class="center">{{clickedUser.nickName}}</h4>
          <div class="margin"></div>
          <div class="col-md-6 center">
            <button class="left" @click="showingdeleteModal = false; deleteUser()">YES</button>
            <button class="right" @click="showingdeleteModal = false;">NO</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
  *{
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #e0e0e0;

  }
  .left{
    float: left;
    display: block;
    overflow: hidden;
  }
  .right{
    float: right;
  }
  .fix{

    overflow: hidden;
    clear: both;
  }
  h1{
    font-size: 25px;

  }
  button{
    padding: 0 15px;
    border: 0;
    background: #02a2ff;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    outline: 0;
  }
  div#root {

    margin-top: 50px;
    background: #f3f3f3;
    padding: 50px;
  }
  table.list{
    width:100%;

  }
  table.list tr{

    margin: 5px!important;

    border: 1px solid #fff;
  }
  table.list th {
    background: #02a2ff;
    padding: 2px;
    text-align: center;
  }
  .crud_header {

    background: #e0e0e0;
    padding: 35px 22px 20px 20px;
  }
  table.list tr td{

    padding: 10px;

    margin: 2px!important;

    background: #ddd;

    overflow: hidden;

    text-align: center;

    margin-top: 5px;

    border-right: 1px solid #fff;
  }
  .modal{

    top: 99px;
    left:0;
    right:0;
    bottom:0;
    position: fixed;
    background: #b5b5b5fc;
    margin: 0 auto;
    display: block;
    padding: 0;
    height: 300px;
    width: 30%;
    min-width: 280px;
    box-shadow: 0 0 130px 28px #00000073;
  }
  .modalheading{
    background: #fff;
    padding: 5px;
    font-size: 17px;
    line-height: 32px;
  }
  .modalcontent {

    padding: 10px;
  }
  table.form {
    width: 100%;
  }
  .form tr{

    text-align: center;
    border-bottom: 5px solid #b6b6b6;
  }
  .form td{
    text-align: left;
    margin: 0 10px;
    border: 5px solid #b6b6b6;
  }
  .form th{

    text-align: right;

    border-right: 5px solid #b6b6b6;
  }
  .margin{
    margin: 30px 0;
  }
  .center {
    text-align: center;
    display: block;
    margin: 0 auto;
  }
  p.errorMessage {
    background: #ffbaba;
    padding: 10px;
    border-left: 5px solid #f00;
  }
  p.successMessage {
    background: #a2ffa2;
    padding: 10px;
    border-left: 5px solid #008c1e;
  }
  .form td input {
    border-radius:4px;
    border-style: solid;
    padding:5px 10px;
    outline: 0;
  }
</style>
