<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <component :is="$route.meta.layout" />
</template>
