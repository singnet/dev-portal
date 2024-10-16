<template>
  <div class="sidebar-toggler-container">
    <button @click="toggleSidebar" class="sidebar-toggler">
      <svg v-if="isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 17"
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

<script lang="ts">
import LocalStorageFlagsService from '../../services/LocalStorageFlagsService';

const enum SidebarLocalStorageKeys {
  IS_SIDEBAR_OPEN = "isSidebarOpen"
}

const enum SidebarControllingClassNames {
  SIDEBAR_CLOSED = "sidebar-closed",
}

export default {
  data() {
    return {
      isSidebarOpen: true as boolean,
    }
  },
  created() {
    this.isSidebarOpen = LocalStorageFlagsService.getIsActive(SidebarLocalStorageKeys.IS_SIDEBAR_OPEN);
    this.toggleSidebarClassNameOnDocument();
  },
  watch: {
    isSidebarOpen() {
      this.toggleSidebarClassNameOnDocument();
      LocalStorageFlagsService.setIsActive(SidebarLocalStorageKeys.IS_SIDEBAR_OPEN, this.isSidebarOpen);
    }
  },
  methods: {
    toggleSidebar(): void {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleSidebarClassNameOnDocument(): void {
      if (typeof window === 'undefined') {
        return;
      }

      const bodyClassList = window.document.body.classList;

      if (this.isSidebarOpen) {
        bodyClassList.remove(SidebarControllingClassNames.SIDEBAR_CLOSED);
      } else {
        bodyClassList.add(SidebarControllingClassNames.SIDEBAR_CLOSED);
      }
    },
  }
}
</script>

<style>
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

.VPContent {
  transition: .3s all;
}

@media (min-width: 960px) {
  :root {
    --aside-padding: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2);
  }

  .sidebar-closed .sidebar-toggler {
    z-index: 500;
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
    transform: translateX(-300px) !important;
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2) !important;
    background-color: transparent !important;
  }

  .sidebar-closed .VPSidebar .curtain {
    background-color: transparent !important;
  }

  .sidebar-closed .VPSidebar .group {
    display: none;
  }
}

@media (max-width: 960px) and (min-width: 440px) {
  .sidebar-toggler-container {
    display: none;
  }
}
</style>
