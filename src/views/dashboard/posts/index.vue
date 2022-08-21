<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between">
        <div>
          <h2 class="text-md uppercase text-primary font-bold">Artikel</h2>
          <p class="text-sm font-light">Data List Artikel</p>
        </div>
        <div>
          <RouterLink
            :to="{ name: 'posts.create' }"
            class="btn btn-primary btn-sm gap-2"
          >
            <PlusIcon class="h-5 w-5 text-white" />
            Tambah Artikel
          </RouterLink>
        </div>
      </div>
      <div
        class="toast toast-top toast-end"
        v-if="postStore.meta.length && showToast"
      >
        <div class="alert alert-success">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>{{ postStore.meta }}</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="form-control">
        <div class="input-group">
          <input
            type="text"
            placeholder="Search…"
            class="input input-bordered input-sm"
          />
          <button class="btn btn-square btn-primary btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Image</th>
              <th>Status</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in posts" :key="post.id">
              <th>{{ index + 1 }}</th>
              <td>{{ post.title }}</td>
              <td>
                <div class="avatar">
                  <div class="w-16 rounded">
                    <img :src="post.thumbnail" :alt="post.title" />
                  </div>
                </div>
              </td>
              <td>
                <span
                  class="badge"
                  :class="
                    post.published == 0 ? 'badge-primary' : 'badge-accent'
                  "
                  >{{ post.published == 0 ? 'Unpublished' : 'Published' }}</span
                >
              </td>
              <td>{{ post.users.name }}</td>
              <td>
                <div class="">
                  <RouterLink
                    :to="{ name: 'posts.edit', params: { postId: post.id } }"
                    class="btn btn-success btn-sm mr-2"
                  >
                    <PencilIcon class="h-5 w-5 text-white" />
                  </RouterLink>
                  <label
                    :for="`my-modal-${post.id}`"
                    class="modal-button btn btn-error btn-sm"
                  >
                    <TrashIcon class="h-5 w-5 text-white" />
                  </label>
                  <Modal :nameModal="`my-modal-${post.id}`">
                    <template #title> Hapus </template>
                    <template #content>
                      Apakah Anda Yakin Ingin Hapus Data ?
                    </template>
                    <template #button>
                      <label
                        @click="onDelete(post.id)"
                        :for="`my-modal-${post.id}`"
                        class="btn btn-primary"
                        :class="loading ? 'loading' : ''"
                      >
                        <span v-if="loading">Loading...</span>
                        <span v-else>Hapus</span>
                      </label>
                    </template>
                  </Modal>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * import
 */

import { onMounted, computed, ref } from 'vue'
import { usePostStore } from '../../../stores/usePost'
import { PlusIcon } from '@heroicons/vue/solid'
import { PencilIcon } from '@heroicons/vue/solid'
import { TrashIcon } from '@heroicons/vue/solid'
import Modal from '@/components/Modal.vue'
import { useRouter } from 'vue-router'

/**
 * State
 */
const loading = ref(false)
const showToast = ref(true)
const router = useRouter()
const postStore = usePostStore()

const posts = computed(() => postStore.posts)

const onDelete = async (id) => {
  loading.value = !loading.value
  await postStore
    .deletePost(id)
    .then(() => {
      loading.value = !loading.value
      setTimeout(() => {
        showToast.value = !showToast.value
        postStore.meta = {}
      }, 2000)
      router.push({ name: 'posts.index' })
      console.log('success')
      postStore.fetchPosts()
    })
    .catch((e) => {
      loading.value = !loading.value
      console.log('error', e)
    })
}

onMounted(() => {
  postStore.fetchPosts()
})
</script>
