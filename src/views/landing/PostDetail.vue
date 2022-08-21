<template>
  <div class="card w-full bg-base-100 shadow-xl my-6">
    <figure>
      <img
        src="https://placeimg.com/400/225/arch"
        alt="Shoes"
        class="h-80 w-full"
      />
    </figure>
    <div class="card-body">
      <h1 class="font-bold text-xl">
        {{ postData.post.title }}
      </h1>
      <div class="">
        <p class="text-sm font-light">
          <span class="font-bold">Author </span>:
          {{ postData.post.users?.name }}
        </p>
        <p class="text-sm font-light">
          <span class="font-bold">Published</span> :
          {{ postData.post.created_at }}
        </p>
      </div>
      <div class="divider"></div>
      <div class="text-justify" v-html="postData.post.body"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * import
 */

import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

const postData = reactive({
  post: [],
})

const route = useRoute()

console.log(postData.post.title)

onMounted(async () => {
  const res = await axios.get(`api/post/detail/${route.params.postSlug}`)
  console.log(res.data)
  postData.post = res.data.post
  console.log(postData.post)
})
</script>
