<template>
    <div>
        <div class="bit-input" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick" @mousedown="mousedown">
            <svg-icon name="circle" style="fill: #4ccba1;width: 30px;height: 30px;"></svg-icon>
            <p style="height: 30px;width: 30px;text-align: center;line-height: 30px;position: absolute;top: 0;left: 0;">
                {{ data.value }}</p>
        </div>
        <Handle id="value" type="source" :connectable-end="false" :position="value_position" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { ref, nextTick } from 'vue';
import { rotateFunction } from '../../assets/js/handle-rotate';

const { updateNodeData, } = useVueFlow();
const props = defineProps(['id', 'data']);
updateNodeData(props.id, { value: 0 })

const rotate = ref(0);
const value_position = ref(Position.Top);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value = rotate.value + 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(value_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

function mousedown(event) {
    event.preventDefault();
    if (event.button == 1) {
        updateNodeData(props.id, { value: props.data.value ? 0 : 1 });
    }
}
</script>

<style scoped>
.bit-input {
    width: 30px;
    height: 30px;
}
</style>