<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between">
        <div>
          <h2 class="text-md uppercase text-primary font-bold">Edit Artikel</h2>
          <p class="text-sm font-light">Form Edit Artikel</p>
        </div>
        <div>
          <RouterLink
            :to="{ name: 'posts.index' }"
            class="btn btn-warning btn-sm gap-2"
          >
            <ArrowNarrowLeftIcon class="h-5 w-5" />
            Kembali
          </RouterLink>
        </div>
      </div>
      <div class="divider"></div>
      <form @submit.prevent="onUpdate" enctype="multipart/form-data">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold">Thumbnail</span>
          </label>
          <div class="flex justify-center items-center gap-3">
            <img
              :src="post.previewThumbnail"
              v-if="post.previewThumbnail"
              width="150"
              class="rounded-xl my-3"
            />
            <input
              v-on:change="handleFileInput"
              type="file"
              placeholder="Thumbnail"
              class="block w-full text-sm text-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary items-center"
              :class="postStore.meta.thumbnail ? 'input-error' : ''"
              :disabled="loading"
            />
          </div>
          <div
            v-if="postStore.meta.thumbnail"
            class="invalid-feedback font-bold text-error mt-2 text-xs"
          >
            {{ postStore.meta.thumbnail.toString() }}
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered"
            v-model="post.title"
            :class="postStore.meta.title ? 'input-error' : ''"
            :disabled="loading"
          />
          <div
            v-if="postStore.meta.title"
            class="invalid-feedback font-bold text-error mt-2 text-xs"
          >
            {{ postStore.meta.title.toString() }}
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold">Body</span>
          </label>
          <textarea
            class="textarea textarea-bordered w-full h-32"
            placeholder="Body"
            v-model="post.body"
            :class="postStore.meta.body ? 'input-error' : ''"
            :disabled="loading"
          />
          <div
            v-if="postStore.meta.body"
            class="invalid-feedback font-bold text-error mt-2 text-xs"
          >
            {{ postStore.meta.body.toString() }}
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold">Status</span>
          </label>
          <select
            class="select select-bordered w-full max-w-xs"
            v-model="post.published"
            :class="postStore.meta.published ? 'input-error' : ''"
            :disabled="loading"
          >
            <option disabled selected>Pilih Status Publikasi</option>
            <option value="0">UnPublished</option>
            <option value="1">Published</option>
          </select>
          <div
            v-if="postStore.meta.published"
            class="invalid-feedback font-bold text-error mt-2 text-xs"
          >
            {{ postStore.meta.published.toString() }}
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary mt-3"
          :class="loading ? 'loading' : ''"
          :disabled="loading"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Tambah</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
/**
 * import
 */

import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '../../../stores/usePost'
import { useAuthStore } from '../../../stores/useAuth'
import { ArrowNarrowLeftIcon } from '@heroicons/vue/solid'
import axios from 'axios'

/**
 * state
 */
const post = reactive({
  title: '',
  thumbnail: '',
  body: '',
  published: '',
  user_id: '',
  previewThumbnail: '',
})
const showToast = ref(true)
const loading = ref(false)
const route = useRoute()
const router = useRouter()

const postId = route.params.postId
/**
 * store
 */
const postStore = usePostStore()
const authStore = useAuthStore()

/**
 * function
 */

const handleFileInput = (e) => {
  post.previewThumbnail = URL.createObjectURL(e.target.files[0])
  const getImageFile = e.target.files[0]
  createBase64Image(getImageFile)
}

const createBase64Image = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    post.thumbnail = e.target.result
  }
  reader.readAsDataURL(file)
}
const onUpdate = () => {
  loading.value = !loading.value

  postStore
    .updatePost(postId, post)
    .then(() => {
      const isValid = postStore.meta.length
      if (isValid) {
        setTimeout(() => {
          showToast.value = !showToast.value
          postStore.meta = {}
        }, 2000)
        router.push({ name: 'posts.index' })
        loading.value = !loading.value
      }
    })
    .catch((error) => {
      loading.value = !loading.value
      console.log('error', error)
    })
    .finally(() => {
      loading.value = !loading.value
    })
}
onMounted(async () => {
  const response = await axios.get(`/api/post/${postId}`)
  post.title = response.data.post.title
  post.body = response.data.post.body
  post.published = response.data.post.published
  post.previewThumbnail = response.data.post.thumbnail
  post.user_id = response.data.post.user_id
})
</script>
