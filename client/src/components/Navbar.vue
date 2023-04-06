<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 80px;">
    <div class=" container-fluid navbar fixed-top navbar-dark bg-dark navbar-expand-lg " id="navbarNav">
      <ul class="navbar-nav">
        <div class="d-flex justify-content-around ms-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page">Fodie</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Food" class="nav-link">Food</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/cart" class="nav-link">Cart</RouterLink>
          </li>
        </div>
      </ul>
      <ul>
        <div class="d-flex gap-2">
          <div v-if="isLogin">
            <span class="navbar-text text-light">Hello, </span>
            <span class="navbar-text text-warning"> {{ name }}</span>
            <button @click.prevent="logout" class="btn btn-outline-danger"
              style="width:80px ; margin: 0px 10px 0 15px;">Logout
            </button>
          </div>
          <div v-else-if="!isLogin">
            <RouterLink to="/login" class="btn btn-outline-light" style="width:80px ; margin: 0px 10px  ;">Login
            </RouterLink>
            <RouterLink to="/register" class="btn btn-outline-light" style="width:80px ; margin: 0px 10px  ;">
              Register
            </RouterLink>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useFoodieStore } from '../stores/foodieStore'
export default {
  computed: {
    ...mapWritableState(useFoodieStore, ['isLogin', 'name'])
  },
  methods: {
    logout() {
      localStorage.clear()
      this.isLogin = false
    }
  }
}
</script>

<style></style>