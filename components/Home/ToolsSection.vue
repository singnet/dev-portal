<template>
    <div class="tools-section-container border-conteiner">
        <h1 class="tools-header">
            Tools & Resources
        </h1>
        <div class="tools-items-container">
            <ToolsComponent v-for="item in toolsConfig" :item="item" />
        </div>
    </div>
</template>

<script>
import ToolsComponent from "./ToolsComponent.vue";
import toolsConfig from "../../config/content/toolsConfig.ts";

export default {
    components: {
        ToolsComponent
    },
    data() {
        return {
            toolsConfig
        }
    }
}
</script>

<style scoped>
.tools-section-container {
    padding: 36px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border: 1px solid purple;
    border-radius: 25px;
    background: linear-gradient(135deg, #7747FF1A, #8F00FF1A);
    backdrop-filter: blur(10px);
}

.tools-items-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.tools-header {
    text-align: center;
}

.border-conteiner::after {
    transform: translate(8px, 4px);
}

.border-conteiner::before {
    transform: translate(14px, 7px);
}

</style>