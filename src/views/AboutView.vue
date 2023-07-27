<template>
  <div>
    <HeaderPart />

    <main class="main">
      <div class="about">
        <h1>About us</h1>
        <p class="parag">
          Welcome to GuitarShop - Where Strings Come to Party!
          Hey there, fellow guitar aficionados! If you're tired of being stuck in the same old musical rut, fear not, because GuitarShop is here to rescue you from your musical misery. We're not your typical run-of-the-mill guitar store; we're the wild child of the guitar world, the rebel with six strings!
          Why settle for "meh" when you can have "OMG!"? Our guitars are handpicked by a team of tone snobs who believe that every strum should be an adventure. From bluesy bends to face-melting solos, we've got a guitar for every riff and riff for every guitar!
          And oh, our collection of accessories! It's like a treasure trove for all the guitar gearheads out there. Fancy a pedal that makes your guitar sound like a caffeinated unicorn? We've got it! Need a strap that screams "rockstar on the loose"? Check, check, and check!
          But wait, there's more! Our customer service team is a band of merry troubadours who are always ready to serenade you with support and answer all your burning guitar questions. They can even tell you the best guitar jokes in the world (we're not kidding, they're stringin'ly hilarious)!
          So, whether you're a shredding maestro or a plucking prodigy, come join the GuitarShop family. We promise you'll leave with a smile on your face and music in your heart. Let's rock 'n' roll, baby! 🎸😎
        </p>
      </div>
    </main>

    <FooterPart />
  </div>
</template>

<script>
import HeaderPart from './elem/HeaderView.vue';
import FooterPart from './elem/FooterView.vue';

export default {
  components: {
    HeaderPart,
    FooterPart,
  },
};
</script>

<style>
/* Add styles for the About page */
@media (min-width: 1024px) {
  .about {
    min-height: 50vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 50vh;
  }

  .parag {
    font-size: 18px;
    text-align: center;
    margin-left: 50vh;
    margin-right: 50vh;
    margin-top: 10vh;
  }
}
</style>
