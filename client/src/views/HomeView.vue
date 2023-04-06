<script >
import { mapActions, mapState, mapWritableState } from 'pinia';
import FoodCard from '../components/FoodCard.vue';
import { useFoodieStore } from '../stores/foodieStore';

export default {
  components: {
    FoodCard
  },
  computed: {
    ...mapState(useFoodieStore, ['foodList']),
    ...mapWritableState(useFoodieStore, ['defaultMaxPage', 'defaultPage', 'defaultSearch'])
  },
  methods: {
    ...mapActions(useFoodieStore, ['fetchAllFood']),
    nextPage() {
      this.defaultPage = this.defaultPage + 1
      this.$router.push({
        path: '/',
        query: {
          page: this.defaultPage, search: this.deafultSearch,
        }
      })
      this.fetchAllFood()
    },
    backPage() {
      this.defaultPage = this.defaultPage - 1
      this.$router.push({
        path: '/',
        query: {
          page: this.defaultPage, search: this.deafultSearch,
        }
      })
      this.fetchAllFood()
    },
    clickSearch() {
      this.defaultPage = 1
      this.$router.push({
        path: '/',
        query: {
          page: this.defaultPage, search: this.deafultSearch,
        }
      })
      this.fetchAllFood()
    },
  
  }
}
</script>

<template>
  <div class="container-fluid w-75">
    <div class="d-flex flex-row mb-3 column-gap-3">
      <div class="form-floating" style="width: 25%;">
        <input type="text" class="form-control" id="search" placeholder="Search" v-model="defaultSearch">
        <label for="search">Search food</label>
      </div>
      <div>
        <button @click.prevent="clickSearch" class="btn btn-outline-success" type="button"> Search</button>
      </div>
    </div>
    <div class="row">
      <FoodCard v-for="food in foodList" :key="food.id" :food="food" />
    </div>
  </div>
  <div>
    <div style="text-align: center; flex-direction: column; margin: 0 10px;">
      <button v-if="defaultPage > 1" class="btn btn-outline-secondary m-3" @click.prevent="backPage">
        Back
      </button>
      <button v-else-if="defaultPage = 1" disabled class="btn btn-outline-secondary m-3" @click.prevent="backPage">
        Back
      </button>
      <button class="btn btn-outline-secondary m-3" disabled>
        {{ defaultPage }}
      </button>
      <button v-if="defaultPage < defaultMaxPage" class="btn btn-outline-secondary m-3" @click.prevent="nextPage">
        next
      </button>
      <button v-else-if="defaultPage = defaultMaxPage" disabled class="btn btn-outline-secondary m-3"
        @click.prevent="nextPage">
        next
      </button>
    </div>
  </div>
</template>
