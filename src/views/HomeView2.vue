<template>
    <div>
      <header class="header">
        <!-- ... -->
      </header>
  
      <!-- Modal window for signing up -->
      <section id="signup">
        <!-- ... -->
        <form @submit.prevent="addUser">
          <!-- ... -->
        </form>
      </section>
  
      <!-- Modal window for logging in -->
      <section id="login">
        <!-- ... -->
        <form>
          <!-- ... -->
          <button type="submit" @click.prevent="login">Log in</button>
        </form>
      </section>
  
      <main class="main">
        <!-- ... -->
      </main>
  
      <footer class="footer">
        <!-- ... -->
      </footer>
    </div>
  </template>
  
  <script>
  
  
  import axios from 'axios';
  
  
  export default {
    data() {
      return {
        signupfname: '',
        signuplname: '',
        signupemail: '',
        signuppassword: '',
        repeatPassword: '',
        loginemail: '',
        loginpassword: '',
        users: [],
      };
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
            console.error(error);
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
            console.error(error);
          })
          .finally(() => {
            this.loginemail = '';
            this.loginpassword = '';
            const loginModal = document.getElementById('login-modal');
            loginModal.style.display = 'none';
          });
      },
    },
  };
  </script>
  
  <style src="../assets/css/home.css"></style>