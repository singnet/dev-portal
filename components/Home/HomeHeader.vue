<template>
    <div class="home-header-container">
        <h1 class="page-title">
            Welcome to the <span class="gradient-text">AI Dev</span> Community
        </h1>
        <h2>
            The go-to place for all developer related content and social activities.
        </h2>
        <h2>
            SingularityNET lets anyone create, share, and monetize AI services at scale.
        </h2>
    </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped>
.page-title {
    font-size: 55px;
    font-weight: 600;
    line-height: 45px;
    margin: 25px auto;
    text-align: center;
}

.home-header-container h2 {
    padding: 0;
    margin: 0;
    border: none;
    text-align: center;
}

.home-header-container h2 {
    margin-bottom: 5px;
    font-size: 22px;
    line-height: 25px;
}

.gradient-text {
    background: linear-gradient(90deg, rgba(158, 0, 255, 1),
            rgba(212, 76, 206, 1),
            rgba(40, 40, 218, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--vp-c-black);
    margin: 0 10px;
    font-size: 57px;
    font-weight: 800;
}

@media (max-width: 770px) {
    .page-title {
        font-size: 24px;
        line-height: 30px;
    }

    .gradient-text {
        font-size: 32px;
    }
}
</style>