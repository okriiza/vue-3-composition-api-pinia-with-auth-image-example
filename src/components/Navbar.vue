<template>
  <div class="bg-base-100 p-0 shadow-lg">
    <div class="navbar container mx-auto px-4">
      <div class="navbar-start">
        <div class="dropdown">
          <label
            tabindex="0"
            class="btn btn-ghost lg:hidden xs:btn-sm sm:btn-md"
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <RouterLink
                :to="{ name: 'landing.index' }"
                class="uppercase font-medium"
                >Home</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ name: 'landing.about' }"
                class="uppercase font-medium"
                >About</RouterLink
              >
            </li>
            <li v-if="!authStore.loggedIn">
              <RouterLink
                :to="{ name: 'auth.login' }"
                class="btn btn-block btn-ghost bg-base-300 xs:btn-sm sm:btn-md"
                >Login</RouterLink
              >
            </li>
          </ul>
        </div>
        <a class="font-bold uppercase">Vue3 Pinia</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li>
            <RouterLink
              :to="{ name: 'landing.index' }"
              class="uppercase font-medium"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'landing.about' }"
              class="uppercase font-medium"
            >
              About
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end gap-3" v-if="authStore.loggedIn">
        <RouterLink
          to="/dashboard"
          class="btn btn-primary btn-xs sm:btn-sm md:btn-md xs:text-xs"
          >Dashboard</RouterLink
        >
      </div>
      <div class="navbar-end gap-3" v-else>
        <RouterLink
          :to="{ name: 'auth.login' }"
          class="btn btn-ghost invisible lg:visible"
          >Login</RouterLink
        >
        <RouterLink
          :to="{ name: 'register' }"
          class="btn btn-primary btn-xs sm:btn-sm md:btn-md xs:text-xs"
          >Register</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Import
 */

import { useAuthStore } from '../stores/useAuth'

const authStore = useAuthStore()
</script>
