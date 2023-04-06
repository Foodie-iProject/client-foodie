<template>
  <div class="col-md-3">
    <div class="card" style="margin: 10px 0 10px 0; ">
      <div class="card-body text-center">
        <img class="card-img-top" style=" max-height: 150px; object-fit: contain;" :src="food.Food.imgUrl"
          :alt="food.Food.name">
        <p class="card-title">{{ food.Food.name }}</p>
        <hr>
        <p class="card-text">Rp. {{ food.Food.price }}</p>
        <i class="fas fa-star text-warning"></i>
        <button @click.prevent="removeHanlder(food.id)" class="btn btn-outline-secondary m-3" type="button">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useFoodieStore } from '../stores/foodieStore'
export default {
  props: ['food'],
  methods: {
    ...mapActions(useFoodieStore, ['removeItemFromCart', 'fetchAllFood']),
    removeHanlder(id) {
      this.removeItemFromCart(id)
      this.fetchAllFood()
    }
  }
}
</script>

<style></style>