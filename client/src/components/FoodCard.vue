<template>
  <div class="col-md-3" style="height:fit-content ;">
    <div class="card" style="margin: 10px 0 10px 0;">
      <div class="card-body text-center">
        <img class="card-img-top" style="max-height: 175px; object-fit: contain;" :src="food.imgUrl" :alt="food.name">
        <h5 class="card-title">{{ food.name }}</h5>
        <p class="card-text">Rp. {{ food.price }}</p>
        <i class="fas fa-star text-warning"></i>
        <button @click.prevent="addClickBtn(food.id)" class="btn btn-outline-secondary m-3" type="button"> Add
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
    ...mapActions(useFoodieStore, ['addToCart']),
    addClickBtn(id) {
      this.addToCart(id)
    }
  }
}
</script>

<style></style>