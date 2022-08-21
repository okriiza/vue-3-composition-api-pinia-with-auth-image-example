<template>
  <div class="flex flex-col h-screen justify-between">
    <Navbar />
    <main class="container mx-auto px-4 mb-auto">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
