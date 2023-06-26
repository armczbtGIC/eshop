<template>
    <div class="page-container">
      <div class="footer-logo">
        <img src="../../assets/images/logogs.png" alt="Logo">
      </div>
      <h1>
        Oops, you went the wrong way...
      </h1>
      <button @click.prevent="this.$router.push('/home')">Go home</button>
    </div>
  </template>
  
  <style>
  .page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: black;
  }
  
  h1 {
    color: white;
    font-family: Poppins;
    margin-top: 20px;
  }
  
  .footer-logo {
    margin-bottom: 20px;
  }
  

  </style>
  