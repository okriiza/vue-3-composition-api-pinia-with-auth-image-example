<template>
  <div class="drawer drawer-mobile shadow-sm">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="navbar bg-primary px-4">
        <label
          for="my-drawer"
          class="btn btn-ghost drawer-button lg:hidden text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <div class="ml-auto">
          <label
            for=""
            class="mr-3 text-sm font-bold capitalize text-white"
            v-if="useAuth.user !== null"
            >Hi, {{ useAuth.user.name }}</label
          >
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li><label for="my-modal" class="modal-button">Logout</label></li>
            </ul>
          </div>
        </div>
      </div>
      <slot name="content" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-64 bg-primary text-white">
        <h2 class="text-center font-bold text-2xl uppercase">Vue3 Pinia</h2>
        <p class="text-center font-light text-sm mt-2">Dashboard Page</p>
        <div class="divider text-white"></div>
        <li>
          <RouterLink :to="{ name: 'dashboard' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'posts.index' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Artikel
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
  <Modal>
    <template #title> Logout </template>
    <template #content> Apakah Anda Yakin Ingin Keluar ? </template>
    <template #button
      ><button @click="onLogout" for="my-modal" class="btn btn-primary">
        Logout
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuth'
import Modal from '@/components/Modal.vue'

const useAuth = useAuthStore()
const router = useRouter()

const onLogout = () => {
  useAuth.logout().then(() => router.push({ name: 'login' }))
}
</script>
