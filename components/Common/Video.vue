<template>
    <div class="video-container">
        <video controls>
            <source :src="src" :type="type" />
        </video>
    </div>
</template>

<script lang=ts>
export default {
    props: {
        src: {
            required: true,
            type: String
        },
        type: {
            type: String,
            default: "video/mp4"
        }
    }
}
</script>

<style>
.video-container {
    padding: 2% 10%;
}
</style>