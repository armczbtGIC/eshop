<template>
  <div>
    <HeaderPart />
    <main class="main">
      <div class="cart">
        <h2>Shopping Cart</h2>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" alt="Product Image" class="product-image">
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>Price: {{ item.price }} $</p>
            <div class="quantity">
              <p>Quantity:</p>
              <button @click="decreaseQuantity(item)">-</button>
              <p>{{ item.quantity }}</p>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <p>Total: {{ item.total }} $</p>
            <button @click="removeFromCart(item)">Remove</button>
          </div>
        </div>
        <div class="total">
          <p>Total Amount: {{ totalAmount }} $</p>
        </div>
        <div class="cont">
            <h2>The content will be delivered at these informations:</h2>
            <div class="infodiv">
              <label>First Name:</label>
              <input type="text" v-model="fname" readonly class="inputInfo">
            </div>
            <div class="infodiv">
              <label>Last Name:</label>
              <input type="text" v-model="lname" readonly class="inputInfo">
            </div>
            <div class="infodiv">
              <label>Adress:</label>
              <input type="text" v-model="adress" readonly class="inputInfo">
            </div>
          </div>
        <button @click="validateOrder" class="checkout-button">Validate order</button>

        <div v-if="showModal" class="modal">
    <div class="modal-content">
      <h2>Order confirmed</h2>
      <p>Total Amount: {{ totalAmount }} $</p>
      <p>Delivery Address: {{ fname }} {{ lname }}, {{ adress }}</p>
      <button @click="closeModalAndClearCart">Close</button>
    </div>
  </div>
      </div>
    </main>
    <FooterPart />
  </div>
</template>

<script>
import HeaderPart from './elem/HeaderView.vue';
import FooterPart from './elem/FooterView.vue';
import axios from 'axios';

export default {
  components: {
    HeaderPart,
    FooterPart,
  },
  data() {
    return {
      cartItems: [
      ],
      lname:'',
      fname:'',
      adress:'',
      showModal: false, 
    };
  },
  mounted(){
    this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    this.showInfo();
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.total, 0);
    },
  },
  methods: {
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.total = item.price * item.quantity;
        this.updateLocalStorage();
      }
    },
    increaseQuantity(item) {
      item.quantity++;
      item.total = item.price * item.quantity;
      this.updateLocalStorage();
    },
    removeFromCart(item) {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.updateLocalStorage();
      }
    },
    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    showInfo() {
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
            this.adress = response.data.adress;
          })
          .catch(error => {
            console.error(error);
          });
      }
      },
      validateOrder() {
      if (this.cartItems.length === 0) {
        alert("The cart is empty.");
        return;
      }

      if (confirm("Are you sure you want to place this order?")) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const orderData = {
          userId,
          date: new Date().toISOString(),
          items: this.cartItems.map(item => ({ itemName: item.name, quantity: item.quantity })),
          total: this.totalAmount
        };

        axios
          .post('http://localhost:3000/api/addOrder', orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            this.showModal = true;
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },


    


    closeModalAndClearCart() {
      this.showModal = false;
      this.clearCart();
      this.$router.push("/home");
    },

    clearCart() {
      this.cartItems = [];
      localStorage.removeItem('cart');
    },
  },

      
  
};

</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.product-image {
  width: 80px;
  height: auto;
  margin-right: 10px;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.quantity {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.quantity p {
  margin: 0;
  margin-right: 5px;
}

button {
  cursor: pointer;
}

.total {
  margin-top: 20px;
}

.checkout-button {
  margin-top: 30px;
}

.cont {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.infodiv {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.infodiv label {
  margin-right: 10px;
}

.inputInfo {
  width: 200px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
