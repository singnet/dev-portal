<template>
  <div class="sidebar-toggler-container">
    <button @click="toggle" class="sidebar-toggler">
      <svg v-if="isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"
        fill="none">
        <rect x="1" y="1" width="18" height="15" rx="3" stroke="#D6D6D6" stroke-width="2" />
        <rect x="4.75" y="4.75" width="1.5" height="7.5" rx="0.75" stroke="#D6D6D6" stroke-width="1.5" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
        <rect x="-1" y="1" width="18" height="15" rx="3" transform="matrix(-1 0 0 1 18 0)" stroke="#4086FF"
          stroke-width="2" />
        <rect x="-0.75" y="0.75" width="1.5" height="7.5" rx="0.75" transform="matrix(-1 0 0 1 14.5 4)" stroke="#4086FF"
          stroke-width="1.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { body } = document;
const isSidebarOpen = ref(localStorage.getItem("isSidebarOpen") === "true");

const toggleClassName = () => {
  if (isSidebarOpen.value) {
    body.classList.remove('sidebar-closed');
  } else {
    body.classList.add('sidebar-closed');
  }
}

const toggle = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value);
  toggleClassName();
}

toggleClassName();

</script>

<style>
.sidebar-toggler-container {
  position: relative;
}

.sidebar-toggler {
  z-index: 500;
  position: absolute;
  right: -23px;
  top: 17px;
}

.VPContent {
  transition: .3s all;
}

@media (min-width: 960px) {
  :root {
    --aside-padding: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2);
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

  .sidebar-closed .VPContent.has-sidebar {
    padding-left: var(--aside-padding) !important;
  }

  .sidebar-closed .VPLocalNavOutlineDropdown {
    margin-left: auto !important;
  }

  .sidebar-closed .content-container {
    max-width: none !important;
  }

  .sidebar-closed .VPSidebar {
    box-shadow: none !important;
    transform: translateX(-75%) !important;
    background-color: transparent !important;
  }

  .sidebar-closed .VPSidebar .curtain {
    background-color: transparent !important;
  }

  .sidebar-closed .VPSidebar .group {
    display: none;
  }
}

@media (max-width: 960px) {
  .sidebar-toggler {
    display: none;
  }
}
</style>
