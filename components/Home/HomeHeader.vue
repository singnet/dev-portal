<template>
    <div class="home-header-container">
        <h1>
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

<script>
export default {

}
</script>

<style scoped>
.home-header-container h1,
.home-header-container h2 {
    padding: 0;
    margin: 0;
    border: none;
    text-align: center;
}

.home-header-container h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 35px;
    margin-bottom: 25px;
    margin-top: 25px;
    display: flex;
    gap: 10px;
    justify-content: center;
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
}

@media (max-width: 640px) {
    .home-header-container h1 {
        font-size: 24px;
        display: block;
    }
}
</style>