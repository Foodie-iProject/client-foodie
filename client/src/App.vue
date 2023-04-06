<script >
import { mapActions, mapState, mapWritableState } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import { useFoodieStore } from './stores/foodieStore'
import Navbar from './components/Navbar.vue'


export default {
  components: {
    Navbar
  },
  computed: {
    ...mapWritableState(useFoodieStore, ['isLogin', 'name'])
  },
  methods: {
    ...mapActions(useFoodieStore, ['fetchAllFood'])
  },
  created() {
    this.fetchAllFood()
    if (localStorage.access_token) {
      this.isLogin = true
      this.name = localStorage.name
    }
  }
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>

