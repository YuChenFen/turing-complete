<template>
    <div>
        <div class="byte-storage" :style="`transform: rotate(${rotate}deg);`" @dblclick="dblclick">
            <svg-icon name="byte-storage" style="width: 30px;height: 30px;"></svg-icon>
            <p
                style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -100%) scale(0.5);font-size: 0.5em;">
                {{ output_a }}</p>
            <p
                style="position: absolute;bottom: 0;left: 50%;transform: translate(-50%, 0%) scale(0.5);font-size: 0.5em;">
                8</p>
        </div>
        <Handle id="output_a" type="source" :connectable-end="false" :position="output_a_position" />
        <Handle id="input_read" type="target" :connectable-start="false" connectable="single" :position="input_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: 5px;`" />
        <Handle id="input_write" type="target" :connectable-start="false" connectable="single"
            :position="input_position" />
        <Handle id="input_a" type="target" :connectable-start="false" connectable="single" :position="input_position"
            :style="`${output_a_position === Position.Top || output_a_position === Position.Bottom ? 'left' : 'top'}: calc(100% - 5px);`" />
    </div>
</template>

<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core';
import { rotateFunction } from '../../assets/js/handle-rotate';
import { nextTick, ref, toRef, watch } from 'vue';
import useOutputStore from '../../stores/useOutput';

const outputStore = useOutputStore();
const { updateNodeData } = useVueFlow();

const ticks = toRef(() => outputStore.ticks);
const props = defineProps(['id', 'data']);
const input_write = toRef(() => props.data.input_write)
const input_read = toRef(() => props.data.input_read)
const input_a = toRef(() => props.data.input_a)
const output_a = ref(0);

function update() {
    if (input_read.value & 1) {
        updateNodeData(props.id, { output_a: output_a.value });
    } else {
        updateNodeData(props.id, { output_a: void 0 });
    }
    if (input_write.value & 1) {
        output_a.value = input_a.value & 255;
    }
}

watch(ticks, () => {
    console.log('ticks', ticks.value);
    if (ticks.value == 1) {
        updateNodeData(props.id, { output_a: 0 });
        return
    }
    if (ticks.value) {
        update();
    }
})
watch(input_write, () => {
    if (input_write.value & 1) {
        output_a.value = input_a.value & 255;
    }
})

watch(input_a, () => {
    if (input_write.value & 1) {
        output_a.value = input_a.value & 255;
    }
})


const rotate = ref(0);
const output_a_position = ref(Position.Top);
const input_position = ref(Position.Bottom);
const emits = defineEmits(['updateNodeInternals']);

function dblclick() {
    rotate.value += 90;
    if (rotate.value == 360) {
        rotate.value = 0;
    }
    rotateFunction(output_a_position);
    rotateFunction(input_position);
    nextTick(() => {
        emits('updateNodeInternals');
    });
}

</script>

<style scoped>
.byte-storage {
    width: 30px;
    height: 30px;
}
</style>