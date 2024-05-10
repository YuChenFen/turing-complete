<template>
    <div class="level-node">
        {{ label }}
    </div>
</template>

<script setup>
const props = defineProps(['label']);
</script>

<style scoped>
.level-node {
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 15px 25px;
    width: 150px;
    height: 70px;
    text-align: center;
    line-height: 40px;
}
</style>