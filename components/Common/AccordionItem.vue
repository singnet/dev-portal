<template>
    <div class="accordion-item" :class="{ 'expanded': isExpanded }" tabindex="0">
        <div class="accordion-item-title" @click="toggleAccordionItem">
            <div class="accordion-item-title-content">
                <slot name="title" />
            </div>
            <div class="accordion-item-toggler">
                <SpriteIcon :textIconID="'short-arrow-icon'" :width="'10px'" :height="'6px'" />
            </div>
        </div>
        <div class="accordion-item-description">
            <slot name="description" />
        </div>
    </div>
</template>

<script lang="ts">
import SpriteIcon from "./SpriteIcon"
export default {
    props: {
        id: {
            type: String,
            required: false,
            default: ""
        }
    },
    data() {
        return {
            isExpanded: false as boolean,
        }
    },
    methods: {
        toggleAccordionItem(): void {
            this.isExpanded = !this.isExpanded;
        }
    }
}
</script>

<style>
.accordion-item {
    padding: 20px;
    border-radius: 8px;
    margin: 5px;
    background-color: var(--vp-code-block-bg);
}

.accordion-item:focus,
.accordion-item:hover {
    outline: 2px solid var(--vp-c-accent);
}

.accordion-item-title {
    padding: 3px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

.accordion-item-title-content {
    user-select: none;
    margin-right: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.accordion-item-description {
    overflow: hidden;
    transition: var(--feedback-form-transition);
    max-height: 0;
}

.accordion-item.expanded .accordion-item-description {
    max-height: 1000px;
    margin-top: 10px;
}

.accordion-item-toggler {
    transition: var(--feedback-form-transition);
    padding: 10px;
}

.accordion-item.expanded .accordion-item-toggler {
    transform: rotate(180deg);
}
</style>