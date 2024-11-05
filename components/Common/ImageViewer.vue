<template>
    <div class="image-container">
        <img :src="src" :alt="alt"/>
        <p v-if="pictureTitle" class="picture-title">{{pictureTitle}}</p>
        <button @click.stop="openImage" class="open-image-button">
            <SpriteIcon :textIconID="'search-icon'" :width="'16px'" :height="'16px'" />
        </button>
    </div>
    <transition name="modal-fade">
        <div v-if="isImageOpened" class="full-size-image-container">
            <button @click="closeImage" class="close-image-button">
                <svg xmlns="http://www.w3.org/2000/svg"  height="28px" width="28px" viewBox="0 0 28 28">
                    <line x1="3" y1="3" x2="25" y2="25" stroke-linecap="round" stroke="#666666" stroke-width="3"/>
                    <line x1="3" y1="25" x2="25" y2="3" stroke-linecap="round" stroke="#666666" stroke-width="3"/>
                </svg>
            </button>
            <img class="full-size-image" :src="src" :alt="alt"/>
        </div>
    </transition>
</template>

<script lang="ts">
export default {
    props: {
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
        pictureTitle: {
            type: String,
            required: false,
        },
    },
    data() {
      return {
        isImageOpened: false
      }  
    },
    methods: {
        openImage() {
            this.isImageOpened = true;
        },
        closeImage() {
            this.isImageOpened = false;
        },
    }
}
</script>

<style scoped>
    .image-container {
        position: relative;
    }

    .picture-title {
        text-align: center;
        font-weight: 700;
    }

    .open-image-button, .close-image-button {
        position: absolute;
        z-index: 1;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .open-image-button {
        right: 0;
        top: 0;
        border-radius: 0 20px 0 8px;
        background: rgba(127, 112, 168, 0.5);
        backdrop-filter: blur(10px);
    }

    .open-image-button path, .open-image-button svg {
        fill: white;
    }

    .close-image-button {
        right: 20px;
        top: 20px;
        border-radius: 8px;
    }

    .close-image-button line {
        stroke: var(--vp-c-lightgray);
        -webkit-filter: drop-shadow( 0 0 3px var(--vp-accent-border));
        filter: drop-shadow( 0 0 3px var(--vp-accent-border));
    }

    .open-image-button:hover {
        background: rgba(195, 184, 224, 0.8);
    }

    .full-size-image-container {
        position: fixed;
        z-index: 200;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: var(--vp-transparent-black);
        padding: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(6px);
    }

    .full-size-image-container .full-size-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }
</style>