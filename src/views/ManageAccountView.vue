<template>
    <div class="norml">
      
      <HeaderPart/>
  
      
      <div class="main-container">
        <div class="sidebar">
          <ul>
            <li :class="{ active: selectedOption === 'info' }"><a href="#" @click="showInfo">Your Informations</a></li>
            <li :class="{ active: selectedOption === 'email' }"><a href="#" @click="showEmail">Change Infos</a></li>
            <li :class="{ active: selectedOption === 'password' }"><a href="#" @click="showPassword">Change Password</a></li>
            <li :class="{ active: selectedOption === 'delete' }"><a href="#" @click="deleteUser">Delete User</a></li>
          </ul>
        </div>
  
        <div class="content">
          <div class="cont" v-if="selectedOption === 'info'">
            <h2>Your Informations</h2>
            <p>Here are your informations:</p>
            <div class="infodiv">
              <label>First Name:</label>
              <input type="text" v-model="fname" readonly class="inputInfo">
            </div>
            <div class="infodiv">
              <label>Last Name:</label>
              <input type="text" v-model="lname" readonly class="inputInfo">
            </div>
            <div class="infodiv">
              <label>Email:</label>
              <input type="text" v-model="email" readonly class="inputInfo"> 
            </div>
            <div class="infodiv">
              <label>Password:</label>
              <input type="text" v-model="password" readonly class="inputInfo">
            </div>
          </div>
          <div class="cont" v-if="selectedOption === 'email'">
            <h2>Change Infos</h2>
            <p>Change your informations here (leave blank if you don't want to change one):</p>
            <div class="infodiv">
              <label>Actual email:</label>
              <input type="text" v-model="actEmail" readonly class="inputInfo">
              <label>New email:</label>
              <input type="text" v-model="newEmail" class="inputInfo">
            </div>
              <div class="infodiv">
                <label>Actual first name:</label>
                <input type="text" v-model="actFName" readonly class="inputInfo">
                <label>New first name:</label>
                <input type="text" v-model="newFName"  class="inputInfo">
              </div>
             <div class="infodiv">
              <label>Actual last name:</label>
              <input type="text" v-model="actLName" readonly  class="inputInfo">
              <label>New last name:</label>
              <input type="text" v-model="newLName"  class="inputInfo">
            </div>
            <div class="divrounded">
              <button class="rounded" type="submit" @click.prevent="changeInfos">Change infos</button>
            </div>
          </div>
          <div class="cont" v-if="selectedOption === 'password'">
            <h2>Change Password</h2>
            <p>Change your password here:</p>
            <div class="infodiv">
              <label>New password:</label>
              <input type="password" v-model="newPassword"  class="inputInfo">
              <label>Confirm new password:</label>
              <input type="password" v-model="confirmPassword"  class="inputInfo">
            </div>
            <div class="divrounded">
              <button class="rounded" type="submit" @click.prevent="changePassword">Change password</button>
            </div>
          </div>
          <div class="cont" v-if="selectedOption === 'delete'">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete your account?</p>
            <div class="divrounded">
              <button class="rounded" type="submit" @click.prevent="deleteAccount">Delete your account</button>
            </div>
            
          </div>
        </div>
      </div>
      <FooterPart/>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderPart from './elem/HeaderView.vue';
  import FooterPart from './elem/FooterView.vue';
  export default {
    components: {
      HeaderPart,
      FooterPart
    },
    data() {
      return {
        selectedOption: '',
        fname: '',
        lname: '',
        email: '',
        password: '',
        actEmail: '',
        newEmail:'',
        actFName: '',
        newFName:'',
        actLName:'',
        newLName:'',
        confirmPassword:'',
        newPassword:'',
      };
    },
    methods: {
      showInfo() {
        this.selectedOption = 'info';
        const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (userId && token) {
        axios
          .post('http://localhost:3000/api/me', { userId }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.fname = response.data.firstName;
            this.lname = response.data.lastName;
            this.email = response.data.email;
            this.password = response.data.password;
          })
          .catch(error => {
            console.error(error);
          });
      }
      },
      showEmail() {
        this.selectedOption = 'email';
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (userId && token) {
        axios
          .post('http://localhost:3000/api/me', { userId }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.actEmail = response.data.email;
            this.actFName = response.data.firstName;
            this.actLName = response.data.lastName;
          })
          .catch(error => {
            console.error(error);
          });
      }
      },
      showPassword() {
        this.selectedOption = 'password';
      },
      deleteUser() {
        this.selectedOption = 'delete';
      },
      changeInfos(){
       

        const confirmed = window.confirm("Are you sure you want to change infos?");

        if(confirmed){

      
        let newEmail = this.newEmail;
        if(newEmail==''){
          newEmail = this.actEmail;
        }
        let newFName = this.newFName;
        if(newFName==''){
          newFName = this.actFName;
        }
        let newLName = this.newLName;
        if(newLName==''){
          newLName = this.actLName;
        }
        
        console.log(newEmail, newFName, newLName);
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (userId && token) {
          axios
          .post('http://localhost:3000/api/update-user', { userId, newEmail, newFName, newLName}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data.token);
            this.newFName='';
            this.newLName='';
            this.newEmail='';
            //this.$router.push('/manageAccount');
            this.showInfo();
          })
          .catch(error => {
            console.error(error);
          });
        }
      }
    },
    changePassword(){

      const confirmed = window.confirm("Are you sure you want to change your password ?");


      if(confirmed){

      const newPassword = this.newPassword;
      const confirmPsswd = this.confirmPassword;

      if (newPassword==confirmPsswd){

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if(token&&userId){

        

        axios.post('http://localhost:3000/api/update-password', {userId, newPassword}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data.token);
            //this.$router.push('/manageAccount');
            this.newPassword='';
            this.confirmPassword='';
            this.showInfo();
          }
          )
          .catch(error => {
            console.error(error);
          }
          )



      }
    }else{
      alert('The two passwords are not exactly the same please retry');
      this.newPassword='';
      this.confirmPassword='';
    }





    }
  },
  deleteAccount(){

    const conf = window.confirm('Are you sure you want to delete your account ?');
    if(conf){

    
    const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if(token&&userId){



          axios.post('http://localhost:3000/api/delete-user', {userId}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data.token);
            //this.$router.push('/manageAccount');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            this.isLoggedIn = false;
            this.$router.push('/home');
          }
          )
          .catch(error => {
            console.error(error);
          }
          )



        }
      }



  },
    },
  };
  </script>

<style src="../assets/css/manageAccount.css"></style>