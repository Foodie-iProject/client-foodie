<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-weight-light my-4">Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="registerHandler">
              <div class="form-floating mb-3">
                <input class="form-control" id="inputName" type="text" placeholder="Enter name" v-model="name" />
                <label for="inputName">Name</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputEmail" type="email" placeholder="Enter email" v-model="email" />
                <label for="inputEmail">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputPassword" type="password" placeholder="Create a password"
                  v-model="password" />
                <label for="inputPassword">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputAddress" type="text" placeholder="Enter address" v-model="address" />
                <label for="inputAddress">Address</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputAccountNumber" type="text" placeholder="Enter account number"
                  v-model="rekening" />
                <label for="inputAccountNumber">Account Number</label>
              </div>
              <div class="mt-4 mb-0">
                <div class="d-grid">
                  <button class="btn btn-outline-primary btn-block">Create Account </button>
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small">
              Have an account? Go to <RouterLink to="/login">login</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useFoodieStore } from '../stores/foodieStore'
export default {
  computed: {
    ...mapWritableState(useFoodieStore, ['email', 'password', 'name', 'address', 'rekening'])
  },
  methods: {
    ...mapActions(useFoodieStore, ['registerHandler'])
  }
}
</script>

<style></style>