import { acceptHMRUpdate, defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
  state: () => ({
    message: null,
    errors: {},
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}