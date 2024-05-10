<template>
    <div>
        <div class="bit-low" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="bit-low" style="width: 30px;height: 30px;"></svg-icon>
        </div>
        <Handle id="low" type="source" :connectable-end="false" :position="value_position" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { ref, nextTick } from 'vue';
import { rotateFunction } from '../../assets/js/handle-rotate';

const { updateNodeData, } = useVueFlow();
const props = defineProps(['id', 'data']);
updateNodeData(props.id, { low: 0 })

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
</script>

<style scoped>
.bit-low {
    width: 30px;
    height: 30px;
}
</style>