<template>
  <div>
    <HeaderPart />
    <main class="main">
      <div class="product">
        <div v-if="product" class="product-details">
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="product-image">
          </div>
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p>{{ product.bio }}</p>
            <div class="price-button">
              <p>{{ product.price }} $</p>
              <button @click="addToCart">Add to Cart</button>
            </div>
            <div v-if="showDialog" class="dialog">
              <div class="dialog-content">
                <p v-if="addedToCart" class="modaltext">Product added to cart!</p>
                <p v-else class="modaltext">Product already in cart, so we added one more !.</p>
                <button @click="closeDialog">Close</button>
              </div>
            </div>
            
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </main>
    <FooterPart />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderPart from './elem/HeaderView.vue';
import FooterPart from './elem/FooterView.vue';

export default {
  components: {
    HeaderPart,
    FooterPart,
  },
  data() {
    return {
      product: null,
      cart: [],
      showDialog: false,
      addedToCart: false,
    };
  },
  mounted() {
    this.fetchProductDetails();
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
  methods: {
    fetchProductDetails() {
      const productId = this.$route.params.id;
      const routePath = this.$route.path; // Get the current route's path

      let apiUrl = ''; // Initialize the API URL

      // Adjust the API URL based on the route path
      if (routePath.includes('/guitar')) {
        apiUrl = `http://localhost:3000/api/guitars/${productId}`;
      } else if (routePath.includes('/accessory')) {
        apiUrl = `http://localhost:3000/api/accessories/${productId}`;
      }

      // Make the API request
      axios
        .get(apiUrl)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addToCart() {
      const productId = this.product._id;
      const existingProduct = this.cart.find(item => item.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total = existingProduct.price * existingProduct.quantity;
        this.addedToCart = false;
      } else {
        this.cart.push({
          productId,
          name: this.product.name,
          bio: this.product.bio, 
          image: this.product.image, 
          price: this.product.price,
          quantity: 1,
          total: this.product.price // Initialize total with the product price
        });
        this.addedToCart = true;
      }

      this.updateLocalStorage();

      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.product-image-container {
  margin-bottom: 20px;
}

.product-image {
  width: 300px; 
  height: auto;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.price-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dialog button {
  margin-top: 10px;
}

.modaltext{
  color:black;
}
</style>
