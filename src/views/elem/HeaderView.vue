<template>
<header class="header">
    <div class="container">
      <div class="header-logo">
        <img src="../../assets/images/logogs2.png" alt="Logo" id="logohaut">
      </div>
      <nav class="header-nav">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/guitars">Guitars</a></li>
          <li><a href="/accessories">Accessories</a></li>
        </ul>
      </nav>
      <nav class="header-nav-login">
        <ul>
          <li v-if="!isLoggedIn"><a href="#" id="signup-btn">Sign Up</a></li>
          <li v-if="!isLoggedIn"><a href="#" id="login-btn">Log In</a></li>
          <li v-if="isLoggedIn"><a href="/manageAccount" id="manage-btn">Manage Account</a></li>
          <li v-if="isLoggedIn"><a href="#" id="logout-btn" @click="logout">Log out</a></li>
          
        </ul>
      </nav>

      <!--Modal window for signing up-->

      <section id="signup">

        <div id="signup-modal" class="modal">
          <div class="modal-content">
            <span class="close-signup" id="closeSignupButton">&times;</span>
            <h2>Sign Up</h2>
            <form @submit.prevent="addUser">
              <label for="signup-fname" class="labellog">First Name :</label>
              <input type="text" id="signup-fname" name="signup-fname" v-model="signupfname" required><br>

              <label for="signup-lname" class="labellog">Last name :</label>
              <input type="text" id="signup-lname" name="signup-lname" v-model="signuplname" required><br>

              <label for="signup-email" class="labellog">Email :</label>
              <input type="email" id="signup-email" name="signup-email" v-model="signupemail" required><br>

              <label for="signup-password" class="labellog">Password :</label>
              <input type="password" id="signup-password" name="signup-password" v-model="signuppassword" required><br>

              <label for="signup-cpassword" class="labellog">Confirm Password :</label>
              <input type="password" id="signup-cpassword" name="signup-cpassword" v-model="repeatPassword"
                required><br>

              <button class="rounded" type="submit">Sign Up</button>
            </form>
          </div>
        </div>

        <div id="signup-confirm" class="modal">
          <div class="modal-content-confirm">
            <img src="../../assets/images/check.webp" class="check">
            <h2>Account successfully created !!</h2>
          </div>
        </div>

        <div id="signup-error" class="modal">
          <div class="modal-content-error">
            <img src="../../assets/images/cancel.webp">
            <h2>Email is already associated to an account</h2>
          </div>
        </div>

      </section>

      <!--Modal window for logging in-->

      <section id="login">

        <div id="login-modal" class="modal">
          <div class="modal-content">
            <span class="close-login" id="closeLoginButton">&times;</span>
            <h2>Login</h2>
            <form>
              <label for="login-email" class="labellog">Email :</label>
              <input type="email" id="login-email" name="login-email" v-model="loginemail"><br>

              <label for="login-password" class="labellog">Password :</label>
              <input type="password" id="login-password" name="login-password" v-model="loginpassword"><br>

              <button class="rounded" type="submit" @click.prevent="login">Log in</button>
            </form>
          </div>
        </div>

        <div id="login-confirm" class="modal">
          <div class="modal-content-confirm">
            <img src="../../assets/images/check.webp" class="check">
            <h2>Successfully logged in !!</h2>
          </div>
        </div>


        <div id="login-error" class="modal">
          <div class="modal-content-error">
            <img src="../../assets/images/cancel.webp">
            <h2>Invalid email or password</h2>
          </div>
        </div>

      </section>










      <div class="header-search">
        <input type="text" placeholder="Search">
      </div>
      <div class="header-logo">
        <img src="../../assets/images/cart.png" alt="Logo" id="logocart">
      </div>
    </div>
  </header>
  </template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      users: [],
      isLoggedIn: false,
    }
  },
  mounted() {
    //SignUp

    //Vars

    var signupBtn = document.getElementById("signup-btn");
    var signupModal = document.getElementById("signup-modal");
    var closeSignupBtn = document.getElementById("closeSignupButton");
    var signupConfirm = document.getElementById("signup-confirm");
    signupConfirm.style.display = "none";

    //Buttons events

    signupBtn.onclick = function () {
      signupModal.style.display = "block";
    }

    closeSignupBtn.onclick = function () {
      signupModal.style.display = "none";
    }

    window.onclick = function (event) {
      if (event.target == signupModal) {
        signupModal.style.display = "none";
      }
    }

    window.onclick = function (event) {
      if (event.target == signupConfirm) {
        signupConfirm.style.display = "none";
      }
    }

    //Submit and add to the list TODO add to database


    signupModal.style.display = "none";


    //Login

    //Vars

    var loginBtn = document.getElementById("login-btn");
    var loginModal = document.getElementById("login-modal");
    var closeLoginBtn = document.getElementById("closeLoginButton");
    var loginConfirm = document.getElementById("login-confirm");
    loginConfirm.style.display = "none";

    //Buttons events

    loginBtn.onclick = function () {
      loginModal.style.display = "block";
    }

    closeLoginBtn.onclick = function () {
      loginModal.style.display = "none";
    }

    window.onclick = function (event) {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
    }

    window.onclick = function (event) {
      if (event.target == loginConfirm) {
        loginConfirm.style.display = "none";
      }
    }

    //Submit and add to the list TODO add to database


    loginModal.style.display = "none";

    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }

  },
  methods: {

    addUser() {

      const user = {
        firstName: this.signupfname,
        lastName: this.signuplname,
        email: this.signupemail,
        password: this.signuppassword,
        repeatPassword: this.repeatPassword,
      };

      axios.post('http://localhost:3000/api/register', user)
        .then(response => {

          this.users.push(response.data.user);

          const signupConfirm = document.getElementById('signup-confirm');
          signupConfirm.style.display = 'block';
          setTimeout(() => {
            signupConfirm.style.opacity = '0';
            setTimeout(() => {
              signupConfirm.style.display = 'none';
              signupConfirm.style.opacity = '1';
            }, 1000);
          }, 2000);
        })
        .catch(error => {

          const signupError = document.getElementById('signup-error');
          signupError.style.display = 'block';
          setTimeout(() => {
            signupError.style.opacity = '0';
            setTimeout(() => {
              signupError.style.display = 'none';
              signupError.style.opacity = '1';
            }, 1000);
          }, 2000);
          console.error(error.response);
        })
        .finally(() => {

          this.signupfname = '';
          this.signuplname = '';
          this.signupemail = '';
          this.signuppassword = '';
          const signupModal = document.getElementById('signup-modal');
          signupModal.style.display = 'none';
        });
    },
    login() {

      const credentials = {
        email: this.loginemail,
        password: this.loginpassword,
      };

      axios.post('http://localhost:3000/api/login', credentials)
        .then(response => {

          const token = response.data.token;
          const userId = response.data.userId;

          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);

          const loginConfirm = document.getElementById('login-confirm');
          loginConfirm.style.display = 'block';
          this.isLoggedIn = true;
          setTimeout(() => {
            loginConfirm.style.opacity = '0';
            setTimeout(() => {
              loginConfirm.style.display = 'none';
              loginConfirm.style.opacity = '1';
            }, 1000);
          }, 2000);
        })
        .catch(error => {
          const loginError = document.getElementById('login-error');
          loginError.style.display = 'block';
          setTimeout(() => {
            loginError.style.opacity = '0';
            setTimeout(() => {
              loginError.style.display = 'none';
              loginError.style.opacity = '1';
            }, 1000);
          }, 2000);
          console.error(error);
        })
        .finally(() => {
          this.loginemail = '';
          this.loginpassword = '';
          const loginModal = document.getElementById('login-modal');
          loginModal.style.display = 'none';
        });
    },
    logout() {
  const confirmed = window.confirm("Are you sure you want to logout?");

  if (confirmed) {
    const token = localStorage.getItem('token');

    if (token) {
      axios.post('http://localhost:3000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          this.isLoggedIn = false;
          console.log("Logout successful");
          this.$router.push('/home');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
},

  }
};





</script>

<style src="../../assets/css/Header.css"></style>