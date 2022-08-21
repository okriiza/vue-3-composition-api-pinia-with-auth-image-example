<template>
  <Sidebar>
    <template #content>
      <main class="container mx-auto px-4 py-4">
        <RouterView />
      </main>
    </template>
  </Sidebar>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>
