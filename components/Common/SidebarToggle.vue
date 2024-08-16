<template>
  <div @click="toggle">
    <span v-if="isOpen">
      <slot name="open-icon"></slot>
    </span>
    <span v-else>
      <slot name="close-icon"></slot>
    </span>
    <span>{{ title }}</span>
    <ul v-show="isOpen">
      <li v-for="item in items" :key="item.text">
        <router-link :to="item.link">{{ item.text }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  items: Array
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
</style>
