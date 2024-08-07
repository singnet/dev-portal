<template>
    <svg :width="width" :height="height">
        <use :xlink:href="`/assets/images/sprite.svg#${textIconID}`"/>
    </svg>
</template>

<script>
    export default {
        props: {
            textIconID: {
                type: String
            },
            width: {
                required: false,
                type: String
            },
            height: {
                required: false,
                type: String
            }
        }
    }
</script>