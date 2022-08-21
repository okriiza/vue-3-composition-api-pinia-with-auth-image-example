import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore('post', {

  state: () => ({
    meta: {},
    posts: [],
    post: null,
  }),

  getters: {},

  actions: {
    async fetchPosts() {
      const response = (await axios.get('api/posts')).data;
      if (response.status) {
        this.posts = response.posts;
      } else {
        this.meta = response.message;
      }
    },

    async storePost(posts) {
      const response = (await axios.post('api/post', posts)).data;
      if (response.status) {
        this.meta = response.message;
      } else {
        this.meta = response.message;
      }
    },
    async updatePost(id, post) {
      const response = (await axios.patch(`api/post/${id}`, post)).data;
      if (response.status) {
        this.meta = response.message;
      } else {
        this.meta = response.message
      }
    },
    async deletePost(id) {
      const response = (await axios.delete(`api/post/${id}`)).data;
      if (response.status) {
        this.meta = response.message;
      } else {
        this.meta = response.message
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}