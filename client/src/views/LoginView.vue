<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-weight-light my-4">Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="loginHandler">
              <div class="form-floating mb-3">
                <input class="form-control" id="inputEmail" type="email" placeholder="Enter email" v-model="email" />
                <label for="inputEmail">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputPassword" type="password" placeholder="Create a password"
                  v-model="password" />
                <label for="inputPassword">Password</label>
              </div>
              <div class="mt-4 mb-0">
                <div class="d-grid">
                  <button class="btn btn-outline-primary btn-block">Login</button>
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small">
              Don't have an account yet? <RouterLink to="/register">Register</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapWritableState } from 'pinia';
import { useFoodieStore } from '../stores/foodieStore'

export default {
  computed: {
    ...mapWritableState(useFoodieStore, ['email', 'password'])
  },
  methods:{
    ...mapActions(useFoodieStore,['loginHandler'])
  }
}
</script>
  
<style></style>