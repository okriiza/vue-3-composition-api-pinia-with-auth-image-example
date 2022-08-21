<template>
  <div class="my-6">
    <h2 class="text-lg font-bold uppercase">Artikel</h2>
    <p class="text-sm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, rerum?
    </p>
  </div>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-6">
    <div
      class="card bg-base-100 shadow-xl"
      v-for="(post, index) in posts"
      :key="index"
    >
      <figure>
        <img :src="post.thumbnail" alt="Shoes" />
      </figure>
      <div class="card-body p-4">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="text-sm" v-html="$filters.description(post.body, 120)"></p>
        <div class="card-actions justify-end">
          <RouterLink
            :to="{ name: 'landing.post.detail', params: { postSlug: post.slug } }"
            class="btn btn-primary btn-sm"
            >Read More</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * import
 */

import { usePostStore } from '@/stores/usePost'
import { computed, onMounted } from 'vue'

const postStore = usePostStore()
const posts = computed(() => postStore.posts)

onMounted(() => {
  postStore.fetchPosts()
})
</script>
