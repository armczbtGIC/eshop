//SignUp

            //Vars

            var signupBtn = document.getElementById("signup-btn");
            var signupModal = document.getElementById("signup-modal");
            var closeSignupBtn = document.getElementById("closeSignupButton");
            var signupConfirm = document.getElementById("signup-confirm");
            signupConfirm.style.display = "none";

            //Buttons events

            signupBtn.onclick = function() {
                signupModal.style.display = "block";
            }

            closeSignupBtn.onclick = function() {
                signupModal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == signupModal) {
                    signupModal.style.display = "none";
                }
            }

            window.onclick = function(event) {
                if (event.target == signupConfirm) {
                    signupConfirm.style.display = "none";
                }
            }

            //Submit and add to the list TODO add to database


            signupConfirm.style.display = "block";
                setTimeout(function() {
                    signupConfirm.style.opacity = "0";
                    setTimeout(function() {
                        signupConfirm.style.display = "none";
                        signupConfirm.style.opacity = "1";
                    }, 1000);
                }, 2000);

                signupModal.style.display = "none";
          

//Login

            //Vars

            var loginBtn = document.getElementById("login-btn");
            var loginModal = document.getElementById("login-modal");
            var closeLoginBtn = document.getElementById("closeLoginButton");
            var loginConfirm = document.getElementById("login-confirm");
            loginConfirm.style.display = "none";

            //Buttons events

            loginBtn.onclick = function() {
                loginModal.style.display = "block";
            }

            closeLoginBtn.onclick = function() {
                loginModal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == loginModal) {
                    loginModal.style.display = "none";
                }
            }

            window.onclick = function(event) {
                if (event.target == loginConfirm) {
                    loginConfirm.style.display = "none";
                }
            }

            //Submit and add to the list TODO add to database


            loginConfirm.style.display = "block";
                setTimeout(function() {
                    loginConfirm.style.opacity = "0";
                    setTimeout(function() {
                        loginConfirm.style.display = "none";
                        loginConfirm.style.opacity = "1";
                    }, 1000);
                }, 2000);

                loginModal.style.display = "none";
          

