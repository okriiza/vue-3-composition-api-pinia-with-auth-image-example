<template>
  <input type="checkbox" :id="nameModal" class="modal-toggle" />
  <label :for="nameModal" class="modal cursor-pointer">
    <label class="modal-box relative">
      <h3 class="font-bold text-lg">
        <slot name="title" />
      </h3>
      <p class="py-4">
        <slot name="content" />
      </p>
      <div class="modal-action">
        <slot name="button" />
      </div>
    </label>
  </label>
</template>

<script setup>
/**
 * props
 */

const props = defineProps({
  nameModal: {
    type: String,
    default: 'my-modal',
  },
})
</script>
