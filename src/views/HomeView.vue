<template>

  <div>

    <HeaderPart/>

    <main class="main">
      <div class="container">
        <section class="section">
          <h2 class="section-title">Current Offers</h2>
          <img src="../assets/images/lesp.png" alt="Logo" class="product">


        </section>
        <section class="section">
          <h2 class="section-title">Best of Guitars</h2>
          <img src="../assets/images/strat.png" alt="Logo" class="product">

        </section>
        <section class="section">
          <h2 class="section-title">Best of Accessories</h2>
          <img src="../assets/images/prs.png" alt="Logo" class="product">

        </section>
      </div>
    </main>

    <FooterPart/> 
  </div>
</template>


<script>
import HeaderPart from './elem/HeaderView.vue';
import FooterPart from './elem/FooterView.vue';

export default {
  components: {
    HeaderPart,
    FooterPart
  },

}
</script>


<style src="../assets/css/home.css"></style>




