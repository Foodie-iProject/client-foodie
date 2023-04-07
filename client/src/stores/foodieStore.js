import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useFoodieStore = defineStore("foodie", {
  state: () => ({
    isLogin: false,
    name: "",
    email: "",
    password: "",
    address: "",
    rekening: "",
    totalPrice: 0,
    baseUrl: "http://localhost:3000/customers",
    foodList: [],
    foodCart: [],
    selectedFood: [],
    defaultPage: 1,
    defaultMaxPage: 1,
    defaultSearch: "",
  }),
  actions: {
    async registerHandler() {
      try {
        const data = await axios({
          method: "post",
          url: this.baseUrl + "/register",
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            address: this.address,
            rekening: this.rekening,
          },
        });

        this.name = "";
        this.email = "";
        this.password = "";
        this.address = "";
        this.rekening = "";
        this.router.push("/login");
        console.log(data);

        Swal.fire({
          toast: true,
          position: "top-end",
          title: "You are registered",
          timer: 2500,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "warning",
        });
      }
    },
    async loginHandler() {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "/login",
          data: {
            password: this.password,
            email: this.email,
          },
        });
        console.log(data);
        // this.cartList = await fetchCart();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("name", data.name);
        this.name = data.name;
        this.email = "";
        this.password = "";
        this.isLogin = true;
        this.router.push("/");

        Swal.fire({
          toast: true,
          position: "top-end",
          title: "Welcome to Foodie",
          timer: 2000,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "warning",
        });
      }
    },
    async fetchAllFood() {
      try {
        const food = await axios({
          method: "get",
          url: this.baseUrl + "/food",
          params: {
            page: this.defaultPage,
            search: this.defaultSearch,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.foodList = food.data.Food.rows.map((el) => el);
        this.defaultMaxPage = food.data.maxPage;
        // console.log(food);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "warning",
        });
      }
    },
    async addToCart(id) {
      try {
        const data = await axios({
          method: "post",
          url: this.baseUrl + "/cart/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.getFoodInMyCart();

        Swal.fire({
          toast: true,
          position: "top-end",
          title: "Successfully add an item to your cart",
          timer: 2000,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "warning",
        });
      }
    },
    async removeItemFromCart(id) {
      try {
        const data = await axios({
          method: "delete",
          url: this.baseUrl + "/cart/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.getFoodInMyCart();

        Swal.fire({
          toast: true,
          position: "top-end",
          title: "An Item has been removed",
          timer: 1200,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "warning",
        });
      }
    },

    async getFoodInMyCart() {
      try {
        const { data } = await axios({
          method: "get",
          url: this.baseUrl + "/cart",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.foodCart = data.map((el) => el);
        const priceArr = data.map((el) => {
          return el.Food.price;
        });
        this.totalPrice = priceArr.reduce((a, b) => a + b, 0);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          timerProgressBar: true,
          icon: "warning",
        });
      }
    },
    async placeOrder() {
      try {
        const data = await axios({
          method: "post",
          url: this.baseUrl + "/placeOrder/",
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            qty: this.foodCart.length,
            totalPrice: this.totalPrice,
          },
        });
        this.foodCart = [];
        this.defaultSearch = "";
        this.router.push("/");
        Swal.fire({
          toast: true,
          position: "top-end",
          title: "Successfully place an Order ",
          timer: 2000,
          timerProgressBar: true,
          icon: "success",
          showConfirmButton: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async payment() {
      try {
        console.log(this.totalPrice, "<<<<<<<<<");
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "/payment",
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            totalPrice: this.totalPrice,
          },
        });
        console.log(data);
        console.log(data.midtrans_token.token);
        const cb = this.placeOrder;
        window.snap.pay(data.midtrans_token.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            cb();
            console.log(result);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert("wating your payment!");
            console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert("payment failed!");
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      } catch (error) {
        console.log(error, "<<<<");
      }
    },
  },
});
