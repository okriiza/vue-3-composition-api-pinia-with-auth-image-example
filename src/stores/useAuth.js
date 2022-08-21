import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: localStorage.getItem("token") ? true : false,
    user: null,
    meta: {}
  }),

  getters: {},

  actions: {
    async login(credentials) {
      await axios.get("sanctum/csrf-cookie");

      const response = (await axios.post("api/login", credentials)).data;

      if (response.status) {
        const token = `Bearer ${response.token}`;

        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;

        await this.fetchUser();

      } else {

        this.meta = response.message
      }
    },

    async register(credentials) {
      const response = (await axios.post("api/register", credentials)).data;
      if (response.status) this.meta = response.message
      else this.meta = response.message
    },

    async logout() {
      const response = (await axios.post("api/logout")).data;

      if (response) {
        localStorage.removeItem("token");

        this.$reset();
      }
    },

    async fetchUser() {
      this.user = (await axios.get("api/user")).data.user;

      this.loggedIn = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}