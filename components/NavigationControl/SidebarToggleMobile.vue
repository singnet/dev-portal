<template>
  <div class="sidebar-toggler-container">
    <button @click="closeSideBar" class="sidebar-toggler">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 17" fill="none">
        <rect x="1" y="1" width="18" height="15" rx="3" stroke="#D6D6D6" stroke-width="2" />
        <rect x="4.75" y="4.75" width="1.5" height="7.5" rx="0.75" stroke="#D6D6D6" stroke-width="1.5" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    closeSideBar() {
      if (typeof window === 'undefined') {
        return;
      }

      const VPBackdrop: HTMLElement | null = window.document.querySelector(".VPBackdrop");

      if (!VPBackdrop) {
        return;
      }

      VPBackdrop.click();
    }
  }
}
</script>

<style scoped>
.sidebar-toggler-container {
  flex-shrink: 0;
  width: 20px;
  height: 18px;
}

.sidebar-toggler {
  left: 0;
  width: 100%;
  height: 100%;
}

.sidebar-toggler rect,
.sidebar-closed .sidebar-toggler:hover rect {
  stroke: #3C3C43;
}

.dark .sidebar-toggler rect,
.dark .sidebar-closed .sidebar-toggler:hover rect {
  stroke: #D6D6D6;
}

.sidebar-toggler:hover rect,
.sidebar-closed .sidebar-toggler rect {
  stroke: #4086FF;
}
</style>