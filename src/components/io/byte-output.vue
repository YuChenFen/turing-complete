<template>
    <div>
        <div class="byte-output" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="circle" style="fill: #ff7777;width: 30px;height: 30px;"></svg-icon>
            <p style="height: 30px;width: 30px;text-align: center;line-height: 30px;position: absolute;top: 0;left: 0;">
                {{ data.value }}</p>
        </div>
        <Handle id="value" type="target" :connectable-start="false" connectable="single" :position="value_position" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { nextTick, ref, toRef, watch } from 'vue';
import { rotateFunction } from '../../assets/js/handle-rotate';

const { updateNodeData, } = useVueFlow();
const props = defineProps(['id', 'data']);

const value = toRef(() => props.data.value);
updateNodeData(props.id, { value: 0 });
watch(value, (value) => {
    if (value == void 0) {
        updateNodeData(props.id, { value: 0 });
        return;
    }
    updateNodeData(props.id, { value: value & 255 })
});
const rotate = ref(0);
const value_position = ref(Position.Bottom);
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
.byte-output {
    width: 30px;
    height: 30px;
}
</style>