<template>
  <div class="container-fluid w-75">
    <div class="d-flex flex-row mb-6 column-gap-3">
      <div class="row">
        <FoodCardCart v-for="food in foodCart" :key="food.id" :food="food" />
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h5>Total Price:</h5>
        <p>{{ totalPrice }}</p>
      </div >
      <button @click.prevent="payment" class="btn btn-success" type="button" style="position: fixed; bottom: 2%; left: 80%; right: 0; width: 100px;"> Order</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import FoodCardCart from '../components/FoodCardCart.vue'
import { useFoodieStore } from '../stores/foodieStore'
export default {
  data() {
    return {
      subTotal: '',
      qty: 0,
      formatedCurrency: ''
    }
  },
  components: {
    FoodCardCart
  },
  computed: {
    ...mapWritableState(useFoodieStore, ['foodCart', 'totalPrice']),

  }, methods: {
    ...mapActions(useFoodieStore, ['getFoodInMyCart', 'payment']),
    totalPriceCounter() {
      const priceArr = this.foodCart.map((el) => {
        return el.Food.price;
      });
      let subTot = priceArr.reduce((a, b) => a + b, 0);
      this.totalPrice = subTot
    }
  },
  created() {
    this.getFoodInMyCart()
    this.totalPriceCounter()
  },
}
</script>

<style></style>