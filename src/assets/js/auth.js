import axios from 'axios';

export function login(credentials) {
    
       
  
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
      
  }
  
  export function signup(user) {

        
  
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
      
  }