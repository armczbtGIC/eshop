
import axios from 'axios';

export const authLogic = {
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
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
},

  }
};




