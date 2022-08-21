<template>
  <div class="flex h-screen justify-center items-center">
    <div class="grid justify-items-center place-items-center">
      <div class="card shadow-2xl bg-base-100 w-96">
        <div class="card-body">
          <div class="card-title inline text-center">
            <h2 class="text-md uppercase text-primary">Vue3 Pinia</h2>
          </div>
          <p class="font-light text-sm text-center">
            Vue3 Pinia Composition API With Auth
          </p>
          <p class="text-sm text-center mb-4 font-bold uppercase">
            Register Form
          </p>
          <div
            class="max-w-3xl alert alert-success shadow-lg"
            v-if="authStore.meta.length"
          >
            <div class="items-center flex-1 gap-4">
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
              <div>
                <div class="text-sm font-bold">{{ authStore.meta }}</div>
                <div class="text-xs font-light">
                  wait a second redirecting you to login page
                </div>
              </div>
            </div>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                class="input input-bordered"
                v-model="users.name"
                :class="authStore.meta.name ? 'input-error' : ''"
                :disabled="loading"
              />
              <div
                v-if="authStore.meta.name"
                class="invalid-feedback font-bold text-error mt-2 text-xs"
              >
                {{ authStore.meta.name.toString() }}
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                class="input input-bordered"
                v-model="users.email"
                :class="authStore.meta.email ? 'input-error' : ''"
                :disabled="loading"
              />
              <div
                v-if="authStore.meta.email"
                class="invalid-feedback font-bold text-error mt-2 text-xs"
              >
                {{ authStore.meta.email.toString() }}
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered"
                v-model="users.password"
                :class="authStore.meta.password ? 'input-error' : ''"
                :disabled="loading"
              />
              <div
                v-if="authStore.meta.password"
                class="invalid-feedback font-bold text-error mt-2 text-xs"
              >
                {{ authStore.meta.password.toString() }}
              </div>
            </div>
            <div class="form-control mt-6 gap-3">
              <button
                class="btn btn-primary"
                :class="loading ? 'loading' : ''"
                :disabled="loading"
              >
                <span v-if="loading">Loading...</span>
                <span v-else>Register</span>
              </button>
              <RouterLink
                to="/login"
                class="text-center font-light text-xs hover:underline"
              >
                Back To Login
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * import
 */

import { onBeforeUnmount, ref } from 'vue'
import { useAuthStore } from '@/stores/useAuth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const users = ref({})
const loading = ref(false)
const router = useRouter()

const onSubmit = () => {
  loading.value = !loading.value
  authStore.register(users.value).then(() => {
    const isValid = authStore.meta.length
    if (isValid) {
      setTimeout(() => {
        router.push('/login')
        authStore.$reset()
      }, 3000)
      console.log('success')
    } else {
      loading.value = !loading.value
      console.log('error')
    }
  })
}
</script>
