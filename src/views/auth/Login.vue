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
          <p class="text-sm text-center mb-4 font-bold uppercase">Login Form</p>
          <div class="toast toast-top toast-end" v-if="authStore.meta.length">
            <div class="alert alert-error text-white">
              <div>
                <span>{{ authStore.meta }}</span>
              </div>
            </div>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
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
                :class="authStore.meta.password ? 'input-error' : ''"
                v-model="users.password"
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
                type="submit"
                class="btn btn-primary"
                :class="loading ? 'loading' : ''"
                :disabled="loading"
              >
                <span v-if="loading">Loading...</span>
                <span v-else>Login</span>
              </button>
              <RouterLink
                to="/register"
                class="text-xs hover:underline text-center font-light"
                >Create Account</RouterLink
              >
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/useAuth'

const users = ref({})
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const onSubmit = () => {
  loading.value = !loading.value

  authStore
    .login(users.value)
    .then(() => router.push({ name: 'dashboard' }))
    .catch(() => (loading.value = !loading.value))
    .finally(() => (loading.value = !loading.value))
}
</script>
